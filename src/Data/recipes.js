// recipes.js stores the recipe data used by the app.
// This includes title, image, ingredients, cooking time, difficulty, and steps.
const recipes = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        image: "../assets/Carbonara.jpg",
        description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
        time: 30,
        difficulty: "Medium",
        ingredients: [
            "200g spaghetti",
            "100g pancetta",
            "2 large eggs",
            "50g grated Parmesan cheese",
            "2 cloves garlic",
            "Salt and pepper"
        ],
        steps: [
            "Cook the spaghetti in salted boiling water until al dente.",
            "In a pan, cook the pancetta until crispy. Add minced garlic and cook for 1 minute.",
            "In a bowl, whisk together the eggs and grated Parmesan cheese.",
            "Drain the spaghetti and add it to the pan with pancetta. Remove from heat.",
            "Quickly pour the egg mixture over the pasta and toss to combine. The residual heat will cook the eggs and create a creamy sauce.",
            "Season with salt and pepper to taste. Serve immediately."
        ]
    }

];

export default recipes;