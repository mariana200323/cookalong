/*Recipes.jsx is the page for displaying available recipes.
 It should show a list of recipes and allow users to browse and select one.
This page should feel polished and welcoming.*/
import CookAlongLogo from '../assets/CookAlong.png'
import { useState } from 'react'
import { useEffect } from 'react'
import recipesData from '../Data/recipes'
import './Recipes.css'

function Recipes({ searchTerm, goHome, goToAbout, goToStartHere, goToRecipe }) {
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const filteredRecipes = recipesData.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="recipes-page">
      <div className="recipes-content">

        <header className="nav-bar">
          <div className="logo-container">
            <img src={CookAlongLogo} className="cook-along-logo" alt="Cook Along Logo" />
          </div>
          <nav className="nav-links">
            <a href="#" onClick={(e) => { e.preventDefault(); goHome(); }}>Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); goToAbout(); }}>About</a>
            <a href="#">Recipes</a>
            <a href="#" onClick={(e) => { e.preventDefault(); goToStartHere(); }}>Start Here</a>
          </nav>
        </header>

        <section className="recipes-header">
          <h1>All Recipes</h1>
          <p>Browse our collection and find something delicious to cook.</p>
        </section>

        <section className="recipes-grid">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe, idx) => (
              <div
                key={recipe.id}
                className="recipe-card"
                style={{ animationDelay: `${idx * 35}ms` }}
                onMouseEnter={() => setHoveredId(recipe.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => goToRecipe(recipe)}
              >
                <div className="recipe-card-image-wrapper">
                  <img src={recipe.image} alt={recipe.title} className="recipe-card-image" />

                  {hoveredId === recipe.id && (
                    <div className="recipe-hover-overlay">
                      <p><span>⏱ Time:</span> {recipe.time} mins</p>
                      <p><span> Difficulty:</span> {recipe.difficulty}</p>
                      <div className="overlay-ingredients">
                        <p><span> Ingredients:</span></p>
                        <ul>
                          {recipe.ingredients.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <h3>{recipe.title}</h3>
                <p className="recipe-description">{recipe.description}</p>
              </div>
            ))
          ) : (
            <p>No recipes found. Try a different search term.</p>
          )}
        </section>

      </div>
    </main>
  )
}

export default Recipes;
