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
  desc: 'A single ownable hue — Tiffany blue, Cadbury purple, T-Mobile magenta. Most underused outside CPG.',
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
  desc: 'Characters and creatures — gecko, duck, dough boy. Massive recall lift, rarely deployed in performance.',
  cue: ({ active }) =>
  <svg viewBox="0 0 220 140" style={{ width: "502px", height: "394px" }}>
        <rect width="220" height="140" rx="20" fill="var(--cx-paper-soft)" />
        <g transform="translate(110,72)">
          {/* ears */}
          <path d={active ? "M-30,-30 Q-58,-22 -50,18 Q-38,8 -28,-8 Z" : "M-30,-28 Q-54,-18 -46,16 Q-36,6 -28,-8 Z"}
                fill="var(--cx-green-700)" style={{ transition: 'all .4s' }} />
          <path d={active ? "M30,-30 Q58,-22 50,18 Q38,8 28,-8 Z" : "M30,-28 Q54,-18 46,16 Q36,6 28,-8 Z"}
                fill="var(--cx-green-700)" style={{ transition: 'all .4s' }} />
          {/* head */}
          <ellipse cx="0" cy="0" rx="34" ry="32" fill="var(--cx-green-600)" />
          {/* eyes */}
          <circle cx="-13" cy="-6" r="4.5" fill="var(--cx-paper)" />
          <circle cx="13" cy="-6" r="4.5" fill="var(--cx-paper)" />
          <circle cx="-13" cy={active ? -7 : -5} r="2.2" fill="var(--cx-ocean)" style={{ transition: 'cy .4s' }} />
          <circle cx="13" cy={active ? -7 : -5} r="2.2" fill="var(--cx-ocean)" style={{ transition: 'cy .4s' }} />
          {/* snout */}
          <ellipse cx="0" cy="13" rx="15" ry="12" fill="var(--cx-green-400)" />
          <ellipse cx="0" cy="7" rx="5" ry="4" fill="var(--cx-ocean)" />
          <path d="M0,11 V16 M0,16 Q-6,20 -10,17 M0,16 Q6,20 10,17" stroke="var(--cx-ocean)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* tongue (only when active) */}
          <path d={active ? "M-5,18 Q0,30 5,18 Z" : "M-4,17 Q0,18 4,17 Z"} fill="var(--cx-coral)" style={{ transition: 'all .4s' }} />
        </g>
      </svg>

},
{
  id: 'tagline', name: 'Tagline', share: 23,
  swatch: 'var(--cx-teal-600)',
  desc: 'A short, ownable verbal cue. "Just Do It." "Think Different." Used in 23% of paid ads.',
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
  id: 'sonic', name: 'Sonic ID', share: 8,
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
        <span className="eyebrow">01 · The vocabulary</span>
        <h2 className="sec__title" style={{ fontSize: "62px", textAlign: "left" }}>What's a <em style={{ fontSize: "62px" }}>distinctive brand asset?</em></h2>
        <p className="sec__lede" style={{ fontFamily: "\"Greed Standard\"" }}>
          DBAs are the cues consumers use to recognize you in 1.7 seconds of scroll. We tagged seven categories across 1.4M ads. Hover any one to see how it shows up — and how often.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, marginTop: 64, alignItems: 'start' }} className="dba-grid">
          <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid var(--cx-line)' }}>
              {DBA_TYPES.map((d) =>
              <li key={d.id}
              onMouseEnter={() => setActive(d.id)}
              onClick={() => setActive(d.id)}
              style={{
                display: 'grid', gridTemplateColumns: '32px 1fr 80px', alignItems: 'center', gap: 16,
                padding: '22px 0', borderBottom: '1px solid var(--cx-line)',
                cursor: 'pointer', transition: 'background .25s',
                background: active === d.id ? 'color-mix(in oklab, var(--cx-coral) 6%, transparent)' : 'transparent',
                borderRadius: 4,
                paddingLeft: active === d.id ? 16 : 0
              }}>
                  <span style={{ width: 24, height: 24, borderRadius: 6, background: d.swatch, transform: active === d.id ? 'rotate(45deg) scale(1.1)' : 'none', transition: 'transform .35s' }}></span>
                  <span style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>{d.name}</span>
                  <span style={{ textAlign: 'right', fontFamily: 'var(--cx-font-sans)', fontVariantNumeric: 'tabular-nums', color: 'var(--cx-fg-muted)', fontSize: 15 }}>
                    {d.share}% of ads
                  </span>
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
              <div style={{ marginTop: 24, height: 4, background: 'var(--cx-line)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${cur.share}%`, background: cur.swatch, transition: 'width .5s', borderRadius: 2 }}></div>
              </div>
              <div style={{ marginTop: 10, fontSize: 13, color: 'var(--cx-fg-muted)', display: 'flex', justifyContent: 'space-between' }}>
                <span>Share of ads containing this cue</span>
                <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 500, color: 'var(--cx-fg)' }}>{cur.share}%</span>
              </div>
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