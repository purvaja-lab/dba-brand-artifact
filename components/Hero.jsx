// Hero — magazine cover for the report
const { useEffect, useRef, useState } = React;

function Arrow() {
  return (
    <svg className="btn__arrow" viewBox="0 0 16 16" fill="none">
      <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>);

}

function Hero() {
  return (
    <section className="hero" style={{ textAlign: 'center' }}>
      <div className="wrap-wide" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span className="hero__eyebrow">
          Creative Salience
        </span>
        <h1 className="hero__title" style={{ padding: "0px 0px 20px", margin: "28px auto 0px", width: "100%", maxWidth: "1100px", fontSize: "clamp(40px, 8.5vw, 100px)" }}>
          Whose brand is it anyway? <span className="ampersand" style={{ color: "rgb(0, 60, 79)" }}></span>
          <span style={{ color: "rgb(0, 60, 79)" }}></span>
        </h1>
        <p className="hero__sub" style={{ fontFamily: "\"Greed Standard\"" }}>A study of $2B in advertising reveals how Distinctive Brand Assets drive Brand Recall and Increase Media Efficiency.



        </p>
        <div className="hero__meta">
          <div className="hero__meta-item">
            <span className="hero__meta-label">Sample</span>
            <span className="hero__meta-value">1.4M paid ads</span>
          </div>
          <div className="hero__meta-item">
            <span className="hero__meta-label">Spend analyzed</span>
            <span className="hero__meta-value">$2B investment</span>
          </div>
          <div className="hero__meta-item">
            <span className="hero__meta-label">Brand assets</span>
            <span className="hero__meta-value">300,000+ assets</span>
          </div>
          <div className="hero__meta-item">
            <span className="hero__meta-label">Coverage</span>
            <span className="hero__meta-value">176 brands · 105 markets</span>
          </div>
        </div>
        <div className="hero__cta hero__cta--cases" style={{ width: "100%", maxWidth: "462px" }}>
          <a href="#case-mondelez" className="case-btn" aria-label="Featured case study: Mondelēz">
            <span className="case-btn__logo">
              <img src={window.__resources.mondelezLogo} alt="Mondelēz International" />
            </span>
            <span className="case-btn__body" style={{ gap: "6px" }}>
              <span className="case-btn__kicker" style={{ padding: "0px", fontSize: "9px" }}>Featured Case Study</span>
              <span className="case-btn__brand" style={{ fontFamily: "\"Greed Standard\"", fontWeight: 500, fontSize: "18px", fontStyle: "normal" }}>Mondelēz</span>
            </span>
          </a>
          <a href="#case-bayer" className="case-btn" aria-label="Featured case study: Bayer">
            <span className="case-btn__logo">
              <img src={window.__resources.bayerBtnLogo} alt="Bayer" />
            </span>
            <span className="case-btn__body" style={{ gap: "6px" }}>
              <span className="case-btn__kicker">Featured Case Study</span>
              <span className="case-btn__brand" style={{ fontFamily: "\"Greed Standard\"", fontWeight: 500, fontSize: "18px", fontStyle: "normal" }}>Bayer</span>
            </span>
          </a>
        </div>
      </div>

    </section>);

}

function Ticker() {
  const items = [
  { num: '$52B', label: 'potential industry efficiency opportunity' },
  { num: '61%', label: 'of paid ads lack sufficient brand cues to reliably encode memory' },
  { num: '176', label: 'brands, 105+ markets' },
  { num: '+86%', label: 'when logo and packshot appear together' },
  { num: '45%', label: 'of creator spend on Meta runs unbranded' },
  { num: '37%', label: 'of ads use fewer than two DBAs' }];

  const loop = [...items, ...items];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {loop.map((it, i) =>
        <React.Fragment key={i}>
            <div className="ticker__item">
              <span className="ticker__item-num">{it.num}</span>
              <span>{it.label}</span>
            </div>
            <span className="ticker__dot"></span>
          </React.Fragment>
        )}
      </div>
    </div>);

}

window.Hero = Hero;
window.Ticker = Ticker;
window.Arrow = Arrow;