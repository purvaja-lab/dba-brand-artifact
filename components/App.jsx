// App — composition of all sections
const App_root = ReactDOM.createRoot(document.getElementById('root'));
function App() {
  return (
    <React.Fragment>
      <Hero />
      <Ticker />
      <ExecSummary />
      <ThreeFailures />
      <DBAExplainer />
      <AttributionGap />
      <Multiplier />
      <LoanedBrand />
      <MethodologyEditorial />
      <CaseStudies />
      <Playbook />
      <Closing />

      <footer>
        <div className="wrap-wide">
          <div className="ft__grid">
            <div>
              <h3 style={{ fontWeight: "500" }}>Whose brand is it anyway?</h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,.65)', maxWidth: '40ch', margin: 0, lineHeight: 1.5 }}>The 2026 Creative Salience Report.

              </p>
              <div style={{ marginTop: 28, display: 'flex', gap: 10, alignItems: 'center' }}>
                <img src="assets/logo/white-logo.svg" alt="CreativeX" style={{ height: 26 }} />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,.55)', borderLeft: '1px solid rgba(255,255,255,.18)', paddingLeft: 10 }}>Creative Salience</span>
              </div>
            </div>
            <div>
              <div className="ft__col-title">The report</div>
              <ul>
                <li><a href="#findings">Executive summary</a></li>
                <li><a href="#dbas">What's a DBA?</a></li>
                <li><a href="#gap">Attribution gap</a></li>
                <li><a href="#multiplier">Multiplier effect</a></li>
                <li><a href="#cases">Case studies</a></li>
              </ul>
            </div>
            <div>
              <div className="ft__col-title">More from CreativeX</div>
              <ul>
                <li><a href="#">The Creative Quality Score</a></li>
                <li><a href="#">2025 State of Creative</a></li>
                <li><a href="#">Brand Salience Benchmarks</a></li>
                <li><a href="#">For media agencies</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="ft__bottom">
            <span>© 2026 CreativeX. All rights reserved.</span>
            <span>Whose Brand Is It Anyway? · v1.0 · Feb 2026</span>
          </div>
        </div>
      </footer>
    </React.Fragment>);

}
App_root.render(<App />);