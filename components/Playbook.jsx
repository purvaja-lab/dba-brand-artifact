// Playbook — 3 steps to creative salience
const { useState: useState_PB, useRef: useRef_PB, useEffect: useEffect_PB } = React;

const STEPS = [
{
  n: '01',
  name: 'Assess',
  points: [
  'Do you have visibility into how your brand shows up across all content?',
  'Are you setting a clear standard for brand cue usage?'],

  color: 'var(--cx-coral)',
  bg: 'var(--cx-rose-100)'
},
{
  n: '02',
  name: 'Act',
  points: [
  'Audit your advertising to identify where brand cues are missing.',
  'Apply a consistent standard across all assets, including creators and GenAI.'],

  color: 'var(--cx-marigold)',
  bg: 'var(--cx-orange-100)'
},
{
  n: '03',
  name: 'Systematize',
  points: [
  'Move from brand books to AI-enabled systems that enforce brand consistency at scale.'],

  color: 'var(--cx-ocean)',
  bg: 'var(--cx-teal-100)'
}];


function Playbook() {
  const gridRef = useRef_PB(null);
  const [fanned, setFanned] = useState_PB(false);

  useEffect_PB(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || window.innerWidth < 980) {setFanned(true);return;}
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {setFanned(true);io.disconnect();}
      });
    }, { threshold: 0.35, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Stacked-and-fanned start state -> spread into the grid on reveal.
  const cardTransform = (i) => {
    if (fanned) return 'translateX(0) translateY(0) rotate(0deg) scale(1)';
    const off = 'calc(100% + 20px)';
    if (i === 0) return `translateX(${off}) translateY(34px) rotate(-8deg) scale(0.92)`;
    if (i === 2) return `translateX(calc(-1 * ${off})) translateY(34px) rotate(8deg) scale(0.92)`;
    return 'translateX(0) translateY(0) rotate(0deg) scale(1)';
  };
  const cardZ = (i) => i === 1 ? 3 : i === 0 ? 2 : 1;
  const cardDelay = (i) => i === 1 ? 0 : 90;

  return (
    <section className="sec sec--sand" id="playbook" style={{ backgroundColor: "rgb(244, 243, 236)", overflowX: "clip" }}>
      <div className="wrap-wide">
        <span className="eyebrow eyebrow--coral" style={{ color: "rgba(0, 60, 79, 0.65)", borderColor: "rgba(0, 60, 79, 0.65)" }}>06 · The playbook</span>
        <h2 className="sec__title" style={{ fontSize: "clamp(34px, 7vw, 62px)", letterSpacing: "-1.4px", maxWidth: "681px", width: "100%", lineHeight: "1" }}>You’re spending millions building someone else’s brand.</h2>
        <p className="sec__lede" style={{ fontFamily: "\"Greed Standard\"", lineHeight: "1.15" }}>Protect your hard-earned brand equity in 3 steps.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 64 }} className="play-grid" ref={gridRef}>
          {STEPS.map((s, idx) => <article key={s.n} style={{
            background: s.bg, borderRadius: 24, padding: 36,
            border: '1px solid var(--cx-line)',
            display: 'flex', flexDirection: 'column', minHeight: 480,
            position: 'relative', overflow: 'hidden', borderWidth: "1px", backgroundColor: "rgb(242, 246, 252)",
            transform: cardTransform(idx), transformOrigin: 'center bottom',
            zIndex: fanned ? 'auto' : cardZ(idx),
            transition: `transform .9s cubic-bezier(.22,.61,.36,1) ${cardDelay(idx)}ms, box-shadow .9s ease ${cardDelay(idx)}ms`,
            boxShadow: fanned ? 'none' : '0 18px 50px rgba(0,60,79,.16)',
            willChange: 'transform'
          }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ ...{ fontFamily: 'var(--cx-font-sans)', fontSize: 80, fontWeight: 500, color: s.color, lineHeight: 0.9, letterSpacing: '-0.04em' }, color: "rgb(0, 60, 79)" }}>{s.n}</span>
                <span style={{ ...{
                  fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em',
                  padding: '6px 12px', borderRadius: 999, background: 'var(--cx-paper)', border: `1px solid ${s.color}`, color: s.color, fontWeight: 500, borderColor: "rgba(0, 60, 79, 0.12)"
                }, color: "rgb(0, 60, 79)", borderColor: "rgb(222, 235, 255)", backgroundColor: "rgb(222, 235, 255)", borderWidth: "0px" }}>{s.name}</span>
              </div>
              <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 24, fontWeight: "400" }}>
                {s.points.map((p, i) =>
              <p key={i} style={{ fontFamily: '"Greed Standard"', lineHeight: 1.12, letterSpacing: '-0.015em', margin: 0, color: 'var(--cx-ocean)', display: 'flex', gap: 12, fontWeight: "400", fontSize: "24px" }}>
                      <span style={{ ...{ color: s.color }, color: "rgb(0, 60, 79)" }}>→</span>
                      <span>{p}</span>
                    </p>
              )}
              </div>
            </article>
          )}
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