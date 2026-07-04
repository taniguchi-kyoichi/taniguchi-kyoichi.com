// cloud-hub H2 ingest — life の .md を Workers AI(bge-m3) で埋め込み D1 + Vectorize へ upsert。
// ローカル/CI 実行。認証は CLOUDFLARE_API_TOKEN(op run で注入)。公開 Worker に書込口は開けない。
//
//   op run --env-file=.env.cloudflare.tpl -- bun ingest/ingest.ts <file.md ...>
//   LIFE_ROOT 既定 /Users/kyoichi/life（doc.path はここからの相対パス）。
import { readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import { createHash } from 'node:crypto'
import matter from 'gray-matter'
import { selectScopedFiles } from './scope.js'

const TOKEN = process.env.CLOUDFLARE_API_TOKEN
const ACCT = process.env.CLOUDFLARE_ACCOUNT_ID
const LIFE_ROOT = process.env.LIFE_ROOT || '/Users/kyoichi/life'
const D1_ID = 'cc2716ad-ea90-4d67-896b-04cf804f8c9c'
const VECTORIZE = 'life-index'
const MODEL = '@cf/baai/bge-m3'
const EMBED_BATCH = 50
if (!TOKEN || !ACCT) { console.error('CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID が必要（op run 経由）'); process.exit(1) }

const API = `https://api.cloudflare.com/client/v4/accounts/${ACCT}`
const H = { Authorization: `Bearer ${TOKEN}` }

async function cf(path: string, init: RequestInit): Promise<any> {
  const res = await fetch(`${API}${path}`, { ...init, headers: { ...H, ...(init.headers || {}) } })
  const j: any = await res.json().catch(() => ({}))
  if (!res.ok || j.success === false) throw new Error(`CF ${path} → ${res.status} ${JSON.stringify(j.errors || j).slice(0, 300)}`)
  return j
}

/** Workers AI bge-m3 で埋め込み（1024次元）。バッチで。 */
async function embed(texts: string[]): Promise<number[][]> {
  const out: number[][] = []
  for (let i = 0; i < texts.length; i += EMBED_BATCH) {
    const j = await cf(`/ai/run/${MODEL}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: texts.slice(i, i + EMBED_BATCH) }),
    })
    out.push(...j.result.data)
  }
  return out
}

/** D1 に単一 SQL（? バインド）を実行。 */
async function d1(sql: string, params: unknown[] = []): Promise<void> {
  await cf(`/d1/database/${D1_ID}/query`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sql, params }),
  })
}

/** 多行 INSERT をバッチで（呼び出し回数を大幅削減）。D1 は 1 文あたり最大 100 バインド変数。 */
async function insertRows(table: string, cols: string[], rows: unknown[][]): Promise<void> {
  if (!rows.length) return
  const perStmt = Math.max(1, Math.floor(90 / cols.length)) // 変数数 = cols*perStmt ≤ 90（安全側）
  const ph = `(${cols.map(() => '?').join(',')})`
  for (let i = 0; i < rows.length; i += perStmt) {
    const slice = rows.slice(i, i + perStmt)
    await d1(`INSERT INTO ${table}(${cols.join(',')}) VALUES ${slice.map(() => ph).join(',')}`, slice.flat())
  }
}

/** Vectorize へ NDJSON で upsert。 */
async function vectorizeUpsert(rows: { id: string; values: number[]; metadata: Record<string, unknown> }[]): Promise<void> {
  if (!rows.length) return
  const ndjson = rows.map((r) => JSON.stringify(r)).join('\n')
  await cf(`/vectorize/v2/indexes/${VECTORIZE}/upsert`, {
    method: 'POST', headers: { 'Content-Type': 'application/x-ndjson' }, body: ndjson,
  })
}

const sha1 = (s: string) => createHash('sha1').update(s).digest('hex')

interface Heading { level: number; text: string; ord: number }
interface Chunk { id: string; ord: number; heading: string; text: string }
interface Doc {
  path: string; title: string; category: string; created: string
  status: string; tags: string[]; body: string; headings: Heading[]; links: string[]; chunks: Chunk[]
}

function splitBySize(text: string, max = 1500): string[] {
  if (text.length <= max) return [text]
  const parts: string[] = []
  const paras = text.split(/\n{2,}/)
  let cur = ''
  for (const p of paras) {
    if ((cur + '\n\n' + p).length > max && cur) { parts.push(cur); cur = p }
    else cur = cur ? cur + '\n\n' + p : p
    while (cur.length > max) { parts.push(cur.slice(0, max)); cur = cur.slice(max) }
  }
  if (cur.trim()) parts.push(cur)
  return parts
}

function parseDoc(absPath: string): Doc {
  const raw = readFileSync(absPath, 'utf8')
  const { data, content } = matter(raw)
  const path = relative(LIFE_ROOT, absPath)
  const title = String(data.title ?? path.split('/').pop() ?? path)
  const category = path.split('/').slice(0, -1).join('/')
  const headings: Heading[] = []
  const links: string[] = []
  let ord = 0
  for (const line of content.split('\n')) {
    const h = line.match(/^(#{1,6})\s+(.*)/)
    if (h) headings.push({ level: h[1].length, text: h[2].trim(), ord: ord++ })
    for (const m of line.matchAll(/\[\[([^\]]+)\]\]/g)) links.push(m[1].trim())
  }
  // チャンク（見出し境界＋サイズ上限）。決定的 ID = sha1(path)#ord。
  const chunks: Chunk[] = []
  const sections: { heading: string; lines: string[] }[] = []
  let sec = { heading: '', lines: [] as string[] }
  for (const line of content.split('\n')) {
    const h = line.match(/^#{1,6}\s+(.*)/)
    if (h) { if (sec.lines.length) sections.push(sec); sec = { heading: h[1].trim(), lines: [] } }
    else sec.lines.push(line)
  }
  if (sec.lines.length) sections.push(sec)
  let cord = 0
  const ph = sha1(path)
  for (const s of sections) {
    const t = s.lines.join('\n').trim()
    if (!t) continue
    for (const piece of splitBySize(t)) chunks.push({ id: `${ph}#${cord}`, ord: cord++, heading: s.heading, text: piece })
  }
  return {
    path, title, category, created: String(data.created ?? ''), status: String(data.status ?? ''),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [], body: content, headings, links, chunks,
  }
}

async function ingestDoc(doc: Doc): Promise<number> {
  // 冪等: path 単位で全消し→入れ直し。
  for (const t of ['doc', 'doc_fts', 'heading', 'link', 'chunk']) await d1(`DELETE FROM ${t} WHERE ${t === 'link' ? 'src' : 'path'} = ?`, [doc.path])
  const hash = sha1(doc.body)
  await d1(
    `INSERT INTO doc(path,title,category,created,status,status_raw,tags,mtime,body_len,content_hash,body)
     VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
    [doc.path, doc.title, doc.category, doc.created, doc.status, doc.status, JSON.stringify(doc.tags), 0, doc.body.length, hash, doc.body],
  )
  await d1(`INSERT INTO doc_fts(path,title,body) VALUES(?,?,?)`, [doc.path, doc.title, doc.body])
  await insertRows('heading', ['path', 'level', 'text', 'ord'], doc.headings.map((h) => [doc.path, h.level, h.text, h.ord]))
  await insertRows('link', ['src', 'dst'], doc.links.map((l) => [doc.path, l]))
  await insertRows('chunk', ['id', 'path', 'heading', 'ord', 'text'], doc.chunks.map((c) => [c.id, doc.path, c.heading, c.ord, c.text]))
  // 埋め込み → Vectorize upsert。
  if (doc.chunks.length) {
    const vecs = await embed(doc.chunks.map((c) => c.text))
    await vectorizeUpsert(doc.chunks.map((c, i) => ({ id: c.id, values: vecs[i], metadata: { path: doc.path, heading: c.heading } })))
  }
  return doc.chunks.length
}

const args = process.argv.slice(2)
// --scope: scope.ts の宣言的スコープ（コア知識）を対象に。それ以外は明示ファイルパス。
const files = args.includes('--scope')
  ? selectScopedFiles(LIFE_ROOT).map((rel) => resolve(LIFE_ROOT, rel))
  : args.filter((a) => !a.startsWith('--')).map((a) => resolve(a))
if (!files.length) { console.error('usage: bun ingest/ingest.ts (--scope | <file.md ...>)'); process.exit(1) }

console.log(`ingest: ${files.length} files${args.includes('--scope') ? ' (scope=core)' : ''}`)
let totalChunks = 0, ok = 0, fail = 0
for (let i = 0; i < files.length; i++) {
  try {
    const doc = parseDoc(files[i])
    const n = await ingestDoc(doc)
    totalChunks += n; ok++
    if (ok % 10 === 0 || files.length < 20) console.log(`  [${i + 1}/${files.length}] ✓ ${doc.path} (${n} chunks)`)
  } catch (e) {
    fail++
    console.error(`  [${i + 1}/${files.length}] ✗ ${files[i]}: ${(e as Error).message}`)
  }
}
console.log(`\ndone: ${ok} ok, ${fail} failed, ${totalChunks} chunks embedded+upserted`)
