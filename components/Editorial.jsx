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
            <h2 className="sec__title" style={{ fontSize: "62px", lineHeight: "0.9" }}>Brand equity is being given away — quietly, at scale.</h2>
          </div>
          <p className="sec__lede" style={{ fontFamily: "\"Greed Standard\"", fontWeight: "300", lineHeight: "1" }}>
            We analyzed the largest existing corpus of paid creative ever assembled — 1.4 million ads, $2.0Bn of investment, 38 markets — and found a consistent pattern: the brands winning recall are doing the same boring thing on every asset. The rest are not.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 16 }} className="exec-grid">
          <div className="stat stat--coral" style={{ minHeight: 320 }}>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-paper)', opacity: 0.8 }}>Headline finding</span>
            <div className="stat__num"><Counter value={52} trigger={seen} /><span className="unit" style={{ letterSpacing: "0px", color: "rgb(250, 250, 240)" }}>Bn</span></div>
            <div className="stat__label" style={{ fontSize: 18, maxWidth: '24ch' }}>
              of global brand spend at risk of failing to build brand equity.
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
            <div className="stat__label">of paid ads fail to use 2+ brand cues.</div>
          </div>
          <div className="stat">
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-fg-muted)' }}>Average uplift</span>
            <div className="stat__num"><Counter value={28} trigger={seen} prefix="+" /><span className="unit" style={{ color: "rgb(0, 60, 79)" }}>%</span></div>
            <div className="stat__label">in ad recall for ads with 3+ DBAs.</div>
          </div>
          <div className="stat">
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-fg-muted)' }}>Creator gap</span>
            <div className="stat__num"><Counter value={45} trigger={seen} /><span className="unit" style={{ color: "rgb(0, 60, 79)" }}>%</span></div>
            <div className="stat__label">of creator spend runs without recognizable brand cues.</div>
          </div>
          <div className="stat" style={{ background: 'var(--cx-marigold)' }}>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-ocean)' }}>Time to recognize</span>
            <div className="stat__num" style={{ color: 'var(--cx-ocean)' }}>
              <Counter value={1.7} trigger={seen} decimals={1} /><span className="unit" style={{ color: "rgb(0, 60, 79)" }}>s</span>
            </div>
            <div className="stat__label" style={{ color: 'var(--cx-ocean)' }}>average dwell time before a scroll past on mobile feed.</div>
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

// Methodology + the 3 ways equity is lost
function ThreeFailures() {
  const items = [
  { n: '01', name: 'The Attribution Gap', body: 'Ads run, impressions deliver — but consumers can\'t tie what they saw back to your brand. Cue density is too low to register.' },
  { n: '02', name: 'The Multiplier Effect (missed)', body: 'Cues are deployed in isolation. The 86% lift from pairing logo with packshot, or color with sonic, never compounds.' },
  { n: '03', name: 'The Loaned Brand', body: 'You pay for the reach, the creator carries the equity. 45% of creator spend leaves no brand fingerprint at all.' }];

  return (
    <section className="sec--tight" style={{ background: 'var(--cx-paper)', borderTop: '1px solid var(--cx-line)', borderBottom: '1px solid var(--cx-line)' }}>
      <div className="wrap-wide" style={{ padding: '72px 40px' }}>
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <h2 className="sec__title sec__title--sans" style={{ margin: 0, fontSize: "54px" }}>Three ways brands are losing equity in 2026.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {items.map((it, i) =>
            <div key={it.n} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 16, padding: '28px 0', borderTop: i === 0 ? 'none' : '1px solid var(--cx-line)' }}>
                <span style={{ fontFamily: 'var(--cx-font-sans)', fontVariantNumeric: 'tabular-nums', fontSize: 32, fontWeight: 500, color: 'var(--cx-coral)', letterSpacing: '-0.02em' }}>{it.n}</span>
                <div>
                  <div style={{ fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', fontSize: 26, fontWeight: 500, color: 'var(--cx-ocean)' }}>{it.name}</div>
                  <p style={{ fontSize: 16, color: 'var(--cx-fg-muted)', margin: '6px 0 0', maxWidth: '52ch', lineHeight: "1.3" }}>{it.body}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

function MethodologyEditorial() {
  return (
    <section className="sec--tight sec--ocean">
      <div className="wrap-wide" style={{ padding: '80px 40px' }}>
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow eyebrow--paper">The data</span>
            <h2 className="sec__title sec__title--sans" style={{ color: 'var(--cx-paper)', margin: '20px 0 0', fontSize: "44px", lineHeight: "0.8", letterSpacing: "-1px" }}>
              The largest brand-creative study ever published.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {[
            ['1.4M', 'paid ads scored'],
            ['$2.0Bn', 'media spend tracked'],
            ['300K+', 'unique brand assets tagged'],
            ['38', 'markets, 22 languages']].
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
        formId: "5202e4bc-e16c-4506-a42b-e715c6dc2733",
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
    <section className="sec" id="contact" style={{ background: 'var(--cx-ocean)', color: 'var(--cx-paper)' }}>
      <div className="wrap-wide">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'start' }} className="closing-grid">
          <div>
            <span className="eyebrow eyebrow--paper">Bring Creative Salience to your brand</span>
            <h2 className="sec__title" style={{ color: 'var(--cx-paper)', margin: '20px 0 0', maxWidth: '18ch', fontSize: "62px", lineHeight: "0.9" }}>
              Stop guessing whether your brand is showing up. <em style={{ fontSize: "62px" }}>Measure it.</em>
            </h2>
            <p className="sec__lede" style={{ color: 'rgba(255,255,255,.78)', maxWidth: '48ch', fontFamily: "\"Greed Standard\"", lineHeight: "1.3" }}>
              <strong style={{ color: 'var(--cx-paper)' }}>Creative Salience</strong> by CreativeX is the platform the world's largest advertisers use to audit, score, and enforce brand cues on every piece of creative — before a dollar of media ships.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '36px 0 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
              ['Automated DBA scoring', 'Every asset graded against your brand bar in seconds, not weeks.'],
              ['Pre-flight enforcement', 'Off-brand assets caught before they enter the media buy.'],
              ['Cross-platform benchmarks', 'See exactly how your brand cue density compares to category peers.'],
              ['Creator brief integration', 'Embed your non-negotiables into every paid-creator contract.']].
              map(([k, v]) =>
              <li key={k} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: 14, alignItems: 'start' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" style={{ marginTop: 4 }}>
                    <circle cx="10" cy="10" r="9" fill="var(--cx-coral)" />
                    <path d="M6 10.5l2.5 2.5L14 7.5" stroke="var(--cx-paper)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 500, color: 'var(--cx-paper)' }}>{k}</div>
                    <div style={{ fontSize: 15, color: 'rgba(255,255,255,.7)', marginTop: 2, lineHeight: 1.45 }}>{v}</div>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div style={{ border: '1px solid rgba(255,255,255,.14)', borderRadius: 24, padding: 36, background: "rgb(244, 243, 236)" }}>
            <div style={{ fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', fontSize: 30, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.1, color: "rgb(0, 60, 79)" }}>
              Talk to a brand strategist.
            </div>
            <p style={{ fontSize: 15, marginTop: 10, lineHeight: 1.5, color: "rgb(0, 60, 79)" }}>
              A 30-minute call. We'll walk you through a sample DBA audit on your category and show you what Creative Salience would catch on Monday morning.
            </p>
            <HubSpotForm />
            <div style={{ marginTop: 16, fontSize: 12, textAlign: 'center', color: "rgb(0, 60, 79)" }}>
              Trusted by 90+ of the world's top brand advertisers.
            </div>
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
          text-transform: uppercase; color: rgba(255,255,255,.62);
          margin-bottom: 7px;
        }
        .cx-hsform .hs-form-field > label .hs-form-required { color: var(--cx-coral); margin-left: 3px; }
        .cx-hsform .hs-field-desc { font-size: 12px; color: rgba(255,255,255,.5); margin: 0 0 7px; }
        .cx-hsform .input { margin: 0 !important; }
        .cx-hsform input[type=text],
        .cx-hsform input[type=email],
        .cx-hsform input[type=tel],
        .cx-hsform input[type=number],
        .cx-hsform textarea,
        .cx-hsform select {
          width: 100% !important; box-sizing: border-box;
          padding: 14px 18px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,.18);
          background: rgba(255,255,255,.04);
          font-size: 15px; font-family: var(--cx-font-sans);
          color: var(--cx-paper); outline: none;
          transition: border-color .2s, background .2s;
        }
        .cx-hsform select { appearance: none; -webkit-appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.55)' stroke-width='1.6' fill='none' stroke-linecap='round'/></svg>");
          background-repeat: no-repeat; background-position: right 18px center;
          padding-right: 42px; cursor: pointer;
        }
        .cx-hsform select option { color: #10384f; }
        .cx-hsform textarea { min-height: 110px; resize: vertical; }
        .cx-hsform input::placeholder, .cx-hsform textarea::placeholder { color: rgba(255,255,255,.45); }
        .cx-hsform input:focus,
        .cx-hsform textarea:focus,
        .cx-hsform select:focus {
          border-color: var(--cx-coral);
          background: rgba(255,255,255,.07);
        }
        .cx-hsform .hs-form-checkbox label,
        .cx-hsform .hs-form-booleancheckbox label {
          display: flex; gap: 10px; align-items: flex-start;
          font-size: 13px; color: rgba(255,255,255,.72);
          line-height: 1.45; text-transform: none; letter-spacing: 0;
          font-weight: 400; margin: 0;
        }
        .cx-hsform .hs-form-checkbox input,
        .cx-hsform .hs-form-booleancheckbox input { width: auto !important; margin-top: 3px; accent-color: var(--cx-coral); }
        .cx-hsform .legal-consent-container { font-size: 12px; color: rgba(255,255,255,.55); line-height: 1.5; }
        .cx-hsform .legal-consent-container a { color: var(--cx-coral); text-decoration: underline; }
        .cx-hsform .hs-error-msg, .cx-hsform .hs-error-msgs label {
          color: #ffb3bc; font-size: 12px; font-weight: 400;
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
          font-size: 20px; color: var(--cx-paper); line-height: 1.4;
        }
      `}</style>
    </section>);

}

window.ExecSummary = ExecSummary;
window.ThreeFailures = ThreeFailures;
window.MethodologyEditorial = MethodologyEditorial;
window.Closing = Closing;