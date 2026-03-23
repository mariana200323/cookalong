// App.jsx controls the main page navigation for the app.
// Right now it can switch between Home and Recipes.
// Later, it can also switch to RecipeStep when a recipe is selected.
import { useState } from 'react'
import Home from "./pages/Home"
import Recipes from "./pages/Recipes"

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
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
          goHome={() => setCurrentPage('home')}
        />
      )}
    </>
  )
}

export default App;