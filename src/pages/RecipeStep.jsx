// RecipeStep.jsx — step-by-step view for a selected recipe.
function RecipeStep({ recipe, goBack }) {
  if (!recipe) return null

  return (
    <main className="recipes-page">
      <div className="recipes-content">
        <header className="nav-bar">
          <nav className="nav-links">
            <a href="#" onClick={goBack}>← Back to recipes</a>
          </nav>
        </header>
        <section className="recipes-header">
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
        </section>
        <section className="recipes-grid">
          <ol>
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  )
}

export default RecipeStep
