// App.jsx controls the main page navigation for the app.
// Right now it can switch between Home and Recipes.
// Later, it can also switch to RecipeStep when a recipe is selected.
import { useState } from 'react'
import Home from "./pages/Home"
import Recipes from "./pages/Recipes"
import RecipeStep from "./pages/RecipeStep"

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <>  
      {currentPage === 'home' && (
        <Home
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          goToRecipes={() => setCurrentPage('recipes')}
        />
      )}

      {currentPage === 'recipes' && (
        <Recipes
          searchTerm={searchTerm}
          goHome={() => {
            setCurrentPage('home')
            setSelectedRecipe(null)
          }}
          goToRecipe={(recipe) => {
            setSelectedRecipe(recipe)
            setCurrentPage('step')
          }}
        />
      )}

      {currentPage === 'step' && selectedRecipe && (
        <RecipeStep
          recipe={selectedRecipe}
          goBack={() => {
            setCurrentPage('recipes')
            setSelectedRecipe(null)
          }}
        />
      )}
    </>
  )
}

export default App;
