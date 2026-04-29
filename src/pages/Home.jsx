/*Home.jsx is the landing page for Cook Along.
It should introduce the app, show the logo, and let users search for recipes.
This page should feel polished and welcoming.*/
import { useEffect, useRef, useState } from 'react'
import recipes from '../Data/recipes'
import CookAlongLogo from '../assets/CookAlong.png'
import SearchBar from '../components/SearchBar'
import featuredDish from '../assets/Carbonara.jpg'
import featuredDish1 from '../assets/Macaroni-And-Cheese.jpg'
import featuredDish2 from '../assets/SalmonBowl.jpg'
import springDish from '../assets/AvocadoChickpeaSalad.jpg'
import './Home.css'

function Home({ searchTerm, setSearchTerm, goToRecipes, goToAbout, goToStartHere, goToRecipe }) {
    const [showSearch, setShowSearch] = useState(false)
    const searchWrapRef = useRef(null)
    const searchButtonRef = useRef(null)
    const quickRecipes = recipes.filter(
        (recipe) => recipe.category === "Quick and Easy" ||
        recipe.category === "Most Popular" ||
        recipe.category === "Healthy"
    )
    const springRecipe =
        recipes.find((recipe) => recipe.title === "Avocado Chickpea Salad") || recipes[0]

    useEffect(() => {
        if (!showSearch) return

        const handlePointerDown = (e) => {
            const wrap = searchWrapRef.current
            const button = searchButtonRef.current
            const target = e.target
            if (!wrap || !button) return

            if (wrap.contains(target) || button.contains(target)) return
            setShowSearch(false)
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setShowSearch(false)
        }

        window.addEventListener('pointerdown', handlePointerDown)
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('pointerdown', handlePointerDown)
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [showSearch])
 
    return (
    
    <main className="home-page">
        <div className="home-content">
            <header className="nav-bar">
                <div className="logo-container">
                    <img
                    src={CookAlongLogo}
                    className="cook-along-logo"
                    alt="Cook Along Logo"
                    />
                </div>

                <nav className="nav-links">
                    <a href="#">Home</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); goToAbout(); }}>About</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); goToRecipes(); }}>Recipes</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); goToStartHere(); }}>Start Here</a>
                    <button
                      type="button"
                      className="search-icon"
                      aria-label={showSearch ? "Close search" : "Open search"}
                      aria-expanded={showSearch}
                      onClick={() => setShowSearch(!showSearch)}
                      ref={searchButtonRef}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M10 4a6 6 0 104.472 10.03l3.749 3.75a1 1 0 001.414-1.415l-3.75-3.749A6 6 0 0010 4zm0 2a4 4 0 110 8 4 4 0 010-8z" />
                      </svg>
                    </button>
                </nav>
            </header>

            <div
                className={`search-popover ${showSearch ? 'open' : ''}`}
                ref={searchWrapRef}
                aria-hidden={!showSearch}
            >
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={() => {
                        setShowSearch(false)
                        goToRecipes()
                    }}
                />
                <div className="search-hint">
                    Tip: press <strong>Enter</strong> to search.
                </div>
            </div>

            <section className="info-section">
                <div className="welcome-section">
                    <h1>Welcome to Cook Along!</h1>
                    <p> Discover delicious recipes and cooking tips. Find beginner-friendly
                    recipes and follow step-by-step guidance with voice support and timers.
                    </p>
                </div>

                <div className="featured-image">
                    <img src={featuredDish} alt="Featured dish" />
                </div>
            </section>

            <section className="featured-section">
                <h2>Popular Recipes</h2>
                <p>Explore our handpicked selection of popular recipes to get started.</p>
            </section>

            <section className="category-section">
                <p className="category-heading">
                    SIMPLE RECIPES MADE FOR <span>real, actual, everyday life.</span>
                </p>

                <div className="category-grid">
                    <div className="category-card" onClick={() => goToRecipe(quickRecipes[1])}>
                        <img src={featuredDish1} alt="Quick and easy recipes" />
                        <div className="category-label">QUICK AND EASY</div>
                    </div>

                    <div className="category-card" onClick={() => goToRecipe(quickRecipes[0])}>
                        <img src={featuredDish} alt="Most popular recipes" />
                        <div className="category-label">MOST POPULAR</div>
                    </div>

                    <div className="category-card" onClick={() => goToRecipe(quickRecipes[2])}>
                        <img src={featuredDish2} alt="Healthy recipes" />
                        <div className="category-label">HEALTHY</div>
                    </div>

                    <div className="category-card" onClick={() => goToRecipe(springRecipe)}>
                        <img src={springDish} alt="Spring recipes" />
                        <div className="category-label">SPRING</div>
                    </div>
                </div>
            </section>
        </div>
    </main>
  )
}

export default Home