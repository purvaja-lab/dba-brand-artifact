// Multiplier — interactive: toggle DBAs, see ad recall lift compound
const { useState: useState_M } = React;

const CUES = [
{ id: 'logo', name: 'Logo', lift: 18, color: 'var(--cx-coral)' },
{ id: 'pack', name: 'Packshot', lift: 22, color: 'var(--cx-marigold)' },
{ id: 'color', name: 'Brand color', lift: 14, color: 'var(--cx-purple-500)' },
{ id: 'tagline', name: 'Tagline', lift: 9, color: 'var(--cx-teal-600)' },
{ id: 'mascot', name: 'Mascot', lift: 17, color: 'var(--cx-green-600)' },
{ id: 'sonic', name: 'Sonic ID', lift: 11, color: 'var(--cx-orange-600)' }];


// Pairwise synergy bonus (applied when both are present)
const SYN = { 'logo+pack': 14, 'pack+color': 6, 'logo+color': 4, 'logo+mascot': 7, 'pack+sonic': 5 };

function computeLift(selected) {
  let total = 0;
  selected.forEach((id) => {const c = CUES.find((x) => x.id === id);if (c) total += c.lift;});
  // synergy
  for (let i = 0; i < selected.length; i++) {
    for (let j = i + 1; j < selected.length; j++) {
      const k1 = `${selected[i]}+${selected[j]}`;
      const k2 = `${selected[j]}+${selected[i]}`;
      total += SYN[k1] || SYN[k2] || 0;
    }
  }
  return Math.min(total, 142);
}

function Multiplier() {
  const [selected, setSelected] = useState_M(['logo']);
  const lift = computeLift(selected);
  const recall = 100 + lift;

  const toggle = (id) => {
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  };

  // Build stacked bar segments — show contributions only (lift from 0)
  const segments = [];
  selected.forEach((id) => {
    const c = CUES.find((x) => x.id === id);
    segments.push({ label: c.name, value: c.lift, color: c.color });
  });
  // synergy as one segment
  let syn = 0;
  for (let i = 0; i < selected.length; i++) {
    for (let j = i + 1; j < selected.length; j++) {
      const k1 = `${selected[i]}+${selected[j]}`;
      const k2 = `${selected[j]}+${selected[i]}`;
      syn += SYN[k1] || SYN[k2] || 0;
    }
  }
  if (syn > 0) segments.push({ label: 'Synergy', value: syn, color: 'var(--cx-rose-700)', striped: true });

  const total = segments.reduce((s, x) => s + x.value, 0);

  return (
    <section className="sec sec--ocean" id="multiplier">
      <div className="wrap-wide">
        <div className="grid-2" style={{ alignItems: 'end' }}>
          <div>
            <span className="eyebrow eyebrow--paper">03 · The multiplier effect</span>
            <h2 className="sec__title" style={{ color: 'var(--cx-paper)', fontSize: "62px" }}>Brand cues don't add. <em style={{ fontSize: "62px" }}>They compound.</em></h2>
          </div>
          <p className="sec__lede" style={{ color: 'rgba(255,255,255,.85)', fontFamily: "\"Greed Standard\"", lineHeight: "0.9" }}>
            Logo and packshot together drive +86% ad recall — more than the sum of their parts. Build your own combination and watch the lift stack.
          </p>
        </div>

        <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56, alignItems: 'start' }} className="mult-grid">
          {/* Left: cue selectors */}
          <div>
            <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,.55)', marginBottom: 16 }}>
              Tap to add cues to your ad
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {CUES.map((c) => {
                const isOn = selected.includes(c.id);
                return (
                  <button key={c.id} onClick={() => toggle(c.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '18px 20px', borderRadius: 16,
                    border: `1px solid ${isOn ? c.color : 'rgba(255,255,255,.16)'}`,
                    background: isOn ? `color-mix(in oklab, ${c.color} 18%, transparent)` : 'rgba(255,255,255,.04)',
                    color: 'var(--cx-paper)', textAlign: 'left', cursor: 'pointer',
                    transition: 'all .25s'
                  }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: 6,
                      background: isOn ? c.color : 'transparent',
                      border: `1.5px solid ${c.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isOn && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6.5l2.5 2.5L10 3" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 500 }}>{c.name}</div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>+{c.lift}% solo lift</div>
                    </div>
                  </button>);

              })}
            </div>

            <div style={{ marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,.5)' }}>
              Synergy bonuses apply when complementary cues fire together (e.g. logo + packshot).
            </div>
          </div>

          {/* Right: live recall meter */}
          <div style={{ background: 'rgba(255,255,255,.04)', borderRadius: 28, padding: 36, border: '1px solid rgba(255,255,255,.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,.55)' }}>Ad recall lift</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>{selected.length} cue{selected.length === 1 ? '' : 's'} active</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 12 }}>
              <span style={{ fontFamily: 'var(--cx-font-sans)', fontSize: 120, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--cx-coral)', fontVariantNumeric: 'tabular-nums' }}>
                +{lift}
              </span>
              <span style={{ fontFamily: 'var(--cx-font-sans)', fontSize: 56, color: 'var(--cx-coral)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                %
              </span>
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', marginTop: 4 }}>vs an ad with 0–1 brand cues</div>

            {/* Stacked bar — fills relative to a 100% max */}
            <div style={{ marginTop: 36 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,.5)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                <span>0%</span><span>+50%</span><span>+100%</span>
              </div>
              <div style={{ height: 56, borderRadius: 12, overflow: 'hidden', background: 'rgba(255,255,255,.06)', display: 'flex', position: 'relative' }}>
                {segments.map((s, i) =>
                <div key={i} title={`${s.label}: +${s.value}%`} style={{
                  width: `${s.value}%`, background: s.color,
                  transition: 'width .5s, background .3s',
                  backgroundImage: s.striped ? 'repeating-linear-gradient(45deg, rgba(255,255,255,.18) 0 6px, transparent 6px 12px)' : 'none'
                }}></div>
                )}
                {/* tick marks */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 calc(25% - 1px), rgba(255,255,255,.08) calc(25% - 1px) 25%)' }}></div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 16 }}>
                {segments.map((s, i) =>
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,.8)' }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, background: s.color }}></span>
                    {s.label} <span style={{ color: 'rgba(255,255,255,.45)' }}>+{s.value}</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: 36, borderTop: '1px dashed rgba(255,255,255,.14)', paddingTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>If this is your ad…</div>
                <div style={{ fontFamily: 'var(--cx-font-serif)', fontStyle: 'italic', fontSize: 22, marginTop: 6, color: 'var(--cx-paper)' }}>
                  {recall < 120 ? 'Unattributed.' : recall < 150 ? 'Recognizable.' : recall < 180 ? 'Branded.' : 'Iconic territory.'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>What it means</div>
                <div style={{ fontSize: 14, marginTop: 6, color: 'rgba(255,255,255,.85)', lineHeight: 1.45 }}>
                  {recall < 120 ? 'Most viewers won\'t attribute it to your brand 24h later.' :
                  recall < 150 ? 'Recall lifts, but rivals\' cues still bleed through.' :
                  recall < 180 ? 'Strong assignment — equity is compounding on every impression.' :
                  'You\'ve crossed into iconic — even fragments work.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .mult-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>);

}

window.Multiplier = Multiplier;