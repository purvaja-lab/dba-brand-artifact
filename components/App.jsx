// App — composition of all sections
const App_root = ReactDOM.createRoot(document.getElementById('root'));

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lightInteractives": false
} /*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.toggleAttribute('data-light-cards', !!t.lightInteractives);
  }, [t.lightInteractives]);

  return (
    <React.Fragment>
      <div className="fold">
        <Hero />
        <Ticker />
      </div>
      <ProblemStatement />
      <DBAExplainer />
      <ThreeFailures />
      <CaseStudies />
      <Playbook />
      <CreativeSalience />
      <Closing />

      <footer style={{ color: "rgb(0, 60, 79)" }}>
        <div className="wrap-wide">
          <div className="ft__grid" style={{ borderWidth: "0px", padding: "0px 0px 6px" }}>
            <div>
              <h3 style={{ fontWeight: "500", fontSize: "50px", color: "rgb(255, 255, 255)" }}>Whose brand is it anyway?</h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,.65)', maxWidth: '40ch', margin: 0, lineHeight: 1.5 }}>A study of $2B in advertising reveals how Distinctive Brand Assets drive Brand Recall and Increase Media Efficiency.

              </p>
              <div style={{ marginTop: 28, display: 'flex', gap: 10, alignItems: 'center' }}>
                <img src={window.__resources.whiteLogo} alt="CreativeX" style={{ height: 26 }} />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,.55)', borderLeft: '1px solid rgba(255,255,255,.18)', paddingLeft: 10 }}>Creative Salience</span>
              </div>
            </div>
            <div>
              <div className="ft__col-title" style={{ color: "rgb(255, 255, 255)" }}>THE INSIGHTS</div>
              <ul>
                <li><a href="#dbas">What's a DBA?</a></li>
                <li><a href="#gap">The Attribution gap</a></li>
                <li><a href="#multiplier">The Multiplier Effect</a></li>
                <li><a href="#loaned">The Loaned Brand</a></li>
                <li><a href="#cases">Case Studies</a></li>
                <li><a href="#playbook">The Playbook</a></li>
              </ul>
            </div>
            <div>
              <div className="ft__col-title" style={{ color: "rgb(255, 255, 255)" }}>More from CreativeX</div>
              <ul>
                <li><a href="https://www.creativex.com/resources/all" target="_blank" rel="noopener">All Resources</a></li>
                <li><a href="https://www.creativex.com/products/creative-quality" target="_blank" rel="noopener">Creative Quality</a></li>
                <li><a href="https://www.creativex.com/products/creative-salience" target="_blank" rel="noopener">Creative Salience</a></li>
                <li><a href="https://www.creativex.com/products/creative-lifecycle" target="_blank" rel="noopener">Creative Lifecycle</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
          <FooterCards />
        </div>
      </footer>

      <TweaksPanel>
        <TweakSection label="Interactive panels" />
        <TweakToggle
          label="Light (taupe) treatment"
          value={t.lightInteractives}
          onChange={(v) => setTweak('lightInteractives', v)} />
      </TweaksPanel>
    </React.Fragment>);

}
App_root.render(<App />);