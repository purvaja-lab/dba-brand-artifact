// AttributionGap — interactive bar chart comparing DBA usage tiers
const { useState: useState_AG } = React;

const GAP_DATA = [
{ tier: '0–1 DBAs', count: '37% of ads', recall: 100, vtr: 100, cpcv: 100, color: 'var(--cx-fg-muted)' },
{ tier: '2 DBAs', count: '38% of ads', recall: 118, vtr: 109, cpcv: 92, color: 'var(--cx-marigold)' },
{ tier: '3+ DBAs', count: '25% of ads', recall: 128, vtr: 121, cpcv: 81, color: 'var(--cx-coral)' }];


const METRICS = [
{ key: 'recall', label: 'Ad recall', dir: 'up', unit: 'index vs 0–1' },
{ key: 'vtr', label: 'View-through rate', dir: 'up', unit: 'index vs 0–1' },
{ key: 'cpcv', label: 'Cost per completed view', dir: 'down', unit: 'index vs 0–1' }];


function AttributionGap() {
  const [metric, setMetric] = useState_AG('recall');
  const def = METRICS.find((m) => m.key === metric);
  const max = Math.max(...GAP_DATA.map((d) => d[metric]));
  const min = Math.min(...GAP_DATA.map((d) => d[metric]));

  return (
    <section className="sec sec--sand" id="gap">
      <div className="wrap-wide">
        <div className="grid-2" style={{ alignItems: 'end' }}>
          <div>
            <span className="eyebrow">02 · The attribution gap</span>
            <h2 className="sec__title" style={{ fontSize: "62px" }}>Three out of five ads fail the recognition test.</h2>
          </div>
          <p className="sec__lede" style={{ fontFamily: "\"Greed Standard\"", lineHeight: "1" }}>
            Every additional DBA compounds memorability. Yet 61% of paid ads in our sample carry one cue or none — running spend through impressions that consumers can't tie back to a brand 24 hours later.
          </p>
        </div>

        <div style={{ marginTop: 72, background: 'var(--cx-paper)', borderRadius: 28, padding: '40px 40px 48px', border: '1px solid var(--cx-line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24, marginBottom: 36 }}>
            <div>
              <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--cx-fg-muted)' }}>Performance by DBA tier</div>
              <div style={{ fontFamily: 'var(--cx-font-serif)', fontSize: 34, fontStyle: 'italic', fontWeight: 500, marginTop: 4, letterSpacing: '-0.01em' }}>
                {def.label} <span style={{ fontStyle: 'normal', fontFamily: 'var(--cx-font-sans)', fontSize: 14, color: 'var(--cx-fg-muted)', fontWeight: 400, marginLeft: 8 }}>{def.unit}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, padding: 4, background: 'var(--cx-paper-soft)', borderRadius: 999 }}>
              {METRICS.map((m) =>
              <button key={m.key} onClick={() => setMetric(m.key)}
              style={{
                padding: '10px 18px', borderRadius: 999,
                background: metric === m.key ? 'var(--cx-ocean)' : 'transparent',
                color: metric === m.key ? 'var(--cx-paper)' : 'var(--cx-fg-deep)',
                fontSize: 14, fontWeight: 500, transition: 'all .25s'
              }}>
                  {m.label}
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="gap-grid">
            {GAP_DATA.map((d, i) => {
              const value = d[metric];
              const isBest = metric === 'cpcv' ? value === min : value === max;
              const isWorst = metric === 'cpcv' ? value === max : value === min;
              // Bar height: scale 70..260px
              const range = Math.abs(max - min) || 1;
              const norm = (value - min) / range;
              const h = metric === 'cpcv' ? 260 - norm * 190 : 70 + norm * 190;
              const delta = value - 100;
              const deltaStr = (delta > 0 ? '+' : '') + delta + (metric === 'cpcv' ? '%' : '%');
              return (
                <div key={d.tier} style={{
                  border: '1px solid var(--cx-line)', borderRadius: 20, padding: 24,
                  background: isBest ? 'color-mix(in oklab, var(--cx-coral) 8%, var(--cx-paper))' : 'var(--cx-paper)',
                  position: 'relative', overflow: 'hidden'
                }}>
                  {isBest &&
                  <span style={{ position: 'absolute', top: 16, right: 16, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--cx-coral)', background: 'var(--cx-paper)', border: '1px solid var(--cx-coral)', padding: '4px 10px', borderRadius: 999 }}>Best in study</span>
                  }
                  <div style={{ fontFamily: 'var(--cx-font-sans)', fontSize: 22, fontWeight: 500 }}>{d.tier}</div>
                  <div style={{ fontSize: 13, color: 'var(--cx-fg-muted)', marginTop: 4 }}>{d.count}</div>
                  <div style={{ height: 280, display: 'flex', alignItems: 'flex-end', marginTop: 24, position: 'relative' }}>
                    <div style={{
                      width: '100%', height: h, background: d.color, borderRadius: '14px 14px 6px 6px',
                      transition: 'height .55s cubic-bezier(.2,.7,.2,1), background .3s',
                      display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 14,
                      color: 'var(--cx-paper)',
                      boxShadow: isBest ? '0 8px 24px rgba(255,98,117,.35)' : 'none'
                    }}>
                      <span style={{ fontFamily: 'var(--cx-font-sans)', fontWeight: 500, fontSize: 28, letterSpacing: '-0.02em' }}>
                        {value}
                      </span>
                    </div>
                    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, borderTop: '1px dashed var(--cx-line)' }}></div>
                  </div>
                  <div style={{ marginTop: 16, fontSize: 14, color: 'var(--cx-fg-muted)' }}>
                    {i === 0 ? 'Baseline' : <>
                      <span style={{ color: isBest ? 'var(--cx-coral)' : 'var(--cx-fg)', fontWeight: 500 }}>{deltaStr}</span> vs baseline
                    </>}
                  </div>
                </div>);

            })}
          </div>

          <div style={{ marginTop: 32, fontSize: 13, color: 'var(--cx-fg-muted)', display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--cx-line)', paddingTop: 20 }}>
            <span>n = 1,406,388 paid ads · 38 markets · Jan 2024 – Sep 2025</span>
            <span>Source: CreativeX Brand Salience Index</span>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 760px) {
          .gap-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>);

}

window.AttributionGap = AttributionGap;