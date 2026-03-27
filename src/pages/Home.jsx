/*Home.jsx is the landing page for Cook Along.
It should introduce the app, show the logo, and let users search for recipes.
This page should feel polished and welcoming.*/
import { useState } from 'react'
import CookAlongLogo from '../assets/CookAlong.png'
import SearchBar from '../components/SearchBar'
import featuredDish from '../assets/Carbonara.jpg'
import './Home.css'

function Home({ searchTerm, setSearchTerm, goToRecipes }) {
    const [showSearch, setShowSearch] = useState(false)
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
                    <a href="#">About</a>
                    <a href="#" onClick={goToRecipes}>Recipes</a>
                    <a href="#">Start Here</a>
                    <button className="search-icon" onClick={() => setShowSearch(!showSearch)} >🔍</button>
                </nav>
            </header>

            {showSearch && (
                <div className="search-bar-container">
                    <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={goToRecipes}
                    />
                </div>
            )}

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
                    <div className="category-card">
                        <img src={featuredDish} alt="Quick and easy recipes" />
                        <div className="category-label">QUICK AND EASY</div>
                    </div>

                    <div className="category-card">
                        <img src={featuredDish} alt="Most popular recipes" />
                        <div className="category-label">MOST POPULAR</div>
                    </div>

                    <div className="category-card">
                        <img src={featuredDish} alt="Healthy recipes" />
                        <div className="category-label">HEALTHY</div>
                    </div>

                    <div className="category-card">
                        <img src={featuredDish} alt="Spring recipes" />
                        <div className="category-label">SPRING</div>
                    </div>
                </div>
            </section>
        </div>
    </main>
  )
}

export default Home