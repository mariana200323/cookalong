// recipes.js stores the recipe data used by the app.
// This includes title, image, ingredients, cooking time, difficulty, and steps.
import Mac_and_CheeseImg from '../assets/Macaroni-And-Cheese.jpg'
import CarbonaraImg from '../assets/Carbonara.jpg'
import SalmonBowlImg from '../assets/SalmonBowl.jpg'
import GarlicButterPastaImg from '../assets/GarlicButterPasta.jpg'
import OnePanLemonPepperChickenImg from '../assets/OnePanLemonPepperChicken.jpg'
import VeggieFriedRiceImg from '../assets/VeggieFriedRice.jpg'
import CreamyTomatoPastaImg from '../assets/CreamyTomatoPasta.jpg'
import AvocadoChickpeaSaladImg from '../assets/AvocadoChickpeaSalad.jpg'
import SheetPanRoastedVeggiesImg from '../assets/SheetPanRoastedVeggies.jpg'
import EasyTunaMeltImg from '../assets/easytunameltrecipe.jpg'

const recipes = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        image: CarbonaraImg,
        description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
        time: 30,
        difficulty: "Medium",
        category: "Most Popular",
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
    },
    {
        id: 2,
        title: "Homemade Macaroni & Cheese",
        image: Mac_and_CheeseImg,
        description: "macaroni pasta combined with a rich, creamy cheese sauce—most commonly cheddar",
        time: 45,
        difficulty: "Easy",
        category: "Quick and Easy",
        ingredients: [
            "Elbow macaroni",
            "Butter",
            "Flour",
            "Milk (or heavy cream)",
            "shredded cheese"
        ],
        steps: ["First, bring a pot of salted water to a boil. Add the macaroni and cook it until tender, then drain and set it aside.",
            "Next, in a saucepan over medium heat, melt the butter. Once melted, add the flour and whisk it together for about one minute to create a smooth base.",
            "Slowly pour in the milk while whisking continuously. Keep stirring until the sauce thickens and becomes creamy.",
            "Now, lower the heat and add the shredded cheese. Stir until the cheese is fully melted and the sauce is smooth.",
            "Add the cooked macaroni into the cheese sauce and mix everything together until well coated.",
            "Let it cook for another minute or two, then turn off the heat. Your mac and cheese is ready to serve—enjoy!"]
    },

    {
        id: 3,
        title: "Salmon Rice Bowl",
        image: SalmonBowlImg,
        description: "A healthy and flavorful salmon bowl with rice, avocado, and fresh toppings.",
        time: 25,
        difficulty: "Easy",
        category: "Healthy",
        ingredients: [
            "2 salmon fillets",
            "2 cups cooked rice",
            "1 avocado",
            "1 cucumber",
            "1 carrot",
            "2 tbsp soy sauce",
            "1 tbsp sesame oil",
            "1 tsp honey",
            "1 tsp garlic (minced)",
            "Green onions",
            "Sesame seeds"
    ],
        steps: [
            "Cook the rice according to package instructions and set aside.",
            "Season the salmon with salt and pepper, then cook in a pan over medium heat until fully cooked and flaky.",
            "In a small bowl, mix soy sauce, sesame oil, honey, and minced garlic to create the sauce.",
            "Slice the avocado, cucumber, and carrot into thin pieces.",
            "Place rice in a bowl, then add the cooked salmon on top.",
            "Arrange the vegetables around the bowl.",
            "Drizzle the sauce over everything.",
            "Garnish with green onions and sesame seeds, then serve."
        ]
    }
    ,
    {
        id: 4,
        title: "Garlic Butter Pasta",
        image: GarlicButterPastaImg,
        description: "A fast, cozy pasta with garlic, butter, and Parmesan—ready in minutes.",
        time: 15,
        difficulty: "Easy",
        category: "Quick and Easy",
        ingredients: [
            "200g spaghetti (or any pasta)",
            "3 tbsp butter",
            "3 cloves garlic",
            "1/4 cup grated Parmesan",
            "Salt and pepper",
            "Optional: chili flakes, parsley"
        ],
        steps: [
            "Cook pasta in salted water until al dente. Reserve 1/2 cup pasta water, then drain.",
            "Melt butter in a pan over medium-low heat. Add minced garlic and cook for 30–60 seconds until fragrant (not browned).",
            "Add drained pasta to the pan and toss. Add a splash of reserved pasta water to loosen and make it glossy.",
            "Stir in Parmesan, season with salt and pepper, and toss again.",
            "Finish with chili flakes or parsley if you’d like, then serve."
        ]
    },
    {
        id: 5,
        title: "One-Pan Lemon Pepper Chicken",
        image: OnePanLemonPepperChickenImg,
        description: "Juicy chicken with lemon, pepper, and a simple pan sauce—minimal cleanup.",
        time: 25,
        difficulty: "Easy",
        category: "Most Popular",
        ingredients: [
            "2 chicken breasts (or thighs)",
            "1 tbsp olive oil",
            "1 tbsp butter",
            "1 lemon (juice + zest)",
            "1 tsp black pepper",
            "1/2 tsp salt",
            "1/2 cup chicken broth (or water)",
            "Optional: garlic, parsley"
        ],
        steps: [
            "Pat chicken dry and season with salt and pepper.",
            "Heat olive oil in a pan over medium-high heat. Sear chicken 4–5 minutes per side until golden and cooked through.",
            "Lower heat to medium. Add butter, lemon zest, and lemon juice.",
            "Pour in broth and scrape up browned bits. Simmer 2–3 minutes to slightly thicken.",
            "Spoon sauce over chicken, garnish with parsley if you have it, and serve."
        ]
    },
    {
        id: 6,
        title: "Veggie Fried Rice",
        image: VeggieFriedRiceImg,
        description: "A quick rice bowl packed with veggies—great for leftovers and weeknights.",
        time: 20,
        difficulty: "Easy",
        category: "Quick and Easy",
        ingredients: [
            "2 cups cooked rice (cold works best)",
            "2 eggs",
            "1 cup mixed vegetables (peas/carrots/corn)",
            "2 tbsp soy sauce",
            "1 tbsp sesame oil (or vegetable oil)",
            "2 green onions",
            "1 clove garlic",
            "Salt and pepper"
        ],
        steps: [
            "Heat a pan and scramble the eggs. Remove to a plate.",
            "Add oil, then sauté garlic and vegetables for 2–3 minutes.",
            "Add rice and break it up with a spatula. Cook 3–4 minutes until hot.",
            "Stir in soy sauce, sesame oil, and the scrambled eggs.",
            "Top with sliced green onions and serve."
        ]
    },
    {
        id: 7,
        title: "Creamy Tomato Pasta",
        image: CreamyTomatoPastaImg,
        description: "Smooth tomato sauce with a splash of cream for a restaurant-style pasta.",
        time: 25,
        difficulty: "Easy",
        category: "Most Popular",
        ingredients: [
            "200g pasta",
            "1 tbsp olive oil",
            "2 cloves garlic",
            "1 can crushed tomatoes",
            "1/4 cup cream (or milk)",
            "1 tsp sugar (optional)",
            "Salt and pepper",
            "Optional: basil, Parmesan"
        ],
        steps: [
            "Cook pasta in salted water until al dente. Reserve 1/2 cup pasta water, then drain.",
            "Warm olive oil in a pan and sauté garlic for 30 seconds.",
            "Add crushed tomatoes, salt, pepper, and sugar if needed. Simmer 8–10 minutes.",
            "Stir in cream and simmer 1–2 minutes.",
            "Toss pasta with sauce, add a splash of pasta water if needed, and serve with basil/Parmesan."
        ]
    },
    {
        id: 8,
        title: "Avocado Chickpea Salad",
        image: AvocadoChickpeaSaladImg,
        description: "A fresh, healthy salad with chickpeas, avocado, and a bright lemon dressing.",
        time: 10,
        difficulty: "Easy",
        category: "Healthy",
        ingredients: [
            "1 can chickpeas (drained/rinsed)",
            "1 avocado",
            "1 cucumber (chopped)",
            "1/2 red onion (thinly sliced)",
            "1 lemon (juice)",
            "1 tbsp olive oil",
            "Salt and pepper",
            "Optional: feta, herbs"
        ],
        steps: [
            "Add chickpeas, cucumber, and onion to a bowl.",
            "Dice avocado and gently fold it in.",
            "Whisk lemon juice, olive oil, salt, and pepper, then pour over the salad.",
            "Toss gently and taste for seasoning.",
            "Top with feta or herbs if you want, then serve."
        ]
    },
    {
        id: 9,
        title: "Sheet Pan Roasted Veggies",
        image: SheetPanRoastedVeggiesImg,
        description: "Colorful roasted vegetables with crispy edges—easy side or meal prep base.",
        time: 35,
        difficulty: "Easy",
        category: "Healthy",
        ingredients: [
            "2 cups broccoli florets",
            "1 bell pepper (sliced)",
            "1 zucchini (sliced)",
            "1 red onion (wedges)",
            "2 tbsp olive oil",
            "1 tsp salt",
            "1/2 tsp pepper",
            "Optional: garlic powder, paprika"
        ],
        steps: [
            "Preheat oven to 425°F (220°C).",
            "Add chopped vegetables to a sheet pan and drizzle with olive oil.",
            "Season with salt, pepper, and any optional spices, then toss to coat.",
            "Roast 25–30 minutes, flipping halfway, until browned and tender.",
            "Serve as a side or over rice/grains."
        ]
    },
    {
        id: 10,
        title: "Easy Tuna Melt",
        image: EasyTunaMeltImg,
        description: "Toasty, melty, and quick—perfect lunch with pantry staples.",
        time: 12,
        difficulty: "Easy",
        category: "Quick and Easy",
        ingredients: [
            "1 can tuna (drained)",
            "2 tbsp mayo (or Greek yogurt)",
            "1 tsp mustard (optional)",
            "Salt and pepper",
            "2 slices bread",
            "2 slices cheese",
            "Butter (for the pan)"
        ],
        steps: [
            "Mix tuna with mayo, mustard (optional), salt, and pepper.",
            "Spread tuna mixture on bread and top with cheese.",
            "Butter the outside of the bread and cook in a pan over medium heat.",
            "Cook 3–4 minutes per side until golden and cheese is melted.",
            "Slice and serve warm."
        ]
    }
];

export default recipes;
