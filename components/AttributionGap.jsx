// AttributionGap — interactive bar chart comparing DBA usage tiers
const { useState: useState_AG, useRef: useRef_AG, useLayoutEffect: useLayoutEffect_AG, useEffect: useEffect_AG } = React;

const GAP_DATA = [
{ tier: '0–1 DBAs', count: '37% of ads', recall: 100, vtr: 100, cpcv: 100, color: 'var(--cx-fg-muted)' },
{ tier: '2 DBAs', count: '', recall: 114, vtr: 127, cpcv: 79, color: 'var(--cx-marigold)' },
{ tier: '3+ DBAs', count: '', recall: 117, vtr: 152, cpcv: 69, color: 'var(--cx-teal-500)' },
{ tier: '4+ DBAs', count: '25% of ads', recall: 128, vtr: 188, cpcv: 55, color: 'var(--cx-coral)' }];


const METRICS = [
{ key: 'recall', label: 'Ad recall', dir: 'up', unit: 'index vs 0–1' },
{ key: 'vtr', label: 'View-through rate', dir: 'up', unit: 'index vs 0–1' },
{ key: 'cpcv', label: 'Cost per completed view', dir: 'down', unit: 'index vs 0–1' }];


function AttributionGap() {
  const [metric, setMetric] = useState_AG('recall');
  const def = METRICS.find((m) => m.key === metric);
  const max = Math.max(...GAP_DATA.map((d) => d[metric]));
  const min = Math.min(...GAP_DATA.map((d) => d[metric]));

  // Sliding-thumb segmented control (matches the brand-led/creator-led switch).
  const btnRefs = useRef_AG([]);
  const [thumb, setThumb] = useState_AG({ left: 4, width: 0 });
  const positionThumb = () => {
    const idx = METRICS.findIndex((m) => m.key === metric);
    const el = btnRefs.current[idx];
    if (el) setThumb({ left: el.offsetLeft, width: el.offsetWidth });
  };
  useLayoutEffect_AG(positionThumb, [metric]);
  useEffect_AG(() => {
    window.addEventListener('resize', positionThumb);
    return () => window.removeEventListener('resize', positionThumb);
  }, [metric]);

  // Pulse the metric switch when this panel arrives at center.
  const switchRef = useRef_AG(null);
  useEffect_AG(() => {
    if (!window.affordanceHint) return;
    const destroy = window.affordanceHint(switchRef.current, 'gap');
    return destroy;
  }, []);

  return (
    <section className="sec sec--ocean" id="gap" style={{ backgroundColor: "rgb(0, 60, 79)" }}>
      <div className="wrap-wide">
        <div style={{ background: 'var(--cx-paper)', borderRadius: 28, padding: '40px 40px 48px', border: '1px solid var(--cx-line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24, marginBottom: 36 }}>
            <div style={{ flex: '1 1 320px', minWidth: 0 }}>
              <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--cx-fg-muted)' }}>Performance by DBA tier</div>
              <div style={{ fontFamily: 'var(--cx-font-serif)', fontSize: 34, fontStyle: 'italic', fontWeight: 500, marginTop: 4, letterSpacing: '-0.01em' }}>
                <span style={{ color: "#003c4f", fontFamily: "\"Greed Standard\"", fontStyle: 'normal' }}>{def.label}</span>
              </div>
              <div style={{ fontFamily: 'var(--cx-font-sans)', fontSize: 16, fontWeight: 400, marginTop: 6, color: "rgb(0, 60, 79)" }}>{def.unit}</div>
            </div>
            <div className="gap-switch" role="group" aria-label="Metric" ref={switchRef}>
              {METRICS.map((m, i) =>
              <button key={m.key} ref={(el) => btnRefs.current[i] = el}
              className={`gap-switch-btn${metric === m.key ? ' is-on' : ''}`}
              aria-pressed={metric === m.key}
              onClick={() => setMetric(m.key)}>
                  {m.label}
                </button>
              )}
              <span className="gap-switch-thumb" aria-hidden="true" style={{ left: thumb.left, width: thumb.width }}></span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="gap-grid">
            {GAP_DATA.map((d, i) => {
              const value = d[metric];
              const isBest = metric === 'cpcv' ? value === min : value === max;
              const isWorst = metric === 'cpcv' ? value === max : value === min;
              // Bar height tracks the actual value: bigger number = taller bar (70..260px)
              const range = Math.abs(max - min) || 1;
              const norm = (value - min) / range;
              const h = 70 + norm * 190;
              // Semantic color: worst tier (the "problem") = coral, best = green, diverging through marigold.
              const goodness = metric === 'cpcv' ? (max - value) / range : (value - min) / range;
              const barColor = goodness < 0.5 ?
                `color-mix(in oklab, var(--cx-marigold) ${goodness * 200}%, var(--cx-coral))` :
                `color-mix(in oklab, var(--cx-green-600) ${(goodness - 0.5) * 200}%, var(--cx-marigold))`;
              const delta = value - 100;
              const deltaStr = (delta > 0 ? '+' : '') + delta + (metric === 'cpcv' ? '%' : '%');
              return (
                <div key={d.tier} style={{
                  border: '1px solid var(--cx-line)', borderRadius: 20, padding: 24,
                  background: isBest ? 'color-mix(in oklab, var(--cx-green-600) 8%, var(--cx-paper))' : 'var(--cx-paper)',
                  position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, minHeight: 26 }}>
                    <div style={{ fontFamily: 'var(--cx-font-sans)', fontSize: 22, fontWeight: 500, color: "rgb(0, 60, 79)" }}>{d.tier}</div>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--cx-fg-muted)', marginTop: 4, minHeight: 18 }}>{d.count}</div>
                  <div style={{ height: 280, display: 'flex', alignItems: 'flex-end', marginTop: 24, position: 'relative' }}>
                    <div style={{
                      width: '100%', height: h, background: barColor, borderRadius: '14px 14px 6px 6px',
                      transition: 'height .55s cubic-bezier(.2,.7,.2,1), background .3s',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 14, gap: 10,
                      color: 'var(--cx-paper)',
                      boxShadow: isBest ? '0 8px 24px rgba(0,135,90,.32)' : 'none'
                    }}>
                      <span style={{ fontFamily: 'var(--cx-font-sans)', fontWeight: 500, fontSize: 28, letterSpacing: '-0.02em' }}>
                        {value}
                      </span>
                      {isBest &&
                      <span style={{ flex: 'none', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--cx-green-600)', background: 'var(--cx-paper)', border: '1px solid var(--cx-green-600)', padding: '4px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>Best in study</span>
                      }
                    </div>
                    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, borderTop: '1px dashed var(--cx-line)' }}></div>
                  </div>
                  <div style={{ marginTop: 16, fontSize: 14, color: 'var(--cx-fg-muted)' }}>
                    {i === 0 ? 'Baseline' : <>
                      <span style={{ color: isBest ? 'var(--cx-green-600)' : 'var(--cx-fg)', fontWeight: 500 }}>{deltaStr}</span> vs baseline
                    </>}
                  </div>
                </div>);

            })}
          </div>

          <div style={{ marginTop: 32, fontSize: 13, color: 'var(--cx-fg-muted)', display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--cx-line)', paddingTop: 20 }}>
            <span>n = 1.4M paid ads · 176 brands · 105+ markets</span>
            <span></span>
          </div>
        </div>
      </div>
      <style>{`
        .gap-switch {
          position: relative; display: inline-flex; align-items: stretch; gap: 0;
          flex: 0 0 auto;
          padding: 4px; border-radius: 12px;
          background: var(--cx-paper-soft); border: 1px solid var(--cx-line);
        }
        .gap-switch-btn {
          position: relative; z-index: 1; border: 0; background: transparent;
          font: 500 16px/1 var(--cx-font-sans); letter-spacing: .1px;
          color: var(--cx-ocean); cursor: pointer;
          padding: 13px 22px; border-radius: 8px;
          transition: color .3s ease; white-space: nowrap;
        }
        .gap-switch-btn.is-on { color: var(--cx-paper); }
        .gap-switch-thumb {
          position: absolute; z-index: 0; top: 4px; bottom: 4px;
          border-radius: 8px; background: var(--cx-ocean);
          transition: left .42s cubic-bezier(.6,.04,.2,1), width .42s cubic-bezier(.6,.04,.2,1);
        }
        @media (max-width: 600px) {
          .gap-switch { display: flex; flex-wrap: wrap; width: 100%; box-sizing: border-box; }
          .gap-switch-btn { flex: 1 1 auto; padding: 12px 16px; font-size: 15px; }
          .gap-switch-thumb { display: none; }
          .gap-switch-btn.is-on { background: var(--cx-ocean); }
        }
        @media (max-width: 760px) {
          .gap-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>);

}

window.AttributionGap = AttributionGap;