// RecipeStep.jsx displays the step-by-step instructions for a recipe.
// It should show the current step, the instruction text, and any relevant images or videos.
// It should also provide navigation controls to move between steps.

function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <img src={recipe.image} alt={recipe.title} className="recipe-card-image" />
            <h3>{recipe.title}</h3>
            <p>Time: {recipe.time} mins</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>{recipe.description}</p>
        </div>
    );
}

export default RecipeCard;