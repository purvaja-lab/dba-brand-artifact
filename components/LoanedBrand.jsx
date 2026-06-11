// LoanedBrand — when creators carry your ad, brand cues disappear.
// Interactive "hand-off" slider: drag from Brand-led → Creator-led and
// watch each DBA cue fade, shrink, or (for mascot/packshot) hold & grow.
const { useState: useState_LB, useRef: useRef_LB, useEffect: useEffect_LB } = React;

// brand = presence in brand-owned content; creator = presence in creator-led content
const LB_CUES = [
{ cue: 'Logo', brand: 73, creator: 40,
  path: 'M12 3l2.6 5.6L21 9.4l-4.5 4.2 1.1 6.1L12 16.9 6.4 19.7l1.1-6.1L3 9.4l6.4-.8z' },
{ cue: 'Color', brand: 58, creator: 40,
  path: 'M12 3c-4 4.5-6.5 7.8-6.5 11A6.5 6.5 0 0 0 12 20.5 6.5 6.5 0 0 0 18.5 14C18.5 10.8 16 7.5 12 3z' },
{ cue: 'Packshot', brand: 74, creator: 75,
  path: 'M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z M3.5 7.5L12 12l8.5-4.5 M12 12v9' },
{ cue: 'Tagline', brand: 29, creator: 13,
  path: 'M4 6h16 M4 11h16 M4 16h9' },
{ cue: 'Mascot', brand: 17, creator: 41,
  path: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M8.5 10.5h.01 M15.5 10.5h.01 M8.5 15c1 1.2 2.1 1.8 3.5 1.8s2.5-.6 3.5-1.8' }];


function LoanedBrand() {
  // mode: false = brand-led, true = creator-led
  const [creator, setCreator] = useState_LB(false);
  const pillRef = useRef_LB(null);
  const switchRef = useRef_LB(null);

  useEffect_LB(() => {
    if (!window.affordanceHint) return;
    const destroy = window.affordanceHint(switchRef.current, 'loaned');
    return destroy;
  }, []);

  useEffect_LB(() => {
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
        st = window.gsap.from(el, {
          ...base,
          scrollTrigger: { trigger: el, containerAnimation: tween, start: 'left 88%', once: true }
        });
      } else {
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
      const t = setTimeout(build, 1200);
      return () => { window.removeEventListener('hs-tween-ready', build); clearTimeout(t); };
    }
    return () => {};
  }, []);
  const t = creator ? 100 : 0;
  const mix = creator ? 1 : 0;

  // Live interpolated presence for each cue at the current hand-off point.
  const cues = LB_CUES.map((c) => {
    const present = Math.round(c.brand + (c.creator - c.brand) * mix);
    const fades = c.creator < c.brand;
    return { ...c, present, fades, drop: c.creator - c.brand };
  });

  const fadedCount = cues.filter((c) => c.fades).length;

  return (
    <section className="sec sec--ocean" id="loaned">
      <div className="wrap-wide">
        <div className="lb-card" style={{ backgroundColor: "var(--lb-card-bg)", borderColor: "var(--lb-card-border)" }}>
          {/* Header */}
          <div className="lb-head">
            <div>
              <div className="lb-card-title" style={{ fontFamily: "\"Greed Standard\"" }}><span style={{ color: "var(--lb-ink)" }}>The hand-off</span></div>
              <div className="lb-card-sub" style={{ fontSize: "18px", letterSpacing: "0.1px", color: "var(--lb-ink-soft)" }}>Switch between brand-owned and creator-led content</div>
            </div>
          </div>

          {/* Cue stage — chips react live to the slider */}
          <div className="lb-stage">
            {cues.map((c) => {
              const moved = creator;
              const grew = c.drop > 0;
              return (
                <div key={c.cue} className="lb-chip">
                  <div className="lb-chip-ring">
                    <svg viewBox="0 0 24 24" width="46" height="46" fill="none"
                    strokeWidth="1.7"
                    strokeLinecap="round" strokeLinejoin="round" style={{ stroke: (moved && !grew) ? 'var(--lb-neg)' : 'var(--lb-pos)', transition: 'stroke .3s ease' }}>
                      <path d={c.path} />
                    </svg>
                  </div>
                  <div className="lb-chip-pct" style={{ ...{ color: moved ? grew ? 'var(--cx-ocean)' : 'var(--cx-coral)' : 'var(--cx-fg-deep)' }, color: "var(--lb-ink)" }}>{c.present}%</div>
                  <div className="lb-chip-name" style={{ fontSize: "16px", fontWeight: "400", color: "var(--lb-ink)" }}>{c.cue}</div>
                  <div className={`lb-chip-tag ${grew ? 'is-up' : 'is-down'}`} style={{ opacity: moved ? 1 : 0 }}>
                    {grew ? '▲ holds' : '▼ fades'}
                  </div>
                </div>);

            })}
          </div>

          {/* The switch — two discrete states */}
          <div className="lb-slider">
            <div className="lb-switch" role="group" aria-label="Content source" ref={switchRef} style={{ borderRadius: "10px" }}>
              <button
                type="button"
                className={`lb-switch-btn${!creator ? ' is-on' : ''}`}
                aria-pressed={!creator}
                onClick={() => setCreator(false)} style={{ borderRadius: "0px" }}>
                Brand-led
              </button>
              <button
                type="button"
                className={`lb-switch-btn is-creator${creator ? ' is-on' : ''}`}
                aria-pressed={creator}
                onClick={() => setCreator(true)} style={{ borderRadius: "8px" }}>
                Creator-led
              </button>
              <span className={`lb-switch-thumb${creator ? ' is-creator' : ''}`} aria-hidden="true"></span>
            </div>
            <div className="lb-readout" style={{ fontSize: "18px", color: "var(--lb-ink-soft)" }}>
              {!creator ?
              'Brand-owned content: cues are present and your media spend builds your brand.' :
              `Creator-led content: ${fadedCount} of 5 cues fade — packshot and mascot are all that survive.`}
            </div>
          </div>
        </div>

        {/* The waste — styled to match the Creative Salience callout */}
        <div className="lb-pill" ref={pillRef}>
          <p className="lb-pill-text" style={{ fontWeight: "400", color: "var(--lb-pill-ink)" }}>
            <span className="lb-pill-hl">45%</span> of creator spend on Meta is unbranded — and not watched past the first three seconds. The fix isn't fewer creators; it's a non-negotiable brand checklist every partner ships against.
          </p>
        </div>
      </div>

      <style>{`
        #loaned {
          --lb-pos: var(--cx-green-500);
          --lb-neg: var(--cx-coral);
          --lb-card-bg: rgba(255,255,255,.04);
          --lb-card-border: rgba(255,255,255,.16);
          --lb-ink: #fafaf0;
          --lb-ink-soft: rgba(250,250,240,.72);
          --lb-ring-op: 0.73;
          --lb-pill-bg: rgba(255,255,255,.04);
          --lb-pill-border: rgba(255,255,255,.16);
          --lb-pill-ink: var(--cx-paper);
        }
        html[data-light-cards] #loaned {
          --lb-card-bg: var(--cx-paper);
          --lb-card-border: var(--cx-line);
          --lb-ink: var(--cx-fg-deep);
          --lb-ink-soft: var(--cx-fg-muted);
          --lb-ring-op: 1;
          --lb-pill-bg: var(--cx-paper-soft);
          --lb-pill-border: var(--cx-line);
          --lb-pill-ink: var(--cx-fg-deep);
        }
        .lb-card {
          margin-top: 0; background: var(--cx-paper);
          border-radius: 28px; border: 1px solid var(--cx-line);
          padding: 40px 48px 44px;
          transition: background .45s ease, border-color .45s ease;
        }
        .lb-head {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 24px; flex-wrap: wrap;
        }
        .lb-card-title {
          font-family: var(--cx-font-serif); font-style: normal; font-weight: 500;
          font-size: 30px; letter-spacing: -0.01em; color: var(--cx-fg-deep);
        }
        .lb-card-sub { font-size: 14px; color: var(--cx-fg-muted); margin-top: 4px; }

        .lb-stage {
          display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;
          align-items: end; margin: 44px 0 8px;
          min-height: 200px; padding: 12px 0 4px;
        }
        .lb-chip { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .lb-chip-ring {
          width: 84px; height: 84px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 6px;
        }
        .lb-chip-pct {
          font-family: var(--cx-font-sans); font-weight: 600; font-size: 22px;
          letter-spacing: -0.01em; transition: color .25s;
        }
        .lb-chip-name { font-size: 14px; font-weight: 500; color: var(--cx-fg-deep); }
        .lb-chip-tag {
          font-size: 11px; font-weight: 600; letter-spacing: 0.04em;
          text-transform: uppercase; transition: opacity .25s;
        }
        .lb-chip-tag.is-up { color: var(--lb-pos); }
        .lb-chip-tag.is-down { color: var(--lb-neg); }

        .lb-slider { margin-top: 28px; border-top: 1px dashed var(--cx-line); padding-top: 26px; }
        .lb-switch {
          position: relative; display: inline-grid; grid-template-columns: 1fr 1fr;
          gap: 0; padding: 4px; border-radius: 12px;
          background: var(--cx-paper-soft); border: 1px solid var(--cx-line);
        }
        .lb-switch-btn {
          position: relative; z-index: 1; border: 0; background: transparent;
          font: 500 14px/1 var(--cx-font-sans); letter-spacing: .1px;
          color: var(--cx-ocean); cursor: pointer;
          padding: 13px 28px; border-radius: 8px; transition: color .3s ease;
          white-space: nowrap;
        }
        .lb-switch-btn.is-on { color: var(--cx-paper); }
        .lb-switch-thumb {
          position: absolute; z-index: 0; top: 4px; left: 4px; bottom: 4px;
          width: calc(50% - 4px); border-radius: 8px; background: var(--cx-ocean);
          transition: transform .42s cubic-bezier(.6,.04,.2,1), background .3s ease;
        }
        .lb-switch-thumb.is-creator { transform: translateX(100%); background: var(--cx-coral); }
        .lb-readout {
          margin-top: 18px; font-family: "Greed Standard"; font-size: 16px;
          line-height: 1.4; color: var(--cx-fg-deep); max-width: 64ch; min-height: 44px;
        }

        .lb-pill {
          margin-top: 24px; padding: 32px 36px;
          background: var(--lb-pill-bg); border: 1px solid var(--lb-pill-border);
          border-radius: 20px;
          transition: background .45s ease, border-color .45s ease;
        }
        .lb-pill-text {
          margin: 0; font-family: var(--cx-font-sans); font-weight: 500;
          font-size: 26px; line-height: 1.2; letter-spacing: -0.01em;
          color: var(--lb-pill-ink);
        }
        .lb-pill-hl { color: var(--cx-coral); font-weight: 500; }

        @media (max-width: 980px) {
          .lb-card { padding: 32px 28px 36px; }
          .lb-stage { grid-template-columns: repeat(5, 1fr); gap: 8px; min-height: 0; }
          .lb-chip-ring { width: 60px; height: 60px; }
          .lb-chip-ring svg { width: 36px; height: 36px; }
          .lb-chip-pct { font-size: 17px; }
          .lb-chip-name { font-size: 12px; }
          .lb-pill { padding: 26px 24px; }
          .lb-pill-text { font-size: 21px; }
        }
      `}</style>
    </section>);

}

window.LoanedBrand = LoanedBrand;