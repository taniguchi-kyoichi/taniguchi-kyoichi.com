import type { HomeData } from './api'

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

export function Home({ data, onStatus, onOpen }: {
  data: HomeData
  onStatus: (s: string) => void
  onOpen: (path: string) => void
}) {
  const { intent, trajectory, loop, states, recent } = data
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
