// DBA Explainer — 7 types of Distinctive Brand Assets, interactive tabs
const { useState } = React;

const DBA_TYPES = [
{
  id: 'logo', name: 'Logos', share: 78,
  swatch: 'var(--cx-coral)',
  desc: 'Wordmarks and brand marks. Most-used cue across the dataset — and also the most over-trusted.',
  cue: ({ active }) =>
  <svg viewBox="0 0 220 140">
        <rect width="220" height="140" rx="20" fill="var(--cx-paper-soft)" style={{ fill: "rgba(0, 60, 79, 0)" }} />
        <g transform="translate(110,70)">
          <circle r={active ? 38 : 30} fill="var(--cx-coral)" style={{ transition: 'r .4s', fill: "rgb(0, 60, 79)" }} />
          <text textAnchor="middle" dy="6" fill="var(--cx-paper)" style={{ font: '600 22px var(--cx-font-sans)' }}>BX</text>
        </g>
      </svg>

},
{
  id: 'packshot', name: 'Packshots', share: 54,
  swatch: 'var(--cx-marigold)',
  desc: 'Product-in-hand or hero shot of the actual physical product. The single highest-impact DBA when paired with logo.',
  cue: ({ active }) =>
  <svg viewBox="0 0 220 140">
        <rect width="220" height="140" rx="20" fill="var(--cx-paper-soft)" />
        <g transform={`translate(110,76) rotate(${active ? -4 : -10})`} style={{ transition: 'transform .4s' }}>
          <rect x="-26" y="-38" width="52" height="76" rx="6" fill="var(--cx-marigold)" />
          <rect x="-22" y="-30" width="44" height="14" rx="2" fill="var(--cx-paper)" opacity=".8" />
          <rect x="-18" y="-12" width="36" height="3" rx="1.5" fill="var(--cx-ocean)" opacity=".4" />
          <rect x="-18" y="-5" width="22" height="3" rx="1.5" fill="var(--cx-ocean)" opacity=".4" />
        </g>
      </svg>

},
{
  id: 'color', name: 'Brand color', share: 41,
  swatch: 'var(--cx-purple-500)',
  desc: 'A single ownable hue — Tiffany blue, Cadbury purple, T-Mobile magenta.',
  cue: ({ active }) =>
  <svg viewBox="0 0 220 140">
        <rect width="220" height="140" rx="20" fill={active ? 'var(--cx-purple-500)' : 'var(--cx-paper-soft)'} style={{ transition: 'fill .4s', fill: "rgb(244, 243, 236)" }} />
          <circle cx="46" cy="70" r="18" fill="var(--cx-purple-500)" style={{ fill: "rgb(250, 250, 240)" }} />
          <circle cx="90" cy="70" r="18" fill="var(--cx-coral)" />
          <circle cx="134" cy="70" r="18" fill="var(--cx-marigold)" />
          <circle cx="178" cy="70" r="18" fill="var(--cx-teal-500)" />
      </svg>

},
{
  id: 'mascot', name: 'Mascot', share: 11,
  swatch: 'var(--cx-green-600)',
  desc: 'Characters and creatures — gecko, duck, dough boy. Distinctive and memorable, yet rarely deployed in performance advertising.',
  cue: ({ active }) =>
  <svg viewBox="0 0 220 140">
        <rect width="220" height="140" rx="20" fill="var(--cx-paper-soft)" />
        <g transform={`translate(110,70) scale(${active ? 0.92 : 0.84})`} style={{ transition: 'transform .4s' }}>
          <g transform="translate(-48,-52)">
            <path d="M74.1551 40.2998H21.66C11.9043 40.2998 4.00684 48.1973 4.00684 57.953V99.4148C4.00684 101.912 6.03927 103.886 8.4782 103.886H87.3369C89.8339 103.886 91.8083 101.854 91.8083 99.4148V58.0111C91.8663 48.2554 83.9108 40.2998 74.1551 40.2998Z" fill="#17A2B8"></path>
            <path d="M47.9076 28.3379C39.894 28.3379 33.0417 33.3319 30.2544 40.3003H37.1066C39.4294 36.758 43.3782 34.4352 47.9076 34.4352C52.437 34.4352 56.4438 36.758 58.7086 40.3003H65.5608C62.7734 33.3319 55.9212 28.3379 47.9076 28.3379Z" fill="#00A3BF"></path>
            <path d="M47.9074 19.6853C46.8621 19.6853 45.8749 19.5111 44.9458 19.2207V28.5699C45.933 28.3957 46.9202 28.3377 47.9074 28.3377C48.8945 28.3377 49.9398 28.3957 50.8689 28.5699V19.2207C49.9398 19.5111 48.9526 19.6853 47.9074 19.6853Z" fill="#00A3BF"></path>
            <path d="M68.6385 81.4717V83.446C68.6385 84.7817 67.5933 85.8269 66.2577 85.8269H29.5576C28.222 85.8269 27.1768 84.7817 27.1768 83.446V81.4717C27.1768 80.1361 26.1315 79.0908 24.7959 79.0908C23.4603 79.0908 22.415 80.1361 22.415 81.4717V85.8269C22.415 88.4981 24.5636 90.5886 27.1768 90.5886H68.6966C71.3678 90.5886 73.4583 88.44 73.4583 85.8269V81.4717C73.4583 80.1361 72.4131 79.0908 71.0775 79.0908C69.7419 79.0908 68.6385 80.1361 68.6385 81.4717Z" fill="#F5F0E3"></path>
            <path d="M94.5374 79.9034H91.8081V61.8438H94.5374C95.2342 61.8438 95.8149 62.4244 95.8149 63.1213V78.6259C95.8149 79.3227 95.2923 79.9034 94.5374 79.9034Z" fill="#FFAB00"></path>
            <path d="M1.27753 61.8438H4.00681V79.9034H1.27753C0.580698 79.9034 0 79.3227 0 78.6259V63.1213C0 62.4244 0.580698 61.8438 1.27753 61.8438Z" fill="#FFAB00"></path>
            <path d="M35.3646 52.9584C30.4868 52.8423 26.48 57.0233 26.48 61.9012V62.1915V63.469C26.48 63.5852 26.5961 63.7013 26.7123 63.7013H31.1256C31.2417 63.7013 31.3578 63.5852 31.3578 63.469V62.1915V61.8431C31.3578 59.7526 32.9257 58.0105 35.0162 57.9524C37.1648 57.8943 38.9069 59.5784 38.9069 61.7269V62.2496V63.5271C38.9069 63.6433 39.023 63.7594 39.1392 63.7594H43.5525C43.6686 63.7594 43.7848 63.6433 43.7848 63.5271V62.2496V61.7269C43.9009 56.9072 40.1264 53.0165 35.3646 52.9584Z" fill="#F5F0E3"></path>
            <path d="M60.7992 53.017C55.9214 52.9009 51.9146 57.0819 51.9146 61.9597V62.2501V63.5276C51.9146 63.6438 52.0307 63.7599 52.1468 63.7599H56.5601C56.6763 63.7599 56.7924 63.6438 56.7924 63.5276V62.2501V61.9017C56.7924 59.8112 58.3603 58.0691 60.4508 58.011C62.5994 57.9529 64.3415 59.637 64.3415 61.7855V62.3082V63.5857C64.3415 63.7018 64.4576 63.818 64.5737 63.818H68.9871C69.1032 63.818 69.2193 63.7018 69.2193 63.5857V62.3082V61.7855C69.3935 56.9658 65.5609 53.0751 60.7992 53.017Z" fill="#F5F0E3"></path>
            <path d="M47.9075 19.7437C53.3596 19.7437 57.7794 15.3239 57.7794 9.87185C57.7794 4.41978 53.3596 0 47.9075 0C42.4554 0 38.0356 4.41978 38.0356 9.87185C38.0356 15.3239 42.4554 19.7437 47.9075 19.7437Z" fill="#FFAB00"></path>
          </g>
        </g>
      </svg>

},
{
  id: 'tagline', name: 'Tagline', share: 23,
  swatch: 'var(--cx-teal-600)',
  desc: 'A short, ownable verbal cue. "Just Do It." "Think Different." Instantly recognizable without the logo.',
  cue: ({ active }) =>
  <svg viewBox="0 0 220 140">
        <rect width="220" height="140" rx="20" fill="var(--cx-paper-soft)" />
        <text x="110" y="62" textAnchor="middle" fill="var(--cx-ocean)" style={{ font: 'italic 500 28px var(--cx-font-serif)' }}>Built different.</text>
        <line x1={active ? 60 : 90} y1="78" x2={active ? 160 : 130} y2="78" stroke="var(--cx-coral)" strokeWidth="3" strokeLinecap="round" style={{ transition: 'all .4s' }} />
      </svg>

},
{
  id: 'icon', name: 'Icon / pattern', share: 18,
  swatch: 'var(--cx-blue-600)',
  desc: 'Repeating motifs and graphic systems — Burberry check, Vans waffle, Louis Vuitton monogram.',
  cue: ({ active }) =>
  <svg viewBox="0 0 220 140">
        <rect width="220" height="140" rx="20" fill="var(--cx-paper-soft)" />
        <g fill="var(--cx-blue-600)" opacity={active ? 1 : 0.65} style={{ transition: 'opacity .4s' }}>
          {[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4, 5].map((c) =>
      <circle key={`${r}-${c}`} cx={26 + c * 34} cy={28 + r * 28} r={active ? 7 : 5} style={{ transition: 'r .4s' }} />
      ))}
        </g>
      </svg>

},
{
  id: 'sonic', name: 'Sonic', share: 8,
  swatch: 'var(--cx-orange-600)',
  desc: 'Audio mnemonics — the Netflix "ta-dum," Intel chime, McDonald\'s "I\'m Lovin\' It" jingle.',
  cue: ({ active }) =>
  <svg viewBox="0 0 220 140">
        <rect width="220" height="140" rx="20" fill="var(--cx-paper-soft)" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
      const h = active ? 12 + Math.abs(Math.sin(i * 0.9 + 1)) * 56 : 8 + Math.abs(Math.sin(i * 0.9)) * 28;
      return <rect key={i} x={20 + i * 16} y={70 - h / 2} width="8" height={h} rx="4" fill="var(--cx-orange-600)" style={{ transition: 'all .35s' }} />;
    })}
      </svg>

}];


function DBAExplainer() {
  const [active, setActive] = useState('logo');
  const cur = DBA_TYPES.find((d) => d.id === active);
  return (
    <section className="sec" id="dbas">
      <div className="wrap-wide">
        <span className="eyebrow">THE VOCABULARY</span>
        <h2 className="sec__title" style={{ fontSize: "62px", textAlign: "left" }}>What's a <em style={{ fontSize: "62px" }}>distinctive brand asset?</em></h2>
        <p className="sec__lede" style={{ fontFamily: "\"Greed Standard\"", lineHeight: "1.2" }}>DBAs are the cues consumers use to recognize you in the 1–2 seconds your ad gets in-feed. Our research tracks seven categories across 1.4M ads. Hover any one to see how it shows up.

        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, marginTop: 64, alignItems: 'start' }} className="dba-grid">
          <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid var(--cx-line)' }}>
              {DBA_TYPES.map((d) =>
              <li key={d.id}
              onMouseEnter={() => setActive(d.id)}
              onClick={() => setActive(d.id)}
              style={{
                display: 'grid', gridTemplateColumns: '32px 1fr', alignItems: 'center', gap: 16,
                padding: '22px 0', borderBottom: '1px solid var(--cx-line)',
                cursor: 'pointer', transition: 'background .25s',
                background: active === d.id ? 'color-mix(in oklab, var(--cx-coral) 6%, transparent)' : 'transparent',
                borderRadius: 4,
                paddingLeft: active === d.id ? 16 : 0
              }}>
                  <span style={{ width: 24, height: 24, borderRadius: 6, background: d.swatch, transform: active === d.id ? 'rotate(45deg) scale(1.1)' : 'none', transition: 'transform .35s' }}></span>
                  <span style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>{d.name}</span>
                </li>
              )}
            </ul>
          </div>
          <div style={{ position: 'sticky', top: 120 }}>
            <div style={{ background: 'var(--cx-paper-soft)', borderRadius: 28, padding: 32, border: '1px solid var(--cx-line)' }}>
              <div style={{ borderRadius: 20, overflow: 'hidden' }}>
                {cur.cue({ active: true })}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 24 }}>
                <h3 style={{ fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', fontWeight: 500, fontSize: 36, margin: 0, letterSpacing: '-0.01em' }}>
                  {cur.name}
                </h3>
                <span style={{ fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--cx-fg-muted)' }}>
                  Type · 0{DBA_TYPES.indexOf(cur) + 1}
                </span>
              </div>
              <p style={{ margin: '14px 0 0', fontSize: 17, lineHeight: 1.45, color: 'var(--cx-fg-deep)' }}>{cur.desc}</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .dba-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .dba-grid > div:last-child { position: static !important; }
        }
      `}</style>
    </section>);

}

window.DBAExplainer = DBAExplainer;