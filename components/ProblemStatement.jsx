
// ProblemStatement — the report's thesis, right after the first fold
function ProblemStatement() {
  const spotRef = React.useRef(null);

  // When the header + subheader group's center crosses the viewport center,
  // recolor this section to ocean (#003C4F) and the type to paper (#f4f3ec).
  // The group is pinned over a scroll buffer, so it holds at center and the
  // viewer must scroll a second time to release the spotlight.
  React.useEffect(() => {
    const el = spotRef.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let active = false;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const center = r.top + r.height / 2;
      const near = Math.abs(center - vh / 2) < vh * 0.18;
      if (near !== active) {
        active = near;
        document.body.classList.toggle('spotlight', active && !reduce);
      }
    };
    const onScroll = () => {if (!raf) raf = requestAnimationFrame(update);};
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.body.classList.remove('spotlight');
    };
  }, []);

  // Smooth, eased snap-to-center — same "type" of snap as the horizontal
  // "3 ways your advertising is losing value" section (GSAP ScrollTrigger,
  // power1.inOut, 0.2–0.6s) instead of the abrupt native CSS scroll-snap.
  React.useEffect(() => {
    const el = spotRef.current;
    if (!el || !window.gsap || !window.ScrollTrigger) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Desktop only — on touch / narrow screens the section is auto-height and a
    // forced scroll-snap fights the user's flick, so skip it there.
    if (reduce || window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);
    // Range brackets the spot group crossing viewport center; progress 0.5 is
    // the centered (spotlit) rest position. 0 / 1 let the viewer scroll past.
    // The section is now 100vh, so progress 0.5 is where it perfectly fills the
    // viewport (its end/bottom aligns to the viewport edge) and the viewer sees
    // only this section. 0 / 1 let them scroll in and back out.
    const sec = document.getElementById('problem') || el;
    const st = ScrollTrigger.create({
      trigger: sec,
      start: 'top bottom',
      end: 'bottom top',
      snap: { snapTo: [0, 0.5, 1], duration: { min: 0.2, max: 0.6 }, ease: 'power1.inOut', directional: false }
    });
    return () => st.kill();
  }, []);

  return (
    <section className="sec" id="problem" style={{ background: "rgb(244, 243, 236)", minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 0' }} data-screen-label="The Problem">
      <div className="wrap" style={{ maxWidth: 1040, textAlign: 'center' }}>

        {/* Header + subheader — spotlit while centered, normal otherwise */}
        <div className="cs-spot" ref={spotRef}>
          <span className="eyebrow eyebrow--coral" style={{ color: "rgba(0, 60, 79, 0.65)", borderColor: "rgba(0, 60, 79, 0.65)" }}>The problem</span>
          <h2 className="sec__title" style={{ margin: '24px auto 0', width: '100%', maxWidth: 'none', textAlign: 'center', color: 'var(--cx-ocean)', lineHeight: 0.97, letterSpacing: '-0.03em', fontSize: "clamp(34px, 7vw, 62px)" }}>
            You're spending billions building <span style={{ color: "rgb(0, 60, 79)", fontSize: "clamp(34px, 7vw, 62px)" }}>someone else's brand.</span>
          </h2>
          <p className="sec__lede" style={{ margin: '32px auto 0', maxWidth: '52ch', textAlign: 'center', color: 'var(--cx-fg-deep)', fontFamily: '"Greed Standard"', lineHeight: 1.3 }}>
            Creators, fragmented platforms, and GenAI have broken your control over how your brand shows up.
          </p>
        </div>

        <p className="cs-body" style={{ margin: '28px auto 0', maxWidth: '78ch', textAlign: 'center', fontSize: 18, lineHeight: 1.62, color: 'var(--cx-fg-muted)' }}>
          As a result, a significant portion of your media investment is not being attributed back to your brand. Your ads are seen, but not remembered as yours. Instead, most marketers are donating money to build the category. At the core of this issue is the inconsistent use of <strong style={{ color: 'var(--cx-ocean)', fontWeight: 600 }}>distinctive brand assets</strong> — the cues you've spent years and millions building, from your logo and colors to packshots and taglines.
        </p>

        {/* Creative Salience pill */}
        <div style={{ marginTop: 48, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{ padding: '32px 36px', borderRadius: 20, background: 'var(--cx-ocean)', backgroundColor: "rgb(250, 250, 240)" }}>
            <p style={{ margin: 0, fontStyle: 'normal', lineHeight: 1.25, letterSpacing: '-0.01em', fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 500, textAlign: 'left', color: "rgb(0, 60, 79)" }}>
              <span style={{ fontWeight: 500, color: "rgb(0, 60, 79)" }}>CreativeX's</span> analysis of 1.4M ads reveals the scale of the problem: 61% of ads fail to use sufficient brand cues to reliably encode memory. That means your media spend is not building long-term brand equity. Let's dive into the why.
            </p>
          </div>
        </div>
      </div>
    </section>);

}

window.ProblemStatement = ProblemStatement;