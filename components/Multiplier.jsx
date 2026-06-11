// Multiplier — the report's 5 real DBA pairings, interactive
const { useState: useState_M, useRef: useRef_M, useEffect: useEffect_M } = React;

// Exact figures from the report's Multiplier Effect section.
const COMBOS = [
{ id: 'color-tagline', a: 'Color', b: 'Tagline', recall: 1, ads: 25, vtr: 25, color: 'var(--cx-purple-500)' },
{ id: 'tagline-pack', a: 'Tagline', b: 'Packshot', recall: 5, ads: 23, vtr: 23, color: 'var(--cx-teal-600)' },
{ id: 'logo-tagline', a: 'Logo', b: 'Tagline', recall: 20, ads: 22, vtr: 21, color: 'var(--cx-marigold)' },
{ id: 'color-pack', a: 'Color', b: 'Packshot', recall: 34, ads: 49, color: 'var(--cx-orange-600)' },
{ id: 'logo-pack', a: 'Logo', b: 'Packshot', recall: 86, ads: 58, cpm: -2, color: 'var(--cx-coral)' }];


const MAX_RECALL = 100;

function Multiplier() {
  const [active, setActive] = useState_M('color-tagline');
  const cur = COMBOS.find((c) => c.id === active);
  const pillRef = useRef_M(null);
  const hintRef = useRef_M(null);

  useEffect_M(() => {
    if (!window.affordanceHint) return;
    const destroy = window.affordanceHint(hintRef.current, 'multiplier');
    return destroy;
  }, []);

  useEffect_M(() => {
    const el = pillRef.current;
    if (!el || !window.gsap) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let st = null;
    const build = () => {
      if (st) return;
      const isStacked = window.matchMedia('(max-width: 767px)').matches;
      const tween = window.__hsTween;
      const base = { y: -64, opacity: 0, scale: 0.97, duration: 0.85, ease: 'back.out(1.5)' };
      if (!isStacked && tween) {
        // Inside the horizontal-scroll track: trigger off the panel's slide.
        st = window.gsap.from(el, {
          ...base,
          scrollTrigger: { trigger: el, containerAnimation: tween, start: 'left 62%', once: true }
        });
      } else {
        // Stacked / no horizontal scroll: ordinary vertical reveal.
        st = window.gsap.from(el, {
          ...base,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });
      }
    };

    if (window.__hsTween || window.matchMedia('(max-width: 767px)').matches) {
      build();
    } else {
      window.addEventListener('hs-tween-ready', build, { once: true });
      // safety fallback if the event was missed
      const t = setTimeout(build, 1200);
      return () => {window.removeEventListener('hs-tween-ready', build);clearTimeout(t);};
    }
    return () => {};
  }, []);

  return (
    <section className="sec sec--ocean" id="multiplier" style={{ backgroundColor: "rgb(0, 60, 79)" }}>
      <div className="wrap-wide">
        <div className="mult-card">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'start' }} className="mult-grid">
            {/* Left: pairing selectors */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {COMBOS.map((c) => {
                  const isOn = active === c.id;
                  return (
                    <button key={c.id} onClick={() => setActive(c.id)} ref={isOn ? hintRef : null}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '18px 20px', borderRadius: 16,
                      border: `1px solid ${isOn ? c.color : 'var(--m-btn-off-border)'}`,
                      background: isOn ? `color-mix(in oklab, ${c.color} 18%, transparent)` : 'var(--m-surface)',
                      color: 'var(--m-ink)', textAlign: 'left', cursor: 'pointer',
                      transition: 'all .25s'
                    }}>
                      <span style={{ width: 10, height: 10, borderRadius: 3, background: c.color, flexShrink: 0 }}></span>
                      <span style={{ flex: 1, fontWeight: 500, fontSize: "20px", textTransform: 'uppercase', letterSpacing: '0.04em' }}>{c.a} <span style={{ color: 'var(--m-ink-faint)' }}>+</span> {c.b}</span>
                      <span style={{ fontFamily: 'var(--cx-font-sans)', fontVariantNumeric: 'tabular-nums', fontWeight: 500, color: isOn ? c.color : 'var(--m-ink-soft)', fontSize: "20px" }}>
                        +{c.recall}%
                      </span>
                    </button>);

                })}
              </div>

              <div style={{ marginTop: 20, color: 'var(--m-ink-faint)', letterSpacing: "0.1px", fontSize: "18px" }}>
                Recall lift vs. ads carrying the same assets in isolation. The strongest pairing is also the most common — but most combinations remain rare.
              </div>
            </div>

            {/* Right: detail meter for the selected pairing */}
            <div style={{ background: 'var(--m-surface)', borderRadius: 28, padding: 36, border: '1px solid var(--m-surface-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: "14px" }}>
                <div style={{ textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--m-ink-soft)', fontSize: "14px" }}>Ad recall lift</div>
                <div style={{ color: 'var(--m-ink-soft)', fontSize: "14px" }}>{cur.a} + {cur.b}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 12 }}>
                <span style={{ fontFamily: 'var(--cx-font-sans)', fontSize: 120, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, color: cur.color, fontVariantNumeric: 'tabular-nums', transition: 'color .3s' }}>
                  +{cur.recall}
                </span>
                <span style={{ fontFamily: 'var(--cx-font-sans)', fontSize: 56, color: cur.color, letterSpacing: '-0.02em', lineHeight: 1, transition: 'color .3s' }}>
                  %
                </span>
              </div>
              <div style={{ color: 'var(--m-ink-soft)', marginTop: 4, fontSize: "18px" }}>higher ad recall when these two cues fire together</div>

              {/* Recall bar across all pairings */}
              <div style={{ marginTop: 36 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--m-ink-faint)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  <span>0%</span><span>+50%</span><span>+100%</span>
                </div>
                <div style={{ height: 56, borderRadius: 12, overflow: 'hidden', background: 'var(--m-track)', position: 'relative' }}>
                  <div style={{
                    height: '100%', width: `${cur.recall / MAX_RECALL * 100}%`, background: cur.color,
                    borderRadius: 12, transition: 'width .5s cubic-bezier(.2,.7,.2,1), background .3s'
                  }}></div>
                  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 calc(25% - 1px), var(--m-track-stripe) calc(25% - 1px) 25%)' }}></div>
                </div>
              </div>

              {/* Supporting facts */}
              <div style={{ marginTop: 36, borderTop: '1px dashed var(--m-divider)', paddingTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div style={{ color: 'var(--m-ink-soft)', fontSize: "16px" }}>Present in</div>
                  <div style={{ fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', marginTop: 6, color: 'var(--m-ink)', fontSize: "32px" }}>
                    {cur.ads}% of ads
                  </div>
                </div>
                <div>
                  <div style={{ color: 'var(--m-ink-soft)', fontSize: "16px" }}>Also drives</div>
                  <div style={{ marginTop: 8, color: 'var(--m-ink)', lineHeight: 1.45, fontSize: "18px" }}>
                    {cur.vtr ? `+${cur.vtr}% higher view-through rate` :
                    cur.cpm ? `${Math.abs(cur.cpm)}% lower CPMs` :
                    'a strong lift in ad recall'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        #multiplier {
          --m-card-bg: transparent;
          --m-card-border: transparent;
          --m-card-pad: 0px;
          --m-surface: rgba(255,255,255,.04);
          --m-surface-border: rgba(255,255,255,.12);
          --m-ink: var(--cx-paper);
          --m-ink-soft: rgba(255,255,255,.6);
          --m-ink-faint: rgba(255,255,255,.5);
          --m-divider: rgba(255,255,255,.14);
          --m-track: rgba(255,255,255,.06);
          --m-track-stripe: rgba(255,255,255,.08);
          --m-btn-off-border: rgba(255,255,255,.16);
        }
        html[data-light-cards] #multiplier {
          --m-card-bg: var(--cx-paper);
          --m-card-border: var(--cx-line);
          --m-card-pad: 40px;
          --m-surface: var(--cx-paper-soft);
          --m-surface-border: var(--cx-line);
          --m-ink: var(--cx-fg-deep);
          --m-ink-soft: var(--cx-fg-muted);
          --m-ink-faint: var(--cx-fg-faint);
          --m-divider: var(--cx-line);
          --m-track: rgba(0,60,79,.08);
          --m-track-stripe: rgba(0,60,79,.07);
          --m-btn-off-border: var(--cx-line);
        }
        .mult-card {
          background: var(--m-card-bg);
          border: 1px solid var(--m-card-border);
          border-radius: 28px;
          padding: var(--m-card-pad);
          transition: background .45s ease, border-color .45s ease, padding .45s ease;
        }
        @media (max-width: 980px) {
          .mult-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          html[data-light-cards] .mult-card { padding: 28px !important; }
        }
        @media (max-width: 720px) {
          .mult-compound-cols { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>);

}

window.Multiplier = Multiplier;