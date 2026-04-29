/*Home.jsx is the landing page for Cook Along.
It should introduce the app, show the logo, and let users search for recipes.
This page should feel polished and welcoming.*/
import recipes from '../Data/recipes'
import CookAlongLogo from '../assets/CookAlong.png'
import SearchPopover from '../components/SearchPopover'
import featuredDish from '../assets/Carbonara.jpg'
import featuredDish1 from '../assets/Macaroni-And-Cheese.jpg'
import featuredDish2 from '../assets/SalmonBowl.jpg'
import springDish from '../assets/AvocadoChickpeaSalad.jpg'
import './Home.css'

function Home({ searchTerm, setSearchTerm, goToRecipes, goToAbout, goToStartHere, goToRecipe }) {
    const quickRecipes = recipes.filter(
        (recipe) => recipe.category === "Quick and Easy" ||
        recipe.category === "Most Popular" ||
        recipe.category === "Healthy"
    )
    const springRecipe =
        recipes.find((recipe) => recipe.title === "Avocado Chickpea Salad") || recipes[0]
 
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
                    <SearchPopover
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      onSubmitSearch={goToRecipes}
                    />
                </nav>
            </header>

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