// CreativeSalience — a full-section "big moment": as the user scrolls, the
// statement is revealed line-by-line through soft horizontal wipes while the
// whole block drifts upward to keep the freshly-revealed line centered.
const { useRef: useRef_CS, useEffect: useEffect_CS } = React;

const CS_LINES = [
  [{ t: 'Creative Salience', hl: true }, { t: ' is the end-to-end' }],
  [{ t: 'system that ensures every ad is' }],
  [{ t: 'recognizably yours — compounding' }],
  [{ t: 'brand equity across every market,' }],
  [{ t: 'every agency, every platform,' }],
  [{ t: 'before a dollar of media runs.' }]];


function CreativeSalience() {
  const sectionRef = useRef_CS(null);
  const stackRef = useRef_CS(null);
  const lineRefs = useRef_CS([]);

  useEffect_CS(() => {
    const section = sectionRef.current;
    const stack = stackRef.current;
    const lines = lineRefs.current.filter(Boolean);
    if (!section || !stack || !lines.length) return;

    const N = lines.length;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !window.gsap || !window.ScrollTrigger) {
      lines.forEach((el) => el.style.setProperty('--p', 1));
      stack.style.transform = 'translateY(0px)';
      return;
    }

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    // smoothstep for a gentler ease on each line's wipe
    const smooth = (x) => {const c = Math.max(0, Math.min(1, x));return c * c * (3 - 2 * c);};

    let lineStep = 0;
    const measure = () => {
      // vertical distance between consecutive lines (includes the gap)
      if (lines.length > 1) {
        lineStep = lines[1].offsetTop - lines[0].offsetTop;
      } else {
        lineStep = lines[0].offsetHeight;
      }
    };

    const apply = (p) => {
      // Reveal begins as the section rises into view (start: top center) and
      // completes shortly before it exits, so there's no dead scroll at either end.
      const rStart = 0.0, rEnd = 0.96;
      const local = Math.max(0, Math.min(1, (p - rStart) / (rEnd - rStart)));
      // Per-line wipe: each line owns an equal slice of the reveal window, with a
      // little overlap so the wipes feel continuous rather than stepped.
      for (let i = 0; i < N; i++) {
        const start = i / N;
        const end = (i + 1) / N;
        const raw = (local - start) / (end - start);
        lines[i].style.setProperty('--p', smooth(raw + 0.15 * (raw > 0 ? 1 : 0)));
      }
      // Drift: gently nudge the stack upward as lines reveal so the active line
      // trends toward center, but eased and damped so it doesn't race the scroll.
      const DRIFT = 0.5; // 0 = no drift, 1 = fully recenters every line
      const active = smooth(local) * (N - 1);
      const shift = (active - (N - 1) / 2) * lineStep * DRIFT;
      stack.style.transform = `translateY(${-shift}px)`;
    };

    measure();
    apply(0);

    const st = ScrollTrigger.create({
      trigger: section,
      // Begin as the section's top passes the viewport center (i.e. while it's
      // still rising in), finish as its bottom reaches the viewport bottom.
      start: 'top center',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => apply(self.progress),
      onRefresh: () => measure()
    });

    const onResize = () => {measure();apply(st.progress);};
    window.addEventListener('resize', onResize);

    return () => {st.kill();window.removeEventListener('resize', onResize);};
  }, []);

  return (
    <section className="sec--ocean cs-moment" id="salience" ref={sectionRef} style={{ backgroundColor: 'rgb(0, 60, 79)' }}>
      <div className="cs-sticky">
        <div className="wrap-wide" style={{ width: '100%' }}>
          <div className="cs-stack" ref={stackRef}>
            {CS_LINES.map((line, i) =>
              <div key={i} className="cs-line" ref={(el) => lineRefs.current[i] = el}>
                {line.map((seg, j) =>
                  <span key={j} className={seg.hl ? 'cs-hl' : undefined}>{seg.t}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .cs-moment {
          position: relative;
          min-height: 135vh;
          padding: 0;
        }
        .cs-sticky {
          position: sticky; top: 0;
          height: 100vh;
          display: flex; align-items: center;
          overflow: hidden;
        }
        .cs-kicker {
          display: block;
          font-family: var(--cx-font-sans);
          font-size: 13px; font-weight: 500; letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--cx-coral);
          margin-bottom: 40px;
        }
        .cs-stack {
          will-change: transform;
          display: flex; flex-direction: column;
          gap: 0.12em;
        }
        .cs-line {
          --p: 0;
          font-family: var(--cx-font-sans);
          font-weight: 500;
          font-size: clamp(30px, 5.4vw, 84px);
          line-height: 1.06;
          letter-spacing: -0.03em;
          color: var(--cx-paper);
          text-wrap: nowrap;
          /* soft horizontal wipe: a feathered edge sweeps left -> right */
          -webkit-mask-image: linear-gradient(90deg,
            #000 calc(var(--p) * 124% - 24%),
            rgba(0,0,0,0) calc(var(--p) * 124% - 8%));
          mask-image: linear-gradient(90deg,
            #000 calc(var(--p) * 124% - 24%),
            rgba(0,0,0,0) calc(var(--p) * 124% - 8%));
        }
        .cs-hl { color: var(--cx-coral); }

        @media (max-width: 760px) {
          .cs-line { white-space: normal; text-wrap: balance; letter-spacing: -0.02em; }
          .cs-stack { gap: 0.2em; }
        }
      `}</style>
    </section>);

}

window.CreativeSalience = CreativeSalience;
