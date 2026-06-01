// Case studies — Cadbury (Mondelez) & Bayer, from the actual report
const CASES = [
{
  brand: 'Cadbury',
  parent: 'Mondelēz',
  color: '#4A2C7A',
  accent: '#FFB400',
  eyebrow: 'Consistent brand asset usage drives measurable growth',
  title: 'A glass-and-a-half, every single time.',
  body: 'The “Glass and a Half” visual has anchored Cadbury marketing since 1928 — one of the brand\'s most iconic DBAs. When it shows up in an ad, performance compounds across the funnel, from awareness through purchase intent.',
  quote: 'We’ve been gifted iconic assets. Our job is to ensure they maintain that status and build our brands. CreativeX are a key partner for us in making this happen.',
  quoteName: 'Tim Milwood',
  quoteTitle: 'Global Insight Leader, Mondelēz',
  shape: 'assets/shapes/integration-light-blue.svg',
  headlineMetric: { value: '+11pp', label: 'purchase intent', sub: 'when the Glass-and-a-Half DBA is present' },
  metrics: [
  { v: '+6pp', l: 'Awareness' },
  { v: '+3pp', l: 'Recall' },
  { v: '+3pp', l: 'Consideration' },
  { v: '+11pp', l: 'Purchase intent' },
  { v: '+30%', l: 'Completed video views' }]

},
{
  brand: 'Bayer',
  parent: '160 years of heritage, digitized',
  color: '#10384F',
  accent: '#7BB342',
  eyebrow: 'What happens when you turn brand consistency into a system?',
  title: 'From PDF guidelines to a system of control.',
  body: 'For over a century Bayer\'s brand equity has been a proxy for trust. By codifying 160 years of heritage into digital Brand Codes, Bayer bridged the gap between rapid production and rigorous standards — moving from static PDF guidance to a real-time, agentic system. Every asset is built to succeed and to be remembered as theirs, no matter who made it.',
  quote: 'CreativeX gives us visibility into how our brand’s distinctive assets are actually appearing in each of our creative assets — helping ensure every media investment supports creative that strengthens brand recall, as well as performance.',
  quoteName: 'Celine Baudin',
  quoteTitle: 'Global Head of Content and Integrated Communications, Bayer',
  shape: 'assets/shapes/layers-light-green.svg',
  headlineMetric: { value: '+86.4%', label: 'lift in favorability', sub: 'driven by consistent brand-color usage' },
  metricsGroups: [
  {
    cue: 'Logo usage',
    items: [
    { v: '+12.1%', l: 'Lift in CVV' },
    { v: '−7.9%', l: 'Reduction in CPCV' }]

  },
  {
    cue: 'Brand color',
    items: [
    { v: '+6.2%', l: 'Lift in CVV' },
    { v: '−4.5%', l: 'Decrease in CPCV' },
    { v: '+86.4%', l: 'Lift in favorability' },
    { v: '+24.3%', l: 'Lift in consideration' },
    { v: '+7.5%', l: 'Lift in recall' }]

  }]

}];


function MetricChip({ v, l, color, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)' }}>
      <span style={{ fontFamily: 'var(--cx-font-sans)', fontWeight: 500, fontSize: 26, letterSpacing: '-0.02em', color: accent, lineHeight: 1 }}>{v}</span>
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', letterSpacing: '0.01em' }}>{l}</span>
    </div>);

}

function CaseStudies() {
  return (
    <section className="sec" id="cases">
      <div className="wrap-wide">
        <span className="eyebrow">05 · In practice</span>
        <h2 className="sec__title" style={{ fontSize: "62px", lineHeight: "0.8", letterSpacing: "-1.5px" }}>Two brands operationalized salience.</h2>
        <p className="sec__lede" style={{ fontFamily: "\"Greed Standard\"", lineHeight: "1.3" }}>From a 1928 visual mnemonic to 160 years of heritage codified into Brand Codes — both teams turned cue consistency into a measurable performance lever.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 80, marginTop: 64 }}>
          {CASES.map((c, i) =>
          <div key={c.brand} style={{ display: 'flex', flexDirection: 'column' }}>
            <article style={{
              display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 0,
              background: 'var(--cx-paper)', border: '1px solid var(--cx-line)',
              borderRadius: 28, overflow: 'hidden'
            }} className="case-card">
              <div style={{ padding: '48px 48px 40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', fontSize: 28, color: c.color, fontWeight: 500 }}>{c.brand}</div>
                    <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--cx-fg-muted)', marginTop: 4 }}>{c.parent}</div>
                  </div>
                  <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--cx-fg-muted)' }}>Case study 0{i + 1}</span>
                </div>
                <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: c.color, marginBottom: 8, fontWeight: 500 }}>{c.eyebrow}</div>
                <h3 style={{ fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', fontSize: 40, fontWeight: 500, lineHeight: 1.06, letterSpacing: '-0.02em', margin: '0 0 18px', color: 'var(--cx-ocean)' }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--cx-fg-deep)', margin: 0, maxWidth: '52ch' }}>{c.body}</p>
              </div>
              <div style={{ background: c.color, color: '#fff', padding: '48px 40px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                <img src={c.shape} alt="" style={{ position: 'absolute', right: -40, bottom: -40, width: 320, opacity: 0.18 }} />
                <div style={{ position: 'relative', flex: 1 }}>
                  <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.65 }}>Headline impact</div>
                  <div style={{ fontFamily: 'var(--cx-font-sans)', fontSize: 88, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.04em', marginTop: 10, color: c.accent }}>
                    {c.headlineMetric.value}
                  </div>
                  <div style={{ fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', fontSize: 22, marginTop: 10, color: '#fff' }}>
                    {c.headlineMetric.label}
                  </div>
                  <div style={{ fontSize: 13, marginTop: 6, opacity: 0.75 }}>{c.headlineMetric.sub}</div>

                  {c.metrics &&
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 28 }}>
                      {c.metrics.map((m, j) => <MetricChip key={j} {...m} color={c.color} accent={c.accent} />)}
                    </div>
                  }
                  {c.metricsGroups &&
                  <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
                      {c.metricsGroups.map((g, j) =>
                    <div key={j}>
                          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.65, marginBottom: 8 }}>{g.cue}</div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                            {g.items.map((m, k) => <MetricChip key={k} {...m} color={c.color} accent={c.accent} />)}
                          </div>
                        </div>
                    )}
                    </div>
                  }
                </div>
                <div style={{ position: 'relative', marginTop: 24, fontSize: 12, opacity: 0.6, borderTop: '1px solid rgba(255,255,255,.18)', paddingTop: 14 }}>
                  Source: CreativeX brand-asset performance analysis · {c.brand}
                </div>
              </div>
            </article>
            {c.quote &&
            <figure className="case-pullquote" style={{ margin: '36px auto 0', maxWidth: 760, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: "40px 8px 20px", width: "1000px" }}>
                <span aria-hidden="true" style={{ fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', fontWeight: 500, fontSize: 120, lineHeight: 0.7, color: c.accent, letterSpacing: '-0.04em', marginBottom: 8 }}>
</span>
                <p style={{ margin: 0, fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.35, letterSpacing: '-0.005em', color: 'var(--cx-fg-deep)', maxWidth: '46ch', textWrap: 'pretty', fontSize: "clamp(22px, 4vw, 40px)", padding: "0px", width: "100%" }}>
                  {c.quote}
                </p>
                <figcaption style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap', padding: "0px" }}>
                  <span style={{ width: 32, height: 1, background: c.color, display: 'inline-block' }}></span>
                  <span style={{ fontFamily: 'var(--cx-font-sans)', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: c.color }}>{c.quoteName}</span>
                  <span style={{ fontFamily: 'var(--cx-font-sans)', fontSize: 13, color: 'var(--cx-fg-muted)', letterSpacing: '0.01em' }}>{c.quoteTitle}</span>
                </figcaption>
              </figure>}
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .case-card { grid-template-columns: 1fr !important; }
          .case-pullquote > span:first-child { font-size: 96px !important; }
        }
        @media (max-width: 600px) {
          .case-pullquote figcaption { gap: 8px !important; }
        }
      `}</style>
    </section>);

}

window.CaseStudies = CaseStudies;