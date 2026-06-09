// Editorial bands — Executive Summary stats + Methodology + Closing
const { useEffect: useEffect_E, useRef: useRef_E, useState: useState_E } = React;

function useCountUp(target, duration = 1400, trigger = true) {
  const [val, setVal] = useState_E(0);
  useEffect_E(() => {
    if (!trigger) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, trigger]);
  return val;
}

function useInView(ref) {
  const [seen, setSeen] = useState_E(false);
  useEffect_E(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {if (e.isIntersecting) {setSeen(true);io.disconnect();}}, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return seen;
}

function Counter({ value, suffix = '', prefix = '', decimals = 0, trigger }) {
  const v = useCountUp(value, 1500, trigger);
  return <span style={{ letterSpacing: "0.7px" }}>{prefix}{v.toFixed(decimals)}{suffix}</span>;
}

function ExecSummary() {
  const ref = useRef_E(null);
  const seen = useInView(ref);

  return (
    <section ref={ref} className="sec" id="findings">
      <div className="wrap-wide">
        <div className="grid-2" style={{ alignItems: 'end', marginBottom: 56, textAlign: "left" }}>
          <div>
            <span className="eyebrow">The headlines</span>
            <h2 className="sec__title" style={{ fontSize: "62px", lineHeight: "0.9" }}>Brand equity is being given away, at scale.</h2>
          </div>
          <p className="sec__lede" style={{ fontFamily: "\"Greed Standard\"", fontWeight: "300", lineHeight: "1.15" }}>
            We analyzed 1.4 million ads — $2Bn of investment across 176 brands and 105+ markets — and found a consistent pattern: the brands winning recall use the same distinctive assets, the same way, on every ad. The rest change their look from ad to ad — and pay for it in lost recognition.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 16 }} className="exec-grid">
          <div className="stat stat--coral" style={{ minHeight: 320 }}>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-paper)', opacity: 0.8 }}>Headline finding</span>
            <div className="stat__num"><Counter value={52} trigger={seen} prefix="$" /><span className="unit" style={{ letterSpacing: "0px", color: "rgb(250, 250, 240)" }}>Bn</span></div>
            <div className="stat__label" style={{ fontSize: 18, maxWidth: '24ch' }}>
              efficiency opportunity across the advertising industry.
            </div>
          </div>
          <div className="stat">
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-fg-muted)' }}>Recall lift</span>
            <div className="stat__num"><Counter value={86} trigger={seen} /><span className="unit" style={{ color: "rgb(0, 60, 79)" }}>%</span></div>
            <div className="stat__label">when logo and packshot appear together vs alone.</div>
          </div>
          <div className="stat stat--ocean">
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-paper)', opacity: 0.7 }}>The gap</span>
            <div className="stat__num"><Counter value={61} trigger={seen} /><span className="unit" style={{ color: "rgb(250, 250, 240)" }}>%</span></div>
            <div className="stat__label">of paid ads lack sufficient cues to be remembered as yours.</div>
          </div>
          <div className="stat">
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-fg-muted)' }}>Average uplift</span>
            <div className="stat__num"><Counter value={28} trigger={seen} prefix="+" /><span className="unit" style={{ color: "rgb(0, 60, 79)" }}>%</span></div>
            <div className="stat__label">in ad recall for ads with 4+ brand cues.</div>
          </div>
          <div className="stat">
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-fg-muted)' }}>Creator gap</span>
            <div className="stat__num"><Counter value={45} trigger={seen} /><span className="unit" style={{ color: "rgb(0, 60, 79)" }}>%</span></div>
            <div className="stat__label">of creator spend on Meta runs unbranded.</div>
          </div>
          <div className="stat" style={{ background: 'var(--cx-marigold)' }}>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-ocean)' }}>Time to recognize</span>
            <div className="stat__num" style={{ color: 'var(--cx-ocean)' }}>
              1–2<span className="unit" style={{ color: "rgb(0, 60, 79)" }}>s</span>
            </div>
            <div className="stat__label" style={{ color: 'var(--cx-ocean)' }}>is all an ad gets to be recognized in-feed before a scroll-past.</div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .exec-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .exec-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>);

}

// The 3 ways equity is lost — a GSAP horizontal-scroll story.
// One pinned section; three full-viewport-width panels slide left as the user
// scrolls. Each panel pairs a pink text block with one of the existing
// interactive components (placed AS-IS — not restyled). Below 768px it falls
// back to a normal vertical stack (no pin, no horizontal scroll).
function ThreeFailures() {
  const hsRef = useRef_E(null);
  const panels = [
  { id: 'gap', num: '1', em: 'Attribution', tail: 'Gap', desc: 'Most brands are missing the signals that drive performance.\n\nEvery additional DBA compounds memorability. Yet 61% of paid ads lack sufficient cues to be reliably remembered, and 37% carry fewer than two cues at all—running spend through impressions consumers can\'t tie back to a brand a day later.', Comp: window.AttributionGap },
  { id: 'multiplier', num: '2', em: 'Multiplier', tail: 'Effect', desc: 'Brands spend years and millions building the signals that make them instantly recognizable—a color, a shape, a sound, a character.\n\nEvery time a consumer meets one, recognition gets faster and more automatic. Show up consistently and the effect compounds like interest, yet most brands leave the majority of that equity on the table.\n\nLet\'s see how these combinations interact in practice. →', Comp: window.Multiplier },
  { id: 'loaned', num: '3', em: 'Loaned', tail: 'Brand', desc: 'Creator content often promotes their personal brand, not yours. \n\nCreator content drives reach, and drops your brand cues. Switch from brand-led to creator-led to see how many of your distinctive brand cues disappear once a creator carries the message. The reach is real, the brand attribution often isn\'t.', Comp: window.LoanedBrand }];

  useEffect_E(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const root = hsRef.current;
    if (!gsap || !ScrollTrigger || !root) return;
    gsap.registerPlugin(ScrollTrigger);

    const panelEls = gsap.utils.toArray(root.querySelectorAll('.hs-panel'));
    const count = panelEls.length;
    const ids = panelEls.map((p) => {const n = p.querySelector('[id]');return n ? n.id : '';});
    let tweenRef = null;
    let panelProg = panelEls.map((_, i) => i / (count - 1)); // scroll-progress of each panel

    // Scale each visual so the (full-size, unaltered) component fits the panel.
    const fit = () => {
      root.querySelectorAll('.hsp-scale').forEach((el) => {
        el.style.transform = 'none';
        const wrap = el.parentElement;
        const nw = el.offsetWidth,nh = el.offsetHeight;
        const aw = wrap.clientWidth,ah = wrap.clientHeight;
        if (!nw || !nh || !aw || !ah) return;
        const sc = Math.min(aw / nw, ah / nh, 1);
        el.style.transform = 'scale(' + sc + ')';
      });
    };

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      fit();
      const vw = window.innerWidth;
      const SPEED = 1.8; // higher = more scroll per panel = slower
      const travel = (count - 1) * vw * SPEED;
      const DWELL = vw * 0.6; // extra pinned scroll AFTER the last panel,
      // so it takes one more scroll to release.
      const total = travel + DWELL;
      const pEnd = travel / total; // progress at which horizontal motion finishes
      // progress of each panel + the released end-state, used for snapping & nav.
      panelProg = panelEls.map((_, i) => pEnd * (i / (count - 1)));
      const snapPoints = panelProg.concat([1]);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          pin: true,
          scrub: 1,
          snap: { snapTo: snapPoints, duration: { min: 0.2, max: 0.6 }, ease: 'power1.inOut', directional: false },
          end: () => '+=' + total,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Emit which panel is centered so each component can hint its toggle.
            let best = 0, bestD = Infinity;
            for (let i = 0; i < panelProg.length; i++) {
              const d = Math.abs(self.progress - panelProg[i]);
              if (d < bestD) { bestD = d; best = i; }
            }
            if (bestD < 0.06 && ids[best] && ids[best] !== window.__hsActivePanel) {
              window.__hsActivePanel = ids[best];
              window.dispatchEvent(new CustomEvent('hs-panel-active', { detail: { id: ids[best] } }));
            }
          }
        }
      });
      tl.to(panelEls, { xPercent: -100 * (count - 1), ease: 'none', duration: travel });
      tl.to({}, { duration: DWELL }); // hold on the last panel before the pin releases
      tweenRef = tl;
      window.__hsTween = tl;
      window.dispatchEvent(new Event('hs-tween-ready'));

      // Gentle reveal as each panel slides in. The fade completes once the panel
      // is roughly half in view (well before it is fully centered) so the last
      // panel reaches full opacity on arrival — not only after the end dwell.
      panelEls.forEach((panel) => {
        const els = panel.querySelectorAll('.hsp-reveal');
        gsap.fromTo(els, { opacity: 0.5, y: 30 }, {
          opacity: 1, y: 0, ease: 'none', stagger: 0.07, immediateRender: false,
          scrollTrigger: { trigger: panel, containerAnimation: tl, start: 'left right', end: 'left center', scrub: true }
        });
      });

      const onResize = () => fit();
      window.addEventListener('resize', onResize);
      ScrollTrigger.addEventListener('refresh', fit);
      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        window.removeEventListener('resize', onResize);
        ScrollTrigger.removeEventListener('refresh', fit);
        tweenRef = null;
        window.__hsTween = null;
        root.querySelectorAll('.hsp-scale').forEach((el) => {el.style.transform = 'none';});
      };
    });

    // Make the sticky-nav anchors (#gap / #multiplier / #loaned) jump to the
    // right panel by translating the horizontal progress into a scroll offset.
    const onNav = (ev) => {
      const a = ev.target.closest && ev.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const idx = ids.indexOf(id);
      if (idx === -1) return;
      if (window.innerWidth < 768 || !tweenRef || !tweenRef.scrollTrigger) return;
      ev.preventDefault();
      const st = tweenRef.scrollTrigger;
      const target = st.start + (st.end - st.start) * (panelProg[idx] || 0);
      window.scrollTo({ top: target, behavior: 'smooth' });
    };
    document.addEventListener('click', onNav);

    return () => {
      document.removeEventListener('click', onNav);
      mm.revert();
    };
  }, []);

  return (
    <React.Fragment>
      <section className="sec--tight" id="failures" style={{ background: 'var(--cx-paper-soft)', borderTop: '1px solid var(--cx-line)', padding: '120px 0px 70px' }}>
        <div className="wrap-wide" style={{ padding: '0px 40px' }}>
          <span className="eyebrow">04 · THE GAPS</span>
          <h2 className="sec__title sec__title--sans" style={{ margin: '24px 0 0', maxWidth: '15ch', lineHeight: 1, fontSize: '62px', fontWeight: '500', letterSpacing: '-0.5px', color: 'rgb(0, 60, 79)' }}>The 3 ways your advertising is losing value:</h2>
          <p style={{ fontFamily: '"Greed Standard"', margin: '28px 0 0', maxWidth: '46ch', lineHeight: 1.3, letterSpacing: '-0.012em', color: 'var(--cx-denim)', fontSize: '21px' }}>Most brands aren’t failing because of budget. Instead, they’re losing value in how their ads are built and deployed. <strong style={{ fontWeight: 600 }}>Scroll to walk through each one.</strong></p>
        </div>
      </section>

      <div className="hs" ref={hsRef}>
        <div className="hs-viewport">
          {panels.map((p, i) =>
          <section className="hs-panel" key={p.id} data-screen-label={"Gap " + p.num}>
            <div className="hsp-inner">
              <div className="hsp-text" style={{ backgroundColor: "rgb(0, 60, 79)" }}>
                <div className="hsp-text-in hsp-reveal" style={{ color: "rgb(255, 255, 255)" }}>
                  <h3 className="hsp-title" style={{ fontWeight: "500", fontSize: "44px", color: "rgb(255, 255, 255)", fontFamily: "\"Greed Standard\"", letterSpacing: "0.1px" }}>{p.num}. The <em>{p.em}</em> {p.tail}</h3>
                  <p className="hsp-desc" style={{ color: "rgb(255, 255, 255)", fontSize: "18px", letterSpacing: "0px", lineHeight: "1.25" }}>{p.desc}</p>
                </div>
              </div>
              <div className="hsp-visual">
                <div className="hsp-vis-in hsp-reveal">
                  <div className="hsp-scale">
                    {p.Comp ? <p.Comp /> : null}
                  </div>
                </div>
              </div>
            </div>
          </section>
          )}
        </div>
      </div>

      <style>{`
        #failures, #gap, #multiplier, #loaned { scroll-margin-top: calc(var(--nav-h, 87px) + 12px); }

        .hs { position: relative; overflow: hidden; background: var(--cx-ocean); }
        .hs-viewport { display: flex; flex-wrap: nowrap; width: max-content; height: 100vh; }
        .hs-panel { flex: 0 0 100vw; width: 100vw; height: 100vh; overflow: hidden; }
        /* figma proportions: text 900 / visual 1400 within each slide; no gaps,
           no padding — blocks butt edge-to-edge so the row reads continuous. */
        .hsp-inner {
          height: 100%; display: grid;
          grid-template-columns: 39% 61%;
          gap: 0; padding: 0;
        }
        .hsp-text {
          background: var(--cx-rose-100); color: var(--cx-rose-800);
          height: 100%; display: flex; flex-direction: column; justify-content: center;
          padding: 30px 30px 30px 40px; overflow: hidden;
        }
        .hsp-title {
          margin: 0; font-family: var(--cx-font-sans); font-weight: 600;
          font-size: clamp(40px, 4.6vw, 88px); line-height: 0.98; letter-spacing: -0.03em;
        }
        .hsp-title em {
          font-family: var(--cx-font-serif); font-style: italic; font-weight: 500;
          letter-spacing: -0.022em;
        }
        .hsp-desc {
          margin: clamp(20px, 2.4vw, 40px) 0 0; font-family: "Greed Standard"; font-weight: 400;
          font-size: clamp(18px, 1.5vw, 30px); line-height: 1.12; letter-spacing: -0.012em;
          max-width: none; white-space: pre-line;
        }
        .hsp-visual {
          background: var(--cx-ocean); height: 100%; min-width: 0; overflow: hidden;
        }
        .hsp-vis-in {
          height: 100%; width: 100%;
          display: flex; align-items: center; justify-content: center;
        }
        .hsp-scale { flex: none; width: 1080px; transform-origin: center center; will-change: transform; }

        /* —— mobile: vertical stack, no pin / no horizontal scroll —— */
        @media (max-width: 767px) {
          .hs { overflow: visible; height: auto; }
          .hs-viewport { display: block; width: 100%; height: auto; }
          .hs-panel { width: 100%; height: auto; overflow: visible; }
          .hsp-inner { display: block; height: auto; padding: 0; }
          .hsp-text { height: auto; padding: 56px 24px; }
          .hsp-visual { display: block; height: auto; overflow: visible; }
          .hsp-vis-in { display: block; height: auto; }
          .hsp-scale { transform: none !important; width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hsp-reveal { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </React.Fragment>);
}

function MethodologyEditorial() {
  return (
    <section className="sec--tight sec--ocean">
      <div className="wrap-wide" style={{ padding: '80px 40px' }}>
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow eyebrow--paper">The data</span>
            <h2 className="sec__title sec__title--sans" style={{ color: 'var(--cx-paper)', margin: '20px 0 0', fontSize: "44px", lineHeight: "0.8", letterSpacing: "-1px" }}>Built on $2B of real-world advertising data.

            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {[
            ['1.4M', 'paid ads analyzed'],
            ['$2B', 'in ad spend analyzed'],
            ['300K+', 'unique brand assets'],
            ['176', 'brands · 105+ markets']].
            map(([n, l]) =>
            <div key={l} style={{ borderTop: '1px solid rgba(255,255,255,.18)', paddingTop: 16 }}>
                <div style={{ fontFamily: 'var(--cx-font-sans)', fontWeight: 500, fontSize: 44, letterSpacing: '-0.03em', color: 'var(--cx-coral)' }}>{n}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,.75)', marginTop: 4 }}>{l}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

function HubSpotForm() {
  const ref = useRef_E(null);
  useEffect_E(() => {
    let cancelled = false;
    const create = () => {
      if (cancelled || !window.hbspt || !ref.current) return;
      ref.current.innerHTML = '';
      window.hbspt.forms.create({
        portalId: "8893894",
        formId: "482c2626-6090-45ce-a772-d5d9317a7814",
        region: "na1",
        target: "#cx-hsform-target"
      });
    };
    if (window.hbspt) {
      create();
    } else {
      let s = document.querySelector('script[data-cx-hubspot]');
      if (!s) {
        s = document.createElement('script');
        s.src = "https://js.hsforms.net/forms/embed/v2.js";
        s.charset = "utf-8";
        s.setAttribute('data-cx-hubspot', '');
        document.body.appendChild(s);
      }
      s.addEventListener('load', create);
    }
    return () => {cancelled = true;};
  }, []);
  return <div className="cx-hsform" id="cx-hsform-target" ref={ref} style={{ marginTop: 28 }}></div>;
}

function Closing() {
  return (
    <section className="sec" id="contact" style={{ background: 'linear-gradient(to bottom, #b3d4ff 0%, #f4f3ed 100%)' }}>
      <div className="wrap-wide">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'start' }} className="closing-grid">
          <div>
            <span className="eyebrow">Bring Creative Salience to your brand</span>
            <h2 className="sec__title" style={{ color: 'var(--cx-ocean)', margin: '20px 0 0', maxWidth: '18ch', fontSize: "62px", lineHeight: "0.9" }}>
              Stop diluting your brand equity. <em style={{ fontSize: "62px" }}>Start compounding it.</em>
            </h2>
            <p className="sec__lede" style={{ color: 'var(--cx-fg-deep)', maxWidth: '48ch', fontFamily: "\"Greed Standard\"", lineHeight: "1.3" }}>
              <strong style={{ color: 'var(--cx-ocean)' }}>Creative Salience</strong> puts your brand to work across the entire creative lifecycle.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '36px 0 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
              ['Know it’s yours before it runs', 'Before media runs, every ad is automatically scored for its creative salience (its optimized use of brand cues), so you know it’s built to be remembered as yours.'],
              ['Media only goes behind the creative that amplifies your brand.', 'And after, you can see exactly what percentage of your portfolio and spend is actively building brand equity, in metrics your CFO understands.']].
              map(([k, v]) =>
              <li key={k} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: 14, alignItems: 'start' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" style={{ marginTop: 4 }}>
                    <circle cx="10" cy="10" r="9" fill="var(--cx-coral)" />
                    <path d="M6 10.5l2.5 2.5L14 7.5" stroke="var(--cx-paper)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 500, color: 'var(--cx-fg-deep)' }}>{k}</div>
                    <div style={{ fontSize: 15, color: 'var(--cx-fg-muted)', marginTop: 2, lineHeight: 1.45 }}>{v}</div>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div style={{ border: '1px solid var(--cx-line)', borderRadius: 24, padding: 36, background: "var(--cx-paper)", boxShadow: 'var(--cx-shadow-card)' }}>
            <div style={{ fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', fontSize: 30, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.1, color: "rgb(0, 60, 79)" }}>Talk to our team.

            </div>
            <p style={{ fontSize: 15, marginTop: 10, lineHeight: 1.5, color: "rgb(0, 60, 79)" }}>A 30-minute call. We'll walk you through a sample DBA audit on your category and show you what Creative Salience would catch.

            </p>
            <HubSpotForm />
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .closing-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }

        /* —— HubSpot form, styled to match the dark closing form —— */
        .cx-hsform .hs-form { display: flex; flex-direction: column; gap: 14px; }
        .cx-hsform fieldset { max-width: none !important; border: 0; margin: 0; padding: 0; }
        .cx-hsform fieldset.form-columns-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .cx-hsform fieldset.form-columns-2 .hs-form-field { width: 100% !important; }
        .cx-hsform fieldset.form-columns-2 .input { margin-right: 0 !important; }
        .cx-hsform .hs-form-field { margin-bottom: 0; }
        .cx-hsform .hs-form-field > label {
          display: block; font-family: var(--cx-font-sans);
          font-size: 12px; font-weight: 500; letter-spacing: 0.04em;
          text-transform: uppercase; color: var(--cx-fg-muted);
          margin-bottom: 7px;
        }
        .cx-hsform .hs-form-field > label .hs-form-required { color: var(--cx-coral); margin-left: 3px; }
        .cx-hsform .hs-field-desc { font-size: 12px; color: var(--cx-fg-muted); margin: 0 0 7px; }
        .cx-hsform .input { margin: 0 !important; }
        .cx-hsform input[type=text],
        .cx-hsform input[type=email],
        .cx-hsform input[type=tel],
        .cx-hsform input[type=number],
        .cx-hsform textarea,
        .cx-hsform select {
          width: 100% !important; box-sizing: border-box;
          padding: 14px 18px; border-radius: 12px;
          border: 1px solid var(--cx-line);
          background: #fff;
          font-size: 15px; font-family: var(--cx-font-sans);
          color: var(--cx-fg-deep); outline: none;
          transition: border-color .2s, background .2s;
        }
        .cx-hsform select { appearance: none; -webkit-appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='rgba(0,60,79,0.55)' stroke-width='1.6' fill='none' stroke-linecap='round'/></svg>");
          background-repeat: no-repeat; background-position: right 18px center;
          padding-right: 42px; cursor: pointer;
        }
        .cx-hsform select option { color: #10384f; }
        .cx-hsform textarea { min-height: 110px; resize: vertical; }
        .cx-hsform input::placeholder, .cx-hsform textarea::placeholder { color: var(--cx-fg-faint); }
        .cx-hsform input:focus,
        .cx-hsform textarea:focus,
        .cx-hsform select:focus {
          border-color: var(--cx-coral);
          background: #fff;
        }
        .cx-hsform .hs-form-checkbox label,
        .cx-hsform .hs-form-booleancheckbox label {
          display: flex; gap: 10px; align-items: flex-start;
          font-size: 13px; color: var(--cx-fg-muted);
          line-height: 1.45; text-transform: none; letter-spacing: 0;
          font-weight: 400; margin: 0;
        }
        .cx-hsform .hs-form-checkbox input,
        .cx-hsform .hs-form-booleancheckbox input { width: auto !important; margin-top: 3px; accent-color: var(--cx-coral); }
        .cx-hsform .legal-consent-container { font-size: 12px; color: var(--cx-fg-muted); line-height: 1.5; }
        .cx-hsform .legal-consent-container a { color: var(--cx-coral); text-decoration: underline; }
        .cx-hsform .hs-error-msg, .cx-hsform .hs-error-msgs label {
          color: #C60E24; font-size: 12px; font-weight: 400;
          text-transform: none; letter-spacing: 0; margin-top: 6px;
        }
        .cx-hsform .hs-error-msgs { list-style: none; padding: 0; margin: 6px 0 0; }
        .cx-hsform .hs-submit { margin-top: 6px; }
        .cx-hsform .hs-button {
          display: inline-flex; align-items: center; justify-content: center;
          width: 100%; box-sizing: border-box;
          padding: 15px 25px; border-radius: 10px; border: 0;
          background: var(--cx-coral); color: var(--cx-paper);
          font: 500 14px/1 var(--cx-font-sans); letter-spacing: 0.1px; cursor: pointer;
          transition: transform .2s, background .2s;
        }
        .cx-hsform .hs-button:hover { transform: translateY(-2px); background: color-mix(in oklab, var(--cx-coral) 90%, #000); }
        .cx-hsform .submitted-message {
          font-family: var(--cx-font-serif); font-style: italic;
          font-size: 20px; color: var(--cx-ocean); line-height: 1.4;
        }
      `}</style>
    </section>);

}

window.ExecSummary = ExecSummary;
window.ThreeFailures = ThreeFailures;
window.MethodologyEditorial = MethodologyEditorial;
window.Closing = Closing;