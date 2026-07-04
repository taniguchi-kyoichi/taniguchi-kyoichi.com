// cloud-hub H2 ingest — life の .md を Workers AI(bge-m3) で埋め込み D1 + Vectorize へ upsert。
// ローカル/CI 実行。認証は CLOUDFLARE_API_TOKEN(op run で注入)。公開 Worker に書込口は開けない。
//
//   op run --env-file=.env.cloudflare.tpl -- bun ingest/ingest.ts <file.md ...>
//   LIFE_ROOT 既定 /Users/kyoichi/life（doc.path はここからの相対パス）。
import { readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import { createHash } from 'node:crypto'
import matter from 'gray-matter'

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
  for (const t of ['doc', 'doc_fts', 'heading', 'chunk']) await d1(`DELETE FROM ${t} WHERE path = ?`, [doc.path])
  const hash = sha1(doc.body)
  await d1(
    `INSERT INTO doc(path,title,category,created,status,status_raw,tags,mtime,body_len,content_hash,body)
     VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
    [doc.path, doc.title, doc.category, doc.created, doc.status, doc.status, JSON.stringify(doc.tags), 0, doc.body.length, hash, doc.body],
  )
  await d1(`INSERT INTO doc_fts(path,title,body) VALUES(?,?,?)`, [doc.path, doc.title, doc.body])
  for (const h of doc.headings) await d1(`INSERT INTO heading(path,level,text,ord) VALUES(?,?,?,?)`, [doc.path, h.level, h.text, h.ord])
  for (const l of doc.links) await d1(`INSERT INTO link(src,dst) VALUES(?,?)`, [doc.path, l])
  for (const c of doc.chunks) await d1(`INSERT INTO chunk(id,path,heading,ord,text) VALUES(?,?,?,?,?)`, [c.id, doc.path, c.heading, c.ord, c.text])
  // 埋め込み → Vectorize upsert。
  if (doc.chunks.length) {
    const vecs = await embed(doc.chunks.map((c) => c.text))
    await vectorizeUpsert(doc.chunks.map((c, i) => ({ id: c.id, values: vecs[i], metadata: { path: doc.path, heading: c.heading } })))
  }
  return doc.chunks.length
}

const files = process.argv.slice(2)
if (!files.length) { console.error('usage: bun ingest/ingest.ts <file.md ...>'); process.exit(1) }
let totalChunks = 0
for (const f of files) {
  const abs = resolve(f)
  try {
    const doc = parseDoc(abs)
    const n = await ingestDoc(doc)
    totalChunks += n
    console.log(`✓ ${doc.path}  (${n} chunks, ${doc.headings.length} headings)`)
  } catch (e) {
    console.error(`✗ ${f}: ${(e as Error).message}`)
  }
}
console.log(`\ndone: ${files.length} files, ${totalChunks} chunks embedded+upserted`)
