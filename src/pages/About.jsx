import CookAlongLogo from '../assets/CookAlong.png'
import './About.css'

function About({ goHome, goToRecipes, goToStartHere }) {
  return (
    <main className="about-page">
      <div className="about-content">
        <header className="nav-bar">
          <div className="logo-container">
            <img src={CookAlongLogo} className="cook-along-logo" alt="Cook Along Logo" />
          </div>

          <nav className="nav-links">
            <a href="#" onClick={(e) => { e.preventDefault(); goHome(); }}>Home</a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-current="page" className="active-link">About</a>
            <a href="#" onClick={(e) => { e.preventDefault(); goToRecipes(); }}>Recipes</a>
            <a href="#" onClick={(e) => { e.preventDefault(); goToStartHere(); }}>Start Here</a>
          </nav>
        </header>

        <section className="about-hero">
          <p className="about-tag">ABOUT COOK ALONG</p>
          <h1>Cooking help that keeps you moving.</h1>
          <p className="about-subtitle">
            Cook Along is a recipe guide built for busy students who don’t have time to dig through
            long posts or search around just to figure out how to cook. It’s designed to help you
            make simple food with clear, step-by-step guidance (plus voice support) so you can get
            dinner on the table faster.
          </p>

          <div className="about-cta">
            <button className="primary-cta" onClick={goToRecipes}>Browse recipes</button>
            <button className="secondary-cta" onClick={goHome}>Back to home</button>
          </div>
        </section>

        <section className="about-grid" aria-label="Cook Along features">
          <div className="about-card">
            <h2>Step-by-step guidance</h2>
            <p>
              Each recipe is broken into simple steps so you can focus on cooking—not scrolling or
              re-reading paragraphs.
            </p>
          </div>

          <div className="about-card">
            <h2>Voice support</h2>
            <p>
              Press <strong>Play Voice Guide</strong> on a step to hear it out loud—helpful when your
              hands are messy or you’re multitasking.
            </p>
          </div>

          <div className="about-card">
            <h2>Beginner-friendly recipes</h2>
            <p>
              Quick meals, popular favorites, and healthier options—chosen to be approachable and
              satisfying.
            </p>
          </div>
        </section>

        <section className="about-story">
          <h2>Why we built this</h2>
          <p>
            As students, we’re often balancing classes, work, and everything else. A lot of recipe
            sites are beautiful—but they can be distracting, cluttered, or hard to follow while you
            cook. Cook Along keeps things clear and practical so you can learn the basics and cook
            simple meals step by step without the extra stress.
          </p>
        </section>
      </div>
    </main>
  )
}

export default About

