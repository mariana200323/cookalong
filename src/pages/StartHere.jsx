import CookAlongLogo from '../assets/CookAlong.png'
import SearchPopover from '../components/SearchPopover'
import './StartHere.css'

function StartHere({ searchTerm, setSearchTerm, goHome, goToAbout, goToRecipes }) {
  return (
    <main className="start-page">
      <div className="start-content">
        <header className="nav-bar">
          <div className="logo-container">
            <img src={CookAlongLogo} className="cook-along-logo" alt="Cook Along Logo" />
          </div>

          <nav className="nav-links">
            <a href="#" onClick={(e) => { e.preventDefault(); goHome(); }}>Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); goToAbout(); }}>About</a>
            <a href="#" onClick={(e) => { e.preventDefault(); goToRecipes(); }}>Recipes</a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-current="page" className="active-link">Start Here</a>
            <SearchPopover
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSubmitSearch={goToRecipes}
            />
          </nav>
        </header>

        <section className="start-hero">
          <p className="start-tag">START HERE</p>
          <h1>How to use Cook Along</h1>
          <p className="start-subtitle">
            A quick walkthrough so you can find a recipe and cook with confidence.
          </p>

          <div className="start-cta">
            <button className="primary-cta" onClick={goToRecipes}>Start cooking</button>
            <button className="secondary-cta" onClick={goHome}>Back to home</button>
          </div>
        </section>

        <section className="steps-grid" aria-label="Steps to use the app">
          <div className="step-card">
            <div className="step-number">1</div>
            <h2>Find a recipe</h2>
            <p>
              From <strong>Home</strong>, use the search to look up something you’re craving, or
              click a featured category.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h2>Browse the list</h2>
            <p>
              On the <strong>Recipes</strong> page, hover a card to see time, difficulty, and ingredients.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h2>Open Cook Along mode</h2>
            <p>
              Click any recipe to open the step-by-step guide. You’ll see <strong>Step 1 of N</strong> at
              the top.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">4</div>
            <h2>Use the Voice Guide</h2>
            <p>
              Tap <strong>Play Voice Guide</strong> to hear the current step. You can also choose a voice,
              adjust speed, and stop audio anytime.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">5</div>
            <h2>Navigate quickly</h2>
            <p>
              Use the buttons or your keyboard: <strong>←</strong> / <strong>→</strong> to change steps,
              <strong>Enter</strong> to play, and <strong>Esc</strong> to stop.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">6</div>
            <h2>Cook with confidence</h2>
            <p>
              Keep the guide open while you cook—less scrolling, less stress, and more focus on the food.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default StartHere

