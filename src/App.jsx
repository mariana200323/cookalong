// App.jsx controls the main page navigation for the app.
// Right now it can switch between Home and Recipes.
// Later, it can also switch to RecipeStep when a recipe is selected.
import { useState } from 'react'
import Home from "./pages/Home"
import Recipes from "./pages/Recipes"
import RecipeStep from "./pages/RecipeStep"
import About from "./pages/About"
import StartHere from "./pages/StartHere"

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [stepBackTarget, setStepBackTarget] = useState('recipes')

  return (
    <>  
      {currentPage === 'home' && (
        <Home
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          goToRecipes={() => setCurrentPage('recipes')}
          goToAbout={() => setCurrentPage('about')}
          goToStartHere={() => setCurrentPage('start')}
          goToRecipe={(recipe) => {
            setSelectedRecipe(recipe)
            setStepBackTarget('home')
            setCurrentPage('step')
          }}
        />
      )}

      {currentPage === 'recipes' && (
        <Recipes
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          goHome={() => {
            setCurrentPage('home')
            setSelectedRecipe(null)
          }}
          goToAbout={() => setCurrentPage('about')}
          goToRecipes={() => setCurrentPage('recipes')}
          goToStartHere={() => setCurrentPage('start')}
          goToRecipe={(recipe) => {
            setSelectedRecipe(recipe)
            setStepBackTarget('recipes')
            setCurrentPage('step')
          }}
        />
      )}

      {currentPage === 'step' && selectedRecipe && (
        <RecipeStep
          recipe={selectedRecipe}
          goBack={() => {
            if (stepBackTarget === 'home') {
              setCurrentPage('home')
            } else {
              setCurrentPage('recipes')
            }
            setSelectedRecipe(null)
          }}
        />
      )}

      {currentPage === 'about' && (
        <About
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          goHome={() => {
            setCurrentPage('home')
            setSelectedRecipe(null)
          }}
          goToRecipes={() => {
            setCurrentPage('recipes')
            setSelectedRecipe(null)
          }}
          goToStartHere={() => setCurrentPage('start')}
        />
      )}

      {currentPage === 'start' && (
        <StartHere
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          goHome={() => {
            setCurrentPage('home')
            setSelectedRecipe(null)
          }}
          goToAbout={() => setCurrentPage('about')}
          goToRecipes={() => {
            setCurrentPage('recipes')
            setSelectedRecipe(null)
          }}
        />
      )}
    </>
  )
}

export default App;
