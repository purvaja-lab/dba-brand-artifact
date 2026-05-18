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
  return <span>{prefix}{v.toFixed(decimals)}{suffix}</span>;
}

function ExecSummary() {
  const ref = useRef_E(null);
  const seen = useInView(ref);

  return (
    <section ref={ref} className="sec" id="findings">
      <div className="wrap-wide">
        <div className="grid-2" style={{ alignItems: 'end', marginBottom: 56 }}>
          <div>
            <span className="eyebrow">The headlines</span>
            <h2 className="sec__title">Brand equity is being given away — quietly, at scale.</h2>
          </div>
          <p className="sec__lede">
            We analyzed the largest existing corpus of paid creative ever assembled — 1.4 million ads, $2.0Bn of investment, 38 markets — and found a consistent pattern: the brands winning recall are doing the same boring thing on every asset. The rest are not.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 16 }} className="exec-grid">
          <div className="stat stat--coral" style={{ minHeight: 320 }}>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-paper)', opacity: 0.8 }}>Headline finding</span>
            <div className="stat__num"><Counter value={52} trigger={seen} /><span className="unit">Bn</span></div>
            <div className="stat__label" style={{ fontSize: 18, maxWidth: '24ch' }}>
              of global brand spend at risk of failing to build brand equity.
            </div>
          </div>
          <div className="stat">
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-fg-muted)' }}>Recall lift</span>
            <div className="stat__num"><Counter value={86} trigger={seen} /><span className="unit">%</span></div>
            <div className="stat__label">when logo and packshot appear together vs alone.</div>
          </div>
          <div className="stat stat--ocean">
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-paper)', opacity: 0.7 }}>The gap</span>
            <div className="stat__num"><Counter value={61} trigger={seen} /><span className="unit">%</span></div>
            <div className="stat__label">of paid ads fail to use 2+ brand cues.</div>
          </div>
          <div className="stat">
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-fg-muted)' }}>Average uplift</span>
            <div className="stat__num"><Counter value={28} trigger={seen} prefix="+" /><span className="unit">%</span></div>
            <div className="stat__label">in ad recall for ads with 3+ DBAs.</div>
          </div>
          <div className="stat">
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-fg-muted)' }}>Creator gap</span>
            <div className="stat__num"><Counter value={45} trigger={seen} /><span className="unit">%</span></div>
            <div className="stat__label">of creator spend runs without recognizable brand cues.</div>
          </div>
          <div className="stat" style={{ background: 'var(--cx-marigold)' }}>
            <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--cx-ocean)' }}>Time to recognize</span>
            <div className="stat__num" style={{ color: 'var(--cx-ocean)' }}>
              <Counter value={1.7} trigger={seen} decimals={1} /><span className="unit" style={{ color: 'var(--cx-paper)' }}>s</span>
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
          <h2 className="sec__title sec__title--sans" style={{ margin: 0 }}>Three ways brands are losing equity in 2026.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {items.map((it, i) =>
            <div key={it.n} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 16, padding: '28px 0', borderTop: i === 0 ? 'none' : '1px solid var(--cx-line)' }}>
                <span style={{ fontFamily: 'var(--cx-font-sans)', fontVariantNumeric: 'tabular-nums', fontSize: 32, fontWeight: 500, color: 'var(--cx-coral)', letterSpacing: '-0.02em' }}>{it.n}</span>
                <div>
                  <div style={{ fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', fontSize: 26, fontWeight: 500, color: 'var(--cx-ocean)' }}>{it.name}</div>
                  <p style={{ fontSize: 16, color: 'var(--cx-fg-muted)', lineHeight: 1.5, margin: '6px 0 0', maxWidth: '52ch' }}>{it.body}</p>
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
            <h2 className="sec__title sec__title--sans" style={{ color: 'var(--cx-paper)', margin: '20px 0 0' }}>
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

function Closing() {
  return (
    <section className="sec" id="contact" style={{ background: 'var(--cx-ocean)', color: 'var(--cx-paper)' }}>
      <div className="wrap-wide">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'start' }} className="closing-grid">
          <div>
            <span className="eyebrow eyebrow--paper">Bring Creative Salience to your brand</span>
            <h2 className="sec__title" style={{ color: 'var(--cx-paper)', margin: '20px 0 0', maxWidth: '18ch' }}>
              Stop guessing whether your brand is showing up. <em>Measure it.</em>
            </h2>
            <p className="sec__lede" style={{ color: 'rgba(255,255,255,.78)', maxWidth: '48ch', fontFamily: "\"Greed Standard\"" }}>
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
          <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 24, padding: 36 }}>
            <div style={{ fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', fontSize: 30, fontWeight: 500, color: 'var(--cx-paper)', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
              Talk to a brand strategist.
            </div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,.72)', marginTop: 10, lineHeight: 1.5 }}>
              A 30-minute call. We'll walk you through a sample DBA audit on your category and show you what Creative Salience would catch on Monday morning.
            </p>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}
            onSubmit={(e) => {e.preventDefault();alert('Thanks — our team will be in touch within 1 business day.');}}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <input required placeholder="First name" style={inputStyle} />
                <input required placeholder="Last name" style={inputStyle} />
              </div>
              <input required type="email" placeholder="Work email" style={inputStyle} />
              <input required placeholder="Company" style={inputStyle} />
              <select required style={{ ...inputStyle, appearance: 'none' }}>
                <option value="">Annual media spend</option>
                <option>$10M – $50M</option>
                <option>$50M – $250M</option>
                <option>$250M – $1Bn</option>
                <option>$1Bn+</option>
              </select>
              <button type="submit" className="btn btn--primary" style={{ padding: '16px 26px', justifyContent: 'center', marginTop: 6, background: 'var(--cx-coral)' }}>
                Book my walkthrough →
              </button>
            </form>
            <div style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,.5)', textAlign: 'center' }}>
              Trusted by 90+ of the world's top brand advertisers.
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .closing-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>);

}

const inputStyle = {
  padding: '14px 18px', borderRadius: 12,
  border: '1px solid rgba(255,255,255,.18)',
  background: 'rgba(255,255,255,.04)',
  fontSize: 15, fontFamily: 'inherit',
  color: 'var(--cx-paper)',
  outline: 'none'
};

window.ExecSummary = ExecSummary;
window.ThreeFailures = ThreeFailures;
window.MethodologyEditorial = MethodologyEditorial;
window.Closing = Closing;