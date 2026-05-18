// LoanedBrand — when creators carry your ad, brand cues disappear
const { useState: useState_LB } = React;

const LB_DATA = [
  { cue: 'Logo',        brand: 78, creator: 42 },
  { cue: 'Packshot',    brand: 54, creator: 19 },
  { cue: 'Brand color', brand: 41, creator: 14 },
  { cue: 'Tagline',     brand: 23, creator: 6  },
  { cue: 'Mascot',      brand: 11, creator: 3  },
];

function LoanedBrand() {
  const [hover, setHover] = useState_LB(null);
  const max = 100;
  return (
    <section className="sec sec--cream" id="loaned">
      <div className="wrap-wide">
        <div className="grid-2" style={{ alignItems: 'end' }}>
          <div>
            <span className="eyebrow eyebrow--coral">04 · The loaned brand</span>
            <h2 className="sec__title">When creators do the talking, your brand goes silent.</h2>
          </div>
          <p className="sec__lede">
            Creator content drives reach — and drops cue density. Across the same dataset, paid creator ads carried roughly <strong>half</strong> the brand assets of in-house production. That's $52Bn of impressions trained on the creator's identity, not yours.
          </p>
        </div>

        <div style={{ marginTop: 72, background: 'var(--cx-paper)', borderRadius: 28, border: '1px solid var(--cx-line)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 0 }} className="lb-grid">
            <div style={{ padding: '40px 40px 32px' }}>
              <div style={{ display: 'flex', gap: 24, alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 28 }}>
                <div style={{ fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', fontWeight: 500, fontSize: 30, letterSpacing: '-0.01em' }}>DBA presence by content source</div>
                <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--cx-fg-muted)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--cx-ocean)' }}></span>
                    Brand-owned
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--cx-coral)' }}></span>
                    Creator-led
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                {LB_DATA.map(d => {
                  const drop = Math.round(((d.brand - d.creator) / d.brand) * 100);
                  const isActive = hover === d.cue;
                  return (
                    <div key={d.cue}
                         onMouseEnter={() => setHover(d.cue)}
                         onMouseLeave={() => setHover(null)}
                         style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px', gap: 16, alignItems: 'center' }}>
                      <div style={{ fontSize: 15, fontWeight: 500 }}>{d.cue}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div style={{ height: 18, background: 'var(--cx-paper-soft)', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
                          <div style={{ position: 'absolute', inset: '0 auto 0 0', width: `${(d.brand/max)*100}%`, background: 'var(--cx-ocean)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8, transition: 'width .55s cubic-bezier(.2,.7,.2,1)' }}>
                            <span style={{ color: 'var(--cx-paper)', fontSize: 11, fontWeight: 500 }}>{d.brand}%</span>
                          </div>
                        </div>
                        <div style={{ height: 18, background: 'var(--cx-paper-soft)', borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
                          <div style={{ position: 'absolute', inset: '0 auto 0 0', width: `${(d.creator/max)*100}%`, background: 'var(--cx-coral)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8, transition: 'width .55s cubic-bezier(.2,.7,.2,1) .05s' }}>
                            <span style={{ color: 'var(--cx-paper)', fontSize: 11, fontWeight: 500 }}>{d.creator}%</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', fontFamily: 'var(--cx-font-sans)', fontSize: 18, fontWeight: 500, color: isActive ? 'var(--cx-coral)' : 'var(--cx-fg-deep)', transition: 'color .2s' }}>
                        −{drop}%
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 24, fontSize: 12, color: 'var(--cx-fg-muted)', borderTop: '1px dashed var(--cx-line)', paddingTop: 14 }}>
                Drop column: percent reduction in cue presence when content is creator-led vs brand-owned.
              </div>
            </div>

            <div style={{ padding: 40, background: 'var(--cx-ocean)', color: 'var(--cx-paper)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,.55)' }}>The opportunity</div>
                <div style={{ fontFamily: 'var(--cx-font-sans)', fontSize: 120, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.04em', marginTop: 8, color: 'var(--cx-paper)' }}>
                  $52<span style={{ fontSize: 56, color: 'var(--cx-coral)' }}>Bn</span>
                </div>
                <div style={{ fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', fontSize: 22, marginTop: 14, color: 'var(--cx-paper)', lineHeight: 1.3, maxWidth: '20ch' }}>
                  global creator spend running without recognizable brand cues.
                </div>
              </div>
              <div style={{ marginTop: 32, borderTop: '1px solid rgba(255,255,255,.18)', paddingTop: 20, fontSize: 14, color: 'rgba(255,255,255,.75)', lineHeight: 1.5 }}>
                The fix isn't fewer creators. It's a non-negotiable brand checklist every partner ships against — set once, enforced on every deliverable.
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .lb-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.LoanedBrand = LoanedBrand;
