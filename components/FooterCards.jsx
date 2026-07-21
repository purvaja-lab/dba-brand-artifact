// FooterCards — a fan of campaign-asset cards that rises into place on scroll.
// Geometry is decomposed from the Figma frame "footer-cards" (1268×499, origin 0,0):
//   transform = translate(x, y) rotate(deg)  with transform-origin: 0 0
// The stage is overflow-clipped, so cards only show their tops poking up — like
// a hand of cards being fanned open from the bottom edge of the page.

const FC_STAGE_W = 1268;
const FC_STAGE_H = 360;

// Striped photo-asset placeholders, in brand tones.
// (y values trimmed from the Figma frame's large empty top band so the fan
//  sits snugly inside the footer instead of leaving a dead dark gap.)
const FC_CARDS = [
  { x: 297.66, y: 87,  rot: 8.75,  w: 349.2, img: window.__resources.footer1, delay: 120 },
  { x: 594.76, y: 121, rot: -5.68, w: 349.2, img: window.__resources.footer2, delay: 60  },
  { x: 892.74, y: 208, rot: 19.5,  w: 349.2, img: window.__resources.footer3, delay: 200 },
  { x: 80.54,  y: 282, rot: -15.0, w: 388.0, img: window.__resources.footer4, delay: 260 },
];

function FooterCards() {
  const wrapRef = React.useRef(null);
  const [scale, setScale] = React.useState(1);
  const [shown, setShown] = React.useState(false);

  // Scale the fixed 1268-wide stage down to fit the container.
  React.useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => setScale(Math.min(1, wrap.clientWidth / FC_STAGE_W));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // Fan up when the section scrolls into view.
  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setShown(true); return; }
    let done = false;
    const check = () => {
      if (done) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.9 && r.bottom > 0) {
        done = true;
        setShown(true);
        window.removeEventListener('scroll', check);
        window.removeEventListener('resize', check);
      }
    };
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    const raf = requestAnimationFrame(check);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  const easedT = (deg, x, y, rise) =>
    shown ? `translate(${x}px, ${y}px) rotate(${deg}deg)`
          : `translate(${x}px, ${y + rise}px) rotate(0deg)`;

  const cardTransition = (delay) =>
    `transform 1.05s cubic-bezier(.16,1,.3,1) ${delay}ms, opacity .8s ease ${delay}ms`;

  return (
    <div className="fc" ref={wrapRef}>
      <div
        className="fc__stage"
        style={{
          width: FC_STAGE_W,
          height: FC_STAGE_H,
          transform: `scale(${scale})`,
          marginBottom: -(FC_STAGE_H * (1 - scale)),
        }}
      >
        {FC_CARDS.map((c, i) => {
          const photoH = c.w * 0.953;
          return (
            <div
              key={i}
              className="fc__card"
              style={{
                width: c.w,
                height: c.w * 1.227,
                transform: easedT(c.rot, c.x, c.y, 300),
                opacity: shown ? 1 : 0,
                transition: cardTransition(c.delay),
              }}
            >
              <div
                className="fc__photo"
                style={{
                  height: photoH,
                  backgroundImage: `url("${c.img}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
            </div>
          );
        })}

        {/* Center headline card */}
        <div
          className="fc__card fc__hero-card"
          style={{
            width: 448.83,
            height: 418,
            transform: easedT(0, 408.9, 231, 300),
            opacity: shown ? 1 : 0,
            transition: cardTransition(0),
          }}
        >
          <span className="fc__hero-text">SPRITZ NYC{"\n"}SUMMER CAMPAIGN 2025 →</span>
        </div>

        {/* Floating metric tags */}
        <div
          className="fc__tag"
          style={{
            transform: easedT(-15, 92.93, 200, 240),
            opacity: shown ? 1 : 0,
            transition: cardTransition(320),
          }}
        >
          15 ASSETS
        </div>
        <div
          className="fc__tag"
          style={{
            transform: easedT(19.5, 1014.67, 179, 240),
            opacity: shown ? 1 : 0,
            transition: cardTransition(360),
          }}
        >
          CVV: +12%
        </div>
      </div>
    </div>
  );
}

window.FooterCards = FooterCards;
