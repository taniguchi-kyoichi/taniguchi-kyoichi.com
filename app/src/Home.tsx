import type { HomeData, BoardBrief, BoardItem } from './api'

const WD = ['日', '月', '火', '水', '木', '金', '土']
function fmtToday(s: string): string {
  const d = new Date(s + 'T00:00:00')
  return `${s} (${WD[d.getDay()]})`
}
function ago(n: number | null): string {
  if (n == null) return '—'
  if (n === 0) return '今日'
  if (n === 1) return '昨日'
  return `${n}日前`
}

export function Home({ data, board, onStatus, onOpen }: {
  data: HomeData
  board: BoardBrief | null
  onStatus: (s: string) => void
  onOpen: (path: string) => void
}) {
  const { intent, trajectory, loop, states, recent } = data
  // api が旧版でも落ちないよう既定を用意（weekly 未返却時は静かに非 due）
  const weekly = data.weekly ?? { last: null, daysSince: null, due: false }
  const loopGap = loop.daysSinceDay
  const loopDrift = loopGap != null && loopGap >= 2
  const reflGap = loop.daysSinceReflection

  return (
    <div className="home">
      <div className="home-hd">
        <div className="home-date">{fmtToday(data.today)}</div>
        <div className="home-sub">Life Mirror — 今の状態を映す</div>
      </div>

      {/* 現在地 */}
      <section className="home-card">
        <h2>現在地</h2>
        <div className="home-intent">
          {intent.deep.map((d) => <span key={d} className="chip deep">{d}</span>)}
        </div>
        {intent.livingInterests.length > 0 && (
          <div className="home-living">
            <div className="home-lbl">今の関心</div>
            <ul>{intent.livingInterests.slice(0, 5).map((t, i) => <li key={i}>{t}</li>)}</ul>
          </div>
        )}
      </section>

      {/* 今の進行（board #2） */}
      {board && <BoardSection board={board} />}

      {/* 日次ループ */}
      <section className={`home-card ${loopDrift ? 'warn' : ''}`}>
        <h2>日次ループ</h2>
        {loopDrift ? (
          <p className="home-drift">
            最後の日次が <b>{ago(loopGap)}</b>（{loop.lastDay}）。<br />
            <span className="muted">Never Miss Twice — 今夜 <code>/daily-log</code> で1タッチすれば戻せます。</span>
          </p>
        ) : (
          <p className="muted">日次は生きています（最後: {ago(loopGap)}）。</p>
        )}
        {loop.lastPlanMit && (
          <div className="home-mit">
            <div className="home-lbl">直近の MIT（{loop.lastPlanDate}）</div>
            <div className="home-mit-body">{loop.lastPlanMit}</div>
          </div>
        )}
        <div className="home-lbl">reflection: {ago(reflGap)}{reflGap != null && reflGap > 30 ? '（久しく途絶）' : ''}</div>
      </section>

      {/* 週次リズム */}
      <section className={`home-card ${weekly.due ? 'warn' : ''}`}>
        <h2>週次リズム</h2>
        {weekly.last == null ? (
          <p className="home-drift">
            週次レビューは <b>未実施</b>。<br />
            <span className="muted"><code>/weekly</code> で今週を1本 — 四半期の North Star と日々の MIT が繋がります。</span>
          </p>
        ) : weekly.due ? (
          <p className="home-drift">
            前回の週次から <b>{ago(weekly.daysSince)}</b>（{weekly.last}）。<br />
            <span className="muted"><code>/weekly</code> で今週を締めるタイミング。</span>
          </p>
        ) : (
          <p className="muted">週次は生きています（最後: {ago(weekly.daysSince)} · {weekly.last}）。</p>
        )}
      </section>

      {/* 滞留 */}
      <section className="home-card">
        <h2>滞留 / 状態</h2>
        <div className="home-states">
          {(['inbox', 'draft', 'in-progress', 'blocked', 'done', 'archived'] as const).map((s) => (
            states[s] ? (
              <button key={s} className={`state-chip st-${s}`} onClick={() => onStatus(s)}>
                {s} <b>{states[s]}</b>
              </button>
            ) : null
          ))}
        </div>
        <div className="home-lbl">
          未処理 <b>{states['inbox'] ?? 0}</b> / 未確定 <b>{states['draft'] ?? 0}</b>
          {trajectory.stale && <>　·　value-trajectory 陳腐化（更新 {ago(trajectory.daysSince)}）</>}
        </div>
      </section>

      {/* 直近 */}
      <section className="home-card">
        <h2>直近の活動</h2>
        <div className="home-recent">
          {recent.map((r) => (
            <button key={r.path} onClick={() => onOpen(r.path)}>
              <span className="t">{r.title}</span>
              <span className="m">{r.category}{r.created ? ` · ${r.created}` : ''}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function BoardRow({ it }: { it: BoardItem }) {
  const meta = it.repo ? it.repo.replace(/^no-problem-dev\//, '').replace(/^taniguchi-kyoichi\//, '') : 'draft'
  const inner = (
    <>
      <span className="t">{it.title}</span>
      <span className="m">{meta}</span>
    </>
  )
  return it.url
    ? <a className="board-row" href={it.url} target="_blank" rel="noreferrer">{inner}</a>
    : <div className="board-row draft">{inner}</div>
}

function BoardSection({ board }: { board: BoardBrief }) {
  const { counts, wip, wipLimit } = board
  const wipOver = wip > wipLimit
  const warn = wipOver || board.stale.length > 0
  return (
    <section className={`home-card ${warn ? 'warn' : ''}`}>
      <h2>今の進行 — board</h2>

      <div className="board-lead">いま回している</div>
      {board.inProgress.length ? (
        <div className="board-list">{board.inProgress.map((it, i) => <BoardRow key={i} it={it} />)}</div>
      ) : (
        <p className="muted board-empty">アクティブに回しているものは無し。<span className="muted">次を <b>Ready</b> から引くタイミング。</span></p>
      )}

      {board.inReview.length > 0 && (
        <>
          <div className="board-lead">承認待ち<span className="muted"> — あなたの確認で Done に進む</span></div>
          <div className="board-list">{board.inReview.map((it, i) => <BoardRow key={i} it={it} />)}</div>
        </>
      )}

      {board.ready.length > 0 && (
        <>
          <div className="board-lead">次に引ける（Ready {counts.ready}）</div>
          <div className="board-list">{board.ready.map((it, i) => <BoardRow key={i} it={it} />)}</div>
        </>
      )}

      <div className="board-counts">
        <span className={wipOver ? 'over' : ''}>WIP <b>{wip}/{wipLimit}</b></span>
        <span>Ready <b>{counts.ready}</b></span>
        <span>Blocked <b>{counts.blocked}</b></span>
        <span>Backlog <b>{counts.backlog}</b></span>
      </div>
      {board.stale.length > 0 && (
        <div className="home-lbl">⚠ CLOSED なのに列に残る <b>{board.stale.length}</b> 件 — board 掃除の合図</div>
      )}
    </section>
  )
}
