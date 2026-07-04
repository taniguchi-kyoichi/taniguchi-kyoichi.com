import { useEffect, useMemo, useRef, useState } from 'react'
import MarkdownIt from 'markdown-it'
import { search, facets, getDoc, related, list, home, board, artifacts, type Hit, type Doc, type Mode, type HomeData, type BoardBrief, type Artifact } from './api'
import { Home } from './Home'

const md = new MarkdownIt({ html: false, linkify: true, breaks: false })

export function App() {
  const [q, setQ] = useState('')
  const [mode, setMode] = useState<Mode>('hybrid')
  const [category, setCategory] = useState<string | undefined>()
  const [cats, setCats] = useState<{ category: string; n: number }[]>([])
  const [status, setStatus] = useState<string | undefined>()
  const [statuses, setStatuses] = useState<{ status: string; n: number }[]>([])
  const [total, setTotal] = useState(0)
  const [hits, setHits] = useState<Hit[]>([])
  const [sel, setSel] = useState<Doc | null>(null)
  const [rel, setRel] = useState<Hit[]>([])
  const [loading, setLoading] = useState(false)
  const [homeData, setHomeData] = useState<HomeData | null>(null)
  const [boardData, setBoardData] = useState<BoardBrief | null>(null)
  const [tab, setTab] = useState<'index' | 'artifacts'>('index')
  const [arts, setArts] = useState<Artifact[] | null>(null)
  const [artSel, setArtSel] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { facets().then((f) => { setCats(f.byCategory); setStatuses(f.byStatus); setTotal(f.total) }) }, [])
  useEffect(() => { home().then(setHomeData) }, [])
  useEffect(() => { board().then(setBoardData) }, [])
  useEffect(() => { if (tab === 'artifacts' && arts == null) artifacts().then(setArts) }, [tab, arts])

  // アイドル（無検索・無フィルタ・未選択）は Home（状態の鏡）を表示
  const showHome = !q.trim() && !category && !status && !sel && homeData != null

  // 検索（デバウンス）。空クエリは category/status の新着一覧。status 絞り込みは一覧のみ。
  useEffect(() => {
    const t = setTimeout(async () => {
      setLoading(true)
      try { setHits(q.trim() ? await search(q, mode, category) : await list(category, status)) }
      finally { setLoading(false) }
    }, 180)
    return () => clearTimeout(t)
  }, [q, mode, category, status])

  // キーボード: "/" で検索へフォーカス
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) { e.preventDefault(); inputRef.current?.focus() }
      if (e.key === 'Escape') { setSel(null); inputRef.current?.focus() }
    }
    window.addEventListener('keydown', h)
    inputRef.current?.focus()
    return () => window.removeEventListener('keydown', h)
  }, [])

  async function open(path: string) {
    setSel(await getDoc(path)); setRel([])
    related(path).then(setRel)
  }

  const bodyHtml = useMemo(() => (sel ? md.render(sel.body) : ''), [sel])

  return (
    <div className="app">
      <header>
        <div className="brand">life-index <span className="muted">{total} docs</span></div>
        <input
          ref={inputRef} className="search" value={q} placeholder="検索  ( / でフォーカス )"
          onChange={(e) => setQ(e.target.value)} autoFocus
        />
        <div className="modes">
          {(['hybrid', 'fts', 'semantic'] as Mode[]).map((m) => (
            <button key={m} className={m === mode ? 'on' : ''} onClick={() => setMode(m)}>{m}</button>
          ))}
        </div>
        <div className="tabs">
          <button className={tab === 'index' ? 'on' : ''} onClick={() => setTab('index')}>索引</button>
          <button className={tab === 'artifacts' ? 'on' : ''} onClick={() => setTab('artifacts')}>成果物{arts ? ` ${arts.length}` : ''}</button>
        </div>
      </header>

      <div className="cols">
        {tab === 'artifacts' ? (
          <ArtifactsView arts={arts} sel={artSel} onSel={setArtSel} />
        ) : (
        <>
        <nav className="facets">
          <div className="facet-label">状態{q.trim() && <span className="muted"> (一覧のみ)</span>}</div>
          <div className="facet-status">
            <button className={!status ? 'on' : ''} onClick={() => setStatus(undefined)}>all</button>
            {statuses.filter((s) => s.status !== '(none)').map((s) => (
              <button key={s.status} className={status === s.status ? 'on' : ''} onClick={() => setStatus(s.status)}>
                {s.status} <span>{s.n}</span>
              </button>
            ))}
          </div>
          <div className="facet-label">カテゴリ</div>
          <button className={!category ? 'on' : ''} onClick={() => setCategory(undefined)}>すべて <span>{total}</span></button>
          {cats.map((c) => (
            <button key={c.category} className={category === c.category ? 'on' : ''} onClick={() => setCategory(c.category)}>
              {c.category} <span>{c.n}</span>
            </button>
          ))}
        </nav>

        {showHome ? (
          <Home data={homeData!} board={boardData} onStatus={setStatus} onOpen={open} />
        ) : (
        <>
        <ul className="results">
          {loading && <li className="dim">…</li>}
          {!loading && hits.length === 0 && <li className="dim">該当なし</li>}
          {hits.map((h) => (
            <li key={h.path} className={sel?.path === h.path ? 'sel' : ''} onClick={() => open(h.path)}>
              <div className="t">{h.title}</div>
              <div className="m">
                {h.status && <span className={`badge st-${h.status}`}>{h.status}</span>}
                {h.category} {h.created ? `· ${h.created}` : ''} {h.distance != null ? `· d=${h.distance.toFixed(3)}` : ''}
              </div>
              {h.snippet && <div className="s" dangerouslySetInnerHTML={{ __html: escapeSnippet(h.snippet) }} />}
            </li>
          ))}
        </ul>

        <main className="reader">
          {!sel && <div className="dim center">左の結果を選択</div>}
          {sel && (
            <>
              <div className="doc-head">
                <h1>{sel.title}</h1>
                <div className="m">{sel.path}</div>
              </div>
              <article className="md" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
              {rel.length > 0 && (
                <aside className="related">
                  <h3>意味的に近い文書</h3>
                  {rel.map((r) => (
                    <button key={r.path} onClick={() => open(r.path)}>
                      <span className="t">{r.title}</span>
                      <span className="m">{r.category} {r.distance != null ? `· d=${r.distance.toFixed(3)}` : ''}</span>
                    </button>
                  ))}
                </aside>
              )}
            </>
          )}
        </main>
        </>
        )}
        </>
        )}
      </div>
    </div>
  )
}

function ArtifactsView({ arts, sel, onSel }: {
  arts: Artifact[] | null
  sel: string | null
  onSel: (path: string) => void
}) {
  if (arts == null) return <div className="art-list dim">…</div>
  return (
    <>
      <nav className="facets art-list">
        <div className="facet-label">成果物 <span>{arts.length}</span></div>
        {arts.length === 0 && <div className="dim" style={{ padding: '8px 4px', fontSize: 12 }}>まだありません。<br />スキルが自己完結 HTML を吐き、ingest で載ります。</div>}
        {arts.map((a) => (
          <button key={a.path} className={`art-item ${sel === a.path ? 'on' : ''}`} onClick={() => onSel(a.path)}>
            <span className="at">{a.title}</span>
            <span className="am">{a.theme}{a.created ? ` · ${a.created}` : ''}</span>
          </button>
        ))}
      </nav>
      <main className="art-stage">
        {sel ? (
          <iframe
            key={sel} className="art-frame" title={sel}
            src={`/api/artifact?path=${encodeURIComponent(sel)}`}
            sandbox="allow-scripts allow-popups allow-downloads"
          />
        ) : (
          <div className="dim center">成果物を選択（HTML をそのまま端末横断で表示）</div>
        )}
      </main>
    </>
  )
}

// FTS snippet の ⟦ ⟧ をハイライトに（他はエスケープ）
function escapeSnippet(s: string): string {
  const esc = s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!))
  return esc.replace(/⟦/g, '<mark>').replace(/⟧/g, '</mark>')
}
