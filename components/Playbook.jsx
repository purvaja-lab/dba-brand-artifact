// Playbook — 3 steps to creative salience
const STEPS = [
{
  n: '01',
  name: 'Assess',
  title: 'Audit what shows up in your ads today.',
  body: 'Run a six-month window of paid spend through a DBA audit. You will be surprised — most brands believe they use cues that the data says are missing in 40–60% of spend.',
  out: ['DBA coverage scorecard', 'Heatmap by channel + market', 'Top 10 leak categories'],
  color: 'var(--cx-coral)',
  bg: 'var(--cx-rose-100)'
},
{
  n: '02',
  name: 'Act',
  title: 'Codify the system. Two rules. Three cues. Non-negotiable.',
  body: 'Pick the 3 DBAs you will defend across every brief, every market, every creator partner. Define their protected zones, timings, color specs, and audio mixes. Write them down. Sign them off.',
  out: ['DBA usage guidelines (12 pages, not 120)', 'Pre-flight quality bar', 'Brief checklist for every team'],
  color: 'var(--cx-marigold)',
  bg: 'var(--cx-orange-100)'
},
{
  n: '03',
  name: 'Systematize',
  title: 'Instrument enforcement. Make compliance the default.',
  body: 'Embed the checklist into your DAM, your brief tool, and your creator contracts. Every asset gets scored before it ships. Salience is no longer aspiration — it is operational.',
  out: ['Pre-flight automated checks', 'Quarterly board-level DBA review', 'Creator briefs with embedded brand bar'],
  color: 'var(--cx-ocean)',
  bg: 'var(--cx-teal-100)'
}];


function Playbook() {
  return (
    <section className="sec sec--sand" id="playbook">
      <div className="wrap-wide">
        <span className="eyebrow eyebrow--coral">06 · The playbook</span>
        <h2 className="sec__title" style={{ fontSize: "62px", letterSpacing: "-1.4px", lineHeight: "0.85" }}>Three moves, in order.
Skip none.</h2>
        <p className="sec__lede" style={{ fontFamily: "\"Greed Standard\"", lineHeight: "1.1" }}>There is no single creative fix. The brands beating the market are the ones that stopped relying on memory and started running brand the way Engineering runs releases.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 64 }} className="play-grid">
          {STEPS.map((s) => <article key={s.n} style={{
              background: s.bg, borderRadius: 24, padding: 36,
              border: '1px solid var(--cx-line)',
              display: 'flex', flexDirection: 'column', minHeight: 480,
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--cx-font-sans)', fontSize: 80, fontWeight: 500, color: s.color, lineHeight: 0.9, letterSpacing: '-0.04em' }}>{s.n}</span>
                <span style={{
                  fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em',
                  padding: '6px 12px', borderRadius: 999, background: 'var(--cx-paper)', border: `1px solid ${s.color}`, color: s.color, fontWeight: 500
                }}>{s.name}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', fontSize: 30, fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.015em', margin: '32px 0 16px', color: 'var(--cx-ocean)' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--cx-fg-deep)', margin: 0 }}>{s.body}</p>

              <div style={{ marginTop: 'auto', paddingTop: 28, borderTop: '1px dashed var(--cx-line)' }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--cx-fg-muted)', marginBottom: 10 }}>You ship</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {s.out.map((o, i) =>
                  <li key={i} style={{ fontSize: 14, color: 'var(--cx-fg)', display: 'flex', gap: 8 }}>
                      <span style={{ color: s.color }}>→</span> {o}
                    </li>
                  )}
                </ul>
              </div>
            </article>
          )}
        </div>

        {/* Pull quote / editorial break */}
        <div style={{ marginTop: 96, padding: '64px 8%', background: 'var(--cx-paper)', borderRadius: 28, border: '1px solid var(--cx-line)', textAlign: 'center', position: 'relative' }}>
          <span style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-coral)' }}>The reframe</span>
          <p className="pull" style={{ maxWidth: '32ch', margin: '20px auto 0', textAlign: 'center', fontSize: 'clamp(28px, 3.4vw, 52px)', color: 'var(--cx-ocean)' }}>
            Creative salience is not a brand problem. <span style={{ color: 'var(--cx-coral)' }}>It's an operating problem.</span>
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .play-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>);

}

window.Playbook = Playbook;