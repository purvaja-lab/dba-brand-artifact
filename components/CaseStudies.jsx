// Case studies — Cadbury (Mondelēz) & Bayer, from the actual report.
// Redesigned from the attached Figma: soft blue-gradient cards, a frosted-glass
// info panel on the left, and a divider-ruled metric list on the right.
const CASES = [
{
  brand: 'Mondelēz',
  anchor: 'case-mondelez',
  logo: window.__resources.mondelezLogo,
  lead: 'Consistent brand asset usage drives measurable growth.',
  body: 'The “Glass and a Half” visual has anchored Cadbury marketing since 1928 — one of the brand’s most iconic DBAs. When it shows up in an ad, performance compounds across the funnel, from awareness through purchase intent.',
  quote: 'We’ve been gifted iconic assets. Our job is to ensure they maintain that status and build our brands. CreativeX are a key partner for us in making this happen.',
  quoteName: 'Tim Milwood',
  quoteTitle: 'Global Insight Leader, Mondelēz',
  metrics: [
  { l: 'Purchase intent', v: '+11pp' },
  { l: 'Awareness', v: '+6pp' },
  { l: 'Recall', v: '+3pp' },
  { l: 'Consideration', v: '+3pp' },
  { l: 'Completed video views', v: '+30%' }]

},
{
  brand: 'Bayer',
  anchor: 'case-bayer',
  logo: window.__resources.bayerCaseLogo,
  lead: 'What happens when you turn brand consistency into a system?',
  body: 'For over a century Bayer’s brand equity has been a proxy for trust. By codifying 160 years of heritage into digital Brand Codes, Bayer moved from static PDF guidance to a real-time, agentic system of control — every asset built to succeed and be remembered as theirs, no matter who made it.',
  quote: 'CreativeX gives us visibility into how our brand’s distinctive assets are actually appearing in each of our creative assets — helping ensure every media investment supports creative that strengthens brand recall, as well as performance.',
  quoteName: 'Celine Baudin',
  quoteTitle: 'Global Head of Content & Integrated Communications, Bayer',
  groups: [
  {
    cue: 'Logo usage',
    items: [
    { l: 'Lift in CVV', v: '+12.1%' },
    { l: 'Reduction in CPCV', v: '−7.9%' }]

  },
  {
    cue: 'Brand color',
    items: [
    { l: 'Lift in CVV', v: '+6.2%' },
    { l: 'Decrease in CPCV', v: '−4.5%' },
    { l: 'Lift in favorability', v: '+86.4%' },
    { l: 'Lift in consideration', v: '+24.3%' },
    { l: 'Lift in recall', v: '+7.5%' }]

  }]

}];


function MetricRow({ l, v }) {
  return (
    <div className="cs-row">
      <span className="cs-row-label">{l}</span>
      <span className="cs-row-value">{v}</span>
    </div>);

}

function CaseStudies() {
  return (
    <section className="sec" id="cases">
      <div className="wrap-wide">
        <span className="eyebrow">IN PRACTICE</span>
        <h2 className="sec__title" style={{ fontSize: "62px", lineHeight: "0.8", letterSpacing: "-1.5px" }}>Building a brand system</h2>
        <p className="sec__lede" style={{ fontFamily: "\"Greed Standard\"", lineHeight: "1.15" }}>Here's how industry leaders are operationalizing at scale.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 72, marginTop: 64 }}>
          {CASES.map((c, i) =>
          <div key={c.brand} id={c.anchor} style={{ scrollMarginTop: 100 }}>
              <article className="case-card cs-card">
                <div className="cs-top">
                  {/* Left: frosted-glass info panel */}
                  <div className="cs-panel">
                    <div className="cs-logo">
                      <img src={c.logo} alt={`${c.brand} logo`} />
                    </div>
                    <div className="cs-tag">Case study 0{i + 1}</div>
                    <h3 className="cs-lead" style={{ color: "rgb(3, 21, 49)" }}>
                      <span className="cs-lead-brand" style={{ color: "rgb(3, 21, 49)" }}>{c.brand}:</span> {c.lead}
                    </h3>
                    <p className="cs-body">{c.body}</p>
                  </div>

                  {/* Right: metric list */}
                  <div className="cs-metrics">
                    {c.metrics &&
                  <div className="cs-group">
                        {c.metrics.map((m, j) => <MetricRow key={j} {...m} />)}
                      </div>
                  }
                    {c.groups &&
                  c.groups.map((g, j) =>
                  <div className="cs-group" key={j}>
                          <div className="cs-group-label">{g.cue}</div>
                          {g.items.map((m, k) => <MetricRow key={k} {...m} />)}
                        </div>
                  )
                  }
                  </div>
                </div>

                {/* Quote — now brought inside the card, below a full-width divider */}
                {c.quote &&
              <figure className="cs-quote">
                    <span aria-hidden="true" className="cs-quote-divider" style={{ color: "rgb(0, 101, 255)", backgroundColor: "rgb(0, 101, 255)" }}></span>
                    <p className="cs-quote-text" style={{ width: "75%", maxWidth: "75%", fontSize: "36px", color: "rgb(0, 60, 79)" }}>
                      <span aria-hidden="true" className="cs-quote-mark" style={{ color: "rgb(3, 21, 49)" }}>“</span>{c.quote}”
                    </p>
                    <figcaption className="cs-quote-cap" style={{ color: "rgb(3, 21, 49)" }}>
                      <span className="cs-quote-name" style={{ fontSize: "24px", color: "rgb(0, 60, 79)" }}>{c.quoteName}</span>
                      <span className="cs-quote-title" style={{ color: "rgb(0, 60, 79)" }}>{c.quoteTitle}</span>
                    </figcaption>
                  </figure>
              }
              </article>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .cs-card {
          display: flex; flex-direction: column;
          padding: 52px;
          border-radius: 24px; overflow: hidden;
          background: linear-gradient(180deg, #B5D5FF 0%, #F4F3EC 100%);
        }
        .cs-top {
          display: grid; grid-template-columns: 0.95fr 1fr; gap: 64px;
          align-items: stretch;
        }
        .cs-panel {
          background: rgba(255,255,255,0.5);
          backdrop-filter: blur(44px); -webkit-backdrop-filter: blur(44px);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 20px; padding: 36px;
          display: flex; flex-direction: column;
        }
        .cs-logo {
          width: 64px; height: 64px; border-radius: 8px;
          background: var(--cx-paper); border: 1px solid rgba(0,60,79,.08);
          display: flex; align-items: center; justify-content: center;
          padding: 9px; box-shadow: var(--cx-shadow-soft);
        }
        .cs-logo img { width: 100%; height: 100%; object-fit: contain; }
        .cs-tag {
          margin-top: 28px; font-family: var(--cx-font-sans); font-weight: 500;
          font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--cx-blue-600);
        }
        .cs-lead {
          margin: 10px 0 0; font-family: var(--cx-font-sans); font-weight: 500;
          font-size: 30px; line-height: 1.05; letter-spacing: -0.01em;
          color: var(--cx-ocean); text-wrap: pretty;
        }
        .cs-lead-brand { color: var(--cx-ocean); }
        .cs-body {
          margin: 22px 0 0; font-family: "Greed Standard"; font-weight: 400;
          font-size: 16px; line-height: 1.45; color: var(--cx-ocean);
          max-width: 42ch;
        }
        .cs-metrics {
          display: flex; flex-direction: column; gap: 28px;
          justify-content: center; padding: 4px 8px 4px 0;
        }
        .cs-group { display: flex; flex-direction: column; }
        .cs-group-label {
          font-family: var(--cx-font-sans); font-weight: 500;
          font-size: 13px; letter-spacing: 0.05em; text-transform: uppercase;
          color: var(--cx-blue-600); margin-bottom: 6px;
        }
        .cs-row {
          display: flex; align-items: baseline; justify-content: space-between;
          gap: 20px; padding: 10px 0 8px;
          border-bottom: 1px solid var(--cx-blue-600);
        }
        .cs-row-label {
          font-family: "Greed Standard"; font-weight: 400;
          font-size: 19px; letter-spacing: 0.01em; color: var(--cx-blue-800);
        }
        .cs-row-value {
          font-family: var(--cx-font-sans); font-weight: 400;
          font-size: clamp(34px, 3vw, 45px); line-height: 1.1;
          letter-spacing: -0.005em; color: var(--cx-blue-700);
          white-space: nowrap;
        }

        /* Pull quote — now nested inside the card, cream on the blue lower gradient */
        .cs-quote {
          margin: 56px 0 0;
          display: flex; flex-direction: column; align-items: center; text-align: center;
        }
        .cs-quote-divider {
          width: 100%; height: 1px; background: rgba(3,21,49,0.45);
          margin-bottom: 48px;
        }
        .cs-quote-mark {
          font-family: var(--cx-font-serif); font-weight: 500;
          color: var(--cx-taupe);
        }
        .cs-quote-text {
          margin: 0; width: 75%; max-width: 75%;
          font-family: var(--cx-font-serif); font-weight: 500; font-style: normal;
          font-size: clamp(28px, 3.4vw, 42px); line-height: 1.05; letter-spacing: -0.01em;
          color: var(--cx-taupe); text-wrap: balance;
        }
        .cs-quote-cap {
          margin-top: 40px; display: flex; flex-direction: column; align-items: center; gap: 10px;
        }
        .cs-quote-name {
          font-family: var(--cx-font-sans); font-weight: 400;
          font-size: 28px; line-height: 1; color: var(--cx-taupe);
        }
        .cs-quote-title {
          font-family: var(--cx-font-sans); font-weight: 700;
          font-size: 14px; letter-spacing: 0.04em; text-transform: uppercase;
          color: var(--cx-taupe); max-width: 32ch;
        }

        @media (max-width: 980px) {
          .cs-card { padding: 32px; }
          .cs-top { grid-template-columns: 1fr; gap: 32px; }
          .cs-lead { font-size: 26px; }
          .cs-quote { margin-top: 40px; }
          .cs-quote-divider { margin-bottom: 32px; }
        }
        @media (max-width: 600px) {
          .cs-row-value { font-size: 30px; }
          .cs-quote-name { font-size: 24px; }
        }
      `}</style>
    </section>);

}

window.CaseStudies = CaseStudies;