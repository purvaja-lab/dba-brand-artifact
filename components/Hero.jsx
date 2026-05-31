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
      <div className="glow" aria-hidden="true"></div>
      <div className="wrap-wide" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span className="hero__eyebrow">
          <span className="hero__eyebrow-dot"></span>
          The 2026 Creative Salience Report
        </span>
        <h1 className="hero__title" style={{ padding: "0px 0px 20px", margin: "28px auto 0px", width: "100%", maxWidth: "1100px", fontSize: "clamp(40px, 8.5vw, 100px)" }}>
          Whose brand is it anyway? <span className="ampersand" style={{ color: "rgb(0, 60, 79)" }}></span>
          <span style={{ color: "rgb(0, 60, 79)" }}></span>
        </h1>
        <p className="hero__sub" style={{ fontFamily: "\"Greed Standard\"" }}>
          The world's largest study of brand-building creative reveals how marketers
          are quietly handing equity back to platforms, creators, and competitors —
          and the operational playbook to take it back.
        </p>
        <div className="hero__meta">
          <div className="hero__meta-item">
            <span className="hero__meta-label">Sample</span>
            <span className="hero__meta-value">1.4M paid ads</span>
          </div>
          <div className="hero__meta-item">
            <span className="hero__meta-label">Spend analyzed</span>
            <span className="hero__meta-value">$2.0Bn investment</span>
          </div>
          <div className="hero__meta-item">
            <span className="hero__meta-label">Brand assets</span>
            <span className="hero__meta-value">300,000+ unique DBAs</span>
          </div>
          <div className="hero__meta-item">
            <span className="hero__meta-label">Published</span>
            <span className="hero__meta-value">March 2026</span>
          </div>
        </div>
        <div className="hero__cta">
          <a href="#findings" className="btn btn--primary">Read the findings <Arrow /></a>
          <a href="#contact" className="btn btn--ghost">Talk to a strategist <Arrow /></a>
        </div>
      </div>

    </section>);

}

function Ticker() {
  const items = [
  { num: '$52Bn', label: 'in brand-building spend is at risk' },
  { num: '61%', label: 'of paid ads fail to use 2+ brand cues' },
  { num: '+28%', label: 'average lift in ad recall' },
  { num: '+86%', label: 'when logo and packshot appear together' },
  { num: '45%', label: 'of creator spend is brand-blind' },
  { num: '37%', label: 'of ads use fewer than two DBAs' }];

  const loop = [...items, ...items];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {loop.map((it, i) =>
        <div className="ticker__item" key={i}>
            <span className="ticker__item-num">{it.num}</span>
            <span>{it.label}</span>
            <span className="ticker__dot"></span>
          </div>
        )}
      </div>
    </div>);

}

window.Hero = Hero;
window.Ticker = Ticker;
window.Arrow = Arrow;