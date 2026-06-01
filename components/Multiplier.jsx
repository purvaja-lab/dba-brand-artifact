// Multiplier — the report's 5 real DBA pairings, interactive
const { useState: useState_M } = React;

// Exact figures from the report's Multiplier Effect section.
const COMBOS = [
{ id: 'color-tagline', a: 'Color', b: 'Tagline', recall: 1, ads: 25, vtr: 25, color: 'var(--cx-purple-500)' },
{ id: 'tagline-pack', a: 'Tagline', b: 'Packshot', recall: 5, ads: 23, vtr: 23, color: 'var(--cx-teal-600)' },
{ id: 'logo-tagline', a: 'Logo', b: 'Tagline', recall: 20, ads: 22, vtr: 21, color: 'var(--cx-marigold)' },
{ id: 'color-pack', a: 'Color', b: 'Packshot', recall: 34, ads: 49, color: 'var(--cx-orange-600)' },
{ id: 'logo-pack', a: 'Logo', b: 'Packshot', recall: 86, ads: 58, cpm: -2, color: 'var(--cx-coral)' }];


const MAX_RECALL = 100;

function Multiplier() {
  const [active, setActive] = useState_M('logo-pack');
  const cur = COMBOS.find((c) => c.id === active);

  return (
    <section className="sec sec--ocean" id="multiplier">
      <div className="wrap-wide">
        <div className="grid-2" style={{ alignItems: 'end' }}>
          <div>
            <span className="eyebrow eyebrow--paper">03 · The multiplier effect</span>
            <h2 className="sec__title" style={{ color: 'var(--cx-paper)', fontSize: "62px" }}>Brand cues don't add. <em style={{ fontSize: "62px" }}>They compound.</em></h2>
          </div>
          <p className="sec__lede" style={{ color: 'rgba(255,255,255,.85)', fontFamily: "\"Greed Standard\"", lineHeight: "0.9" }}>
            Logo and packshot together drive +86% ad recall — more than the sum of their parts. Select any pairing to see how much recall it drives, and how rarely it's actually used.
          </p>
        </div>

        <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'start' }} className="mult-grid">
          {/* Left: pairing selectors */}
          <div>
            <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,.55)', marginBottom: 16 }}>
              The five pairings the report tested
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {COMBOS.map((c) => {
                const isOn = active === c.id;
                return (
                  <button key={c.id} onClick={() => setActive(c.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '18px 20px', borderRadius: 16,
                    border: `1px solid ${isOn ? c.color : 'rgba(255,255,255,.16)'}`,
                    background: isOn ? `color-mix(in oklab, ${c.color} 18%, transparent)` : 'rgba(255,255,255,.04)',
                    color: 'var(--cx-paper)', textAlign: 'left', cursor: 'pointer',
                    transition: 'all .25s'
                  }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: c.color, flexShrink: 0 }}></span>
                    <span style={{ flex: 1, fontSize: 16, fontWeight: 500 }}>{c.a} <span style={{ color: 'rgba(255,255,255,.5)' }}>+</span> {c.b}</span>
                    <span style={{ fontFamily: 'var(--cx-font-sans)', fontVariantNumeric: 'tabular-nums', fontSize: 18, fontWeight: 500, color: isOn ? c.color : 'rgba(255,255,255,.7)' }}>
                      +{c.recall}%
                    </span>
                  </button>);

              })}
            </div>

            <div style={{ marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,.5)' }}>
              Recall lift vs. ads carrying the same assets in isolation. The strongest pairing is also the most common — but most combinations remain rare.
            </div>
          </div>

          {/* Right: detail meter for the selected pairing */}
          <div style={{ background: 'rgba(255,255,255,.04)', borderRadius: 28, padding: 36, border: '1px solid rgba(255,255,255,.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,.55)' }}>Ad recall lift</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>{cur.a} + {cur.b}</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 12 }}>
              <span style={{ fontFamily: 'var(--cx-font-sans)', fontSize: 120, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, color: cur.color, fontVariantNumeric: 'tabular-nums', transition: 'color .3s' }}>
                +{cur.recall}
              </span>
              <span style={{ fontFamily: 'var(--cx-font-sans)', fontSize: 56, color: cur.color, letterSpacing: '-0.02em', lineHeight: 1, transition: 'color .3s' }}>
                %
              </span>
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', marginTop: 4 }}>higher ad recall when these two cues fire together</div>

            {/* Recall bar across all pairings */}
            <div style={{ marginTop: 36 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,.5)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                <span>0%</span><span>+50%</span><span>+100%</span>
              </div>
              <div style={{ height: 56, borderRadius: 12, overflow: 'hidden', background: 'rgba(255,255,255,.06)', position: 'relative' }}>
                <div style={{
                  height: '100%', width: `${cur.recall / MAX_RECALL * 100}%`, background: cur.color,
                  borderRadius: 12, transition: 'width .5s cubic-bezier(.2,.7,.2,1), background .3s'
                }}></div>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 calc(25% - 1px), rgba(255,255,255,.08) calc(25% - 1px) 25%)' }}></div>
              </div>
            </div>

            {/* Supporting facts */}
            <div style={{ marginTop: 36, borderTop: '1px dashed rgba(255,255,255,.14)', paddingTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>Present in</div>
                <div style={{ fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', fontSize: 30, marginTop: 6, color: 'var(--cx-paper)' }}>
                  {cur.ads}% of ads
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>Also drives</div>
                <div style={{ fontSize: 15, marginTop: 8, color: 'rgba(255,255,255,.85)', lineHeight: 1.45 }}>
                  {cur.vtr ? `+${cur.vtr}% higher view-through rate` :
                  cur.cpm ? `${Math.abs(cur.cpm)}% lower CPMs` :
                  'a strong lift in ad recall'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .mult-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>);

}

window.Multiplier = Multiplier;
