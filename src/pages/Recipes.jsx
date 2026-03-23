/*Recipes.jsx is the page for displaying available recipes.
 It should show a list of recipes and allow users to browse and select one.
This page should feel polished and welcoming.*/
import recipesData from '../Data/recipes'
import RecipeCard from '../components/RecipeCard'
import './Recipes.css'

function Recipes({ searchTerm, goHome }) {
  const filteredRecipes = recipesData.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="recipes-page">
      <header className="back-button">
        <button onClick={goHome}>← Back</button>
      </header>
      <section className="recipes-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found. Try a different search term.</p>
        )}
      </section>
    </main>
  )
}

export default Recipes;