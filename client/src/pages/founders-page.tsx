import "./founders-page.css";

export default function FoundersPage() {
  return (
    <div className="founders-page-wrapper">
      {/* NAV */}
      <nav>
        <div className="container">
          <div className="logo">Transformation Builder</div>
          <a href="#join" className="nav-cta">Join Now</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-tag">Founder's Program — Now Open</span>
            <h1>
              Stop Consuming Information.<br />
              <span className="line-gold">Start Moving Forward.</span>
            </h1>
            <p className="hero-sub">
              Use <strong>AI + Proven Insight</strong> to Build Your Future with Clarity
            </p>
            <p className="hero-stuck">
              Most people watch webinars… take notes… and stay stuck.<br />
              This is where that changes.
            </p>
            <div className="hero-offer">
              <h3>Founder's Program</h3>
              <div className="price">
                $16.99 <span>/month</span>
              </div>
              <ul className="check-list">
                <li>Full Access to Transformer + Implementer Plans</li>
                <li>2 Live 1-Hour Insight Sessions</li>
                <li>Real Guidance to Launch Your Next Move</li>
              </ul>
            </div>
            <br />
            <a href="#join" className="btn-primary">Start Your Transformation Now</a>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="problem">
        <div className="container">
          <span className="section-label">The Problem</span>
          <h2>
            You're Not Lacking Information —<br />
            You're Lacking <span className="gold">Direction</span>
          </h2>
          <p className="section-text">
            You've tried. You've consumed. You've invested time. But the gap between knowing and doing keeps growing.
          </p>

          <div className="pain-grid">
            <div className="pain-card">
              <div className="icon">📺</div>
              <h4>Watched Multiple Webinars</h4>
              <p>Hours of content consumed, notebooks filled, but no tangible progress to show for it.</p>
            </div>
            <div className="pain-card">
              <div className="icon">🧩</div>
              <h4>Tried to Figure It Out Alone</h4>
              <p>Piecing together strategies from scattered sources without a clear roadmap.</p>
            </div>
            <div className="pain-card">
              <div className="icon">💡</div>
              <h4>Had Ideas Without Execution</h4>
              <p>Great concepts sitting in your head or in a document — unrealized and unfinished.</p>
            </div>
            <div className="pain-card">
              <div className="icon">🔁</div>
              <h4>Stuck in the Loop</h4>
              <p>Constantly learning, rarely implementing. The cycle repeats.</p>
            </div>
          </div>

          <div className="result-strip">
            <h4>And the result? You're still…</h4>
            <div className="result-items">
              <span>Overthinking</span>
              <span>Second-guessing</span>
              <span>Not moving forward</span>
            </div>
          </div>
        </div>
      </section>

      {/* THE SHIFT */}
      <section className="shift">
        <div className="container">
          <span className="section-label">The Shift</span>
          <h2>
            What If You Had a System That<br />
            <span className="gold">Actually Guided You Forward?</span>
          </h2>
          <p className="section-text">
            Instead of guessing your next move — you get a clear system built on real experience, not theory.
          </p>

          <div className="shift-cards">
            <div className="shift-card">
              <div className="num">01</div>
              <h4>Clear Structure</h4>
              <p>A proven framework to follow — so you always know what step comes next.</p>
            </div>
            <div className="shift-card">
              <div className="num">02</div>
              <h4>AI-Powered Insights</h4>
              <p>Intelligent tools tailored to your specific goals and situation.</p>
            </div>
            <div className="shift-card">
              <div className="num">03</div>
              <h4>Experience-Based Guidance</h4>
              <p>Direction rooted in decades of real-world execution, not classroom speculation.</p>
            </div>
          </div>

          <div className="highlight-box" style={{ marginTop: '48px' }}>
            <p>
              This is not about learning more. <strong>This is about moving forward with clarity.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="offer">
        <div className="container">
          <span className="section-label">What You Get</span>
          <h2>
            Inside the <span className="gold">Founder's Offer</span>
          </h2>

          <div className="offer-block">
            <h3>1. Full Access to Transformer + Implementer Plans</h3>
            <p className="section-text" style={{ marginBottom: '24px' }}>
              You're stepping into the full system — not a limited version. Everything you need to go from idea to execution.
            </p>
            <ul className="check-list">
              <li>Turn ideas into structured goals</li>
              <li>Break goals into actionable steps</li>
              <li>Build skills aligned with your future</li>
              <li>Generate AI-driven insights</li>
              <li>Create your personal blueprint</li>
            </ul>
          </div>

          <div className="offer-block">
            <h3>2. Two 1-Hour Live Insight Sessions</h3>
            <p className="section-text" style={{ marginBottom: '24px' }}>
              This is where clarity happens. You'll be guided through strategy sessions designed to unlock your next move.
            </p>

            <div className="session-goals">
              <div className="session-goal">
                <h5>Identify Your Next Move</h5>
                <p>Cut through the noise and find the one thing to focus on.</p>
              </div>
              <div className="session-goal">
                <h5>Use AI to Refine Direction</h5>
                <p>Leverage intelligent tools to sharpen your strategy.</p>
              </div>
              <div className="session-goal">
                <h5>Apply Strategy to Goals</h5>
                <p>Leave with a plan you can execute immediately.</p>
              </div>
              <div className="session-goal">
                <h5>Build What Matters</h5>
                <p>A book, web app, webinar, or AI-driven project — your choice.</p>
              </div>
            </div>

            <div className="highlight-box">
              <p>
                You'll leave with <strong>real direction you can act on immediately.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* YOUR UNIQUE EDGE / CREDENTIALS */}
      <section className="edge">
        <div className="container">
          <span className="section-label">Your Unique Edge</span>
          <h2>
            Why This Is <span className="gold">Different</span> From Everything Else
          </h2>
          <p className="section-text">
            Most programs teach theory. This gives you inside perspective from <strong>real execution</strong>. You're learning from someone who is actively building, testing, refining, and navigating success in real time.
          </p>

          <div className="credentials-grid">
            <div className="cred-card">
              <div className="cred-icon edu">🎓</div>
              <h4>20+ Years in Higher Education</h4>
              <p>Professor of Business Administration, Technology, Digital Design, and Communication — shaping the next generation of professionals.</p>
            </div>
            <div className="cred-card">
              <div className="cred-icon web">🌐</div>
              <h4>Real-World Web Projects</h4>
              <p>Designed and developed web solutions for private Bible colleges, a newspaper employer, a university employer, and a technical college employer.</p>
            </div>
            <div className="cred-card">
              <div className="cred-icon pub">📚</div>
              <h4>Published Author &amp; Publisher</h4>
              <p>Successfully published 2 personal books and 3 books for other individuals, with 2 more publishing projects currently in development.</p>
            </div>
            <div className="cred-card">
              <div className="cred-icon min">⛪</div>
              <h4>Ministry &amp; Community Leadership</h4>
              <p>Ministered across multiple church settings, configured display technology, and developed streaming media systems for worship environments.</p>
            </div>
            <div className="cred-card">
              <div className="cred-icon tech">🚀</div>
              <h4>Entrepreneurship &amp; Development</h4>
              <p>Successful completion of web design, web development, and entrepreneurship projects across education and industry sectors.</p>
            </div>
            <div className="cred-card">
              <div className="cred-icon ai">🤖</div>
              <h4>AI &amp; Modern Platforms</h4>
              <p>Actively utilizing various AI tools alongside web platforms including WIX, Shopify, and a host of web applications to drive innovation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHT STACK */}
      <section className="insight">
        <div className="container">
          <span className="section-label">Insight Stack</span>
          <h2>
            Access What <span className="gold">Most People Never See</span>
          </h2>
          <p className="section-text">
            Inside this program, you benefit from curated, distilled insight — not raw information overload.
          </p>

          <div className="insight-stats">
            <div className="stat-card">
              <div className="stat-num">8+</div>
              <div className="stat-label">High-Level Trainings Synthesized</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">$1,200+</div>
              <div className="stat-label">Invested to Identify What Works</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">20+</div>
              <div className="stat-label">Years of Real-World Execution</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">100%</div>
              <div className="stat-label">Actionable AI Strategies</div>
            </div>
          </div>

          <div className="highlight-box" style={{ marginTop: '40px' }}>
            <p>
              You skip the trial and error. You get a <strong>clear breakdown of what to focus on vs. what to ignore</strong> — plus real strategies to leverage AI for business and growth.
            </p>
          </div>
        </div>
      </section>

      {/* TRANSFORMATION */}
      <section className="transform">
        <div className="container">
          <span className="section-label">Transformation</span>
          <h2>
            What Changes <span className="gold">When You Join</span>
          </h2>

          <div className="transform-compare">
            <div className="transform-col before">
              <h3>You Stop…</h3>
              <ul>
                <li>Jumping between ideas</li>
                <li>Consuming content without action</li>
                <li>Feeling stuck and uncertain</li>
              </ul>
            </div>
            <div className="transform-col after">
              <h3>You Start…</h3>
              <ul>
                <li>Moving with clarity</li>
                <li>Building with intention</li>
                <li>Executing with confidence</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3-STEP JOURNEY */}
      <section className="journey">
        <div className="container">
          <span className="section-label">Your Journey</span>
          <h2>
            Three Steps to <span className="gold">Transformation</span>
          </h2>
          <p className="section-text">
            A clear path from where you are to where you need to be.
          </p>

          <div className="journey-steps">
            <div className="journey-step">
              <div className="step-circle">1</div>
              <h4>Discover</h4>
              <p>Identify your goals, uncover blind spots, and find your focus using AI-driven clarity.</p>
            </div>
            <div className="journey-step">
              <div className="step-circle">2</div>
              <h4>Build</h4>
              <p>Structure your vision into actionable plans with step-by-step guidance.</p>
            </div>
            <div className="journey-step">
              <div className="step-circle">3</div>
              <h4>Implement</h4>
              <p>Execute with confidence, refine with feedback, and launch your future.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER ADVANTAGE */}
      <section className="founder" id="join">
        <div className="container">
          <span className="section-label">Founder Advantage</span>
          <h2>
            Why You Should <span className="gold">Join Now</span>
          </h2>
          <p className="section-text">
            This is a limited Founder's Offer. This price will increase.
          </p>

          <div className="founder-card">
            <div className="founder-badge">Limited Founder's Offer</div>
            <h3>Transformation Builder</h3>
            <div className="price-big">$16.99</div>
            <p className="price-sub">per month — locked in for founders</p>

            <ul className="check-list">
              <li>Full System Access — Transformer + Implementer</li>
              <li>2 Live 1-Hour Insight Sessions</li>
              <li>Real Guidance That Moves You Forward</li>
              <li>Early access to all evolving features</li>
              <li>Priority insight and guidance</li>
              <li>Grow with the platform as it expands</li>
            </ul>

            <a href="#" className="btn-primary" style={{ marginTop: '12px' }}>Start Now</a>

            <div className="urgency">
              <p>⚡ First 25 Founders Only — Locked-In Pricing</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container">
          <span className="section-label">Your Next Step</span>
          <h2>
            Stop Watching Others Build Their Future.<br />
            <span className="gold">Start Building Yours.</span>
          </h2>
          <p className="section-text">
            With clarity, strategy, and the right guidance — your transformation begins today.
          </p>
          <a href="#join" className="btn-primary">Join the Founder's Program Today</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <p>&copy; 2026 Transformation Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}