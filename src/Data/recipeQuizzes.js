// Five multiple-choice questions per recipe (keyed by recipe id) for retention checks.

const recipeQuizzes = {
  1: [
    {
      question: 'Before you pour the egg and Parmesan mixture over the pasta, what should you do with the pan?',
      options: ['Keep it on high heat', 'Remove it from the heat', 'Add a cup of cold water', 'Turn off the stove and add ice'],
      correctIndex: 1
    },
    {
      question: 'Which ingredient is the classic salty, crispy meat in this carbonara?',
      options: ['Turkey slices', 'Pancetta', 'Tofu', 'Shrimp'],
      correctIndex: 1
    },
    {
      question: 'What mainly makes the sauce creamy?',
      options: ['Heavy cream only', 'The eggs and Parmesan tossed with hot pasta', 'Butter and flour roux', 'Milk and cornstarch'],
      correctIndex: 1
    },
    {
      question: 'When do you add the minced garlic?',
      options: ['Before the water boils', 'After the pancetta is crispy, for about a minute', 'Only after plating', 'Never in carbonara'],
      correctIndex: 1
    },
    {
      question: 'About how long does this recipe take?',
      options: ['10 minutes', '30 minutes', '90 minutes', '5 minutes'],
      correctIndex: 1
    }
  ],
  2: [
    {
      question: 'Right after you boil the macaroni, what do you do?',
      options: ['Add cheese to the dry pot', 'Drain and set it aside', 'Blend it', 'Bake it immediately'],
      correctIndex: 1
    },
    {
      question: 'The “roux” starts with butter whisked with what?',
      options: ['Sugar', 'Flour', 'Baking powder', 'Corn syrup'],
      correctIndex: 1
    },
    {
      question: 'When should you pour in the milk?',
      options: ['Before the butter melts', 'Slowly while whisking after the butter–flour base', 'Only after baking', 'Never—mac and cheese has no milk'],
      correctIndex: 1
    },
    {
      question: 'When do you stir in the shredded cheese?',
      options: ['After the sauce has thickened, on lower heat', 'Before adding milk', 'While the pasta is still dry in the box', 'After freezing'],
      correctIndex: 0
    },
    {
      question: 'About how long does this recipe take?',
      options: ['15 minutes', '45 minutes', '2 hours', '5 minutes'],
      correctIndex: 1
    }
  ],
  3: [
    {
      question: 'What goes into the bowl sauce for the salmon bowl?',
      options: ['Ketchup and mayo only', 'Soy sauce, sesame oil, honey, and garlic', 'BBQ sauce and cola', 'Just water'],
      correctIndex: 1
    },
    {
      question: 'The rice should be…',
      options: ['Raw when you assemble the bowl', 'Cooked before you build the bowl', 'Replaced with pasta only', 'Skipped entirely'],
      correctIndex: 1
    },
    {
      question: 'How do you know the salmon is done?',
      options: ['It’s still translucent in the middle', 'Cooked through and flaky', 'Only the skin is hot', 'It floats'],
      correctIndex: 1
    },
    {
      question: 'How should you cut the avocado, cucumber, and carrot?',
      options: ['Whole, uncut', 'Thin slices or pieces for the bowl', 'Blended before cooking salmon', 'Only the carrot—no other veggies'],
      correctIndex: 1
    },
    {
      question: 'What is a typical garnish at the end?',
      options: ['Chocolate shavings', 'Green onions and sesame seeds', 'Powdered sugar', 'Pickled ginger only'],
      correctIndex: 1
    }
  ],
  4: [
    {
      question: 'Why do you reserve some pasta water?',
      options: ['To drink later', 'To loosen the sauce and make the pasta glossy', 'To cool the pasta forever', 'To throw away'],
      correctIndex: 1
    },
    {
      question: 'When cooking the garlic in butter, what should you avoid?',
      options: ['Letting it get fragrant', 'Burning it—keep it pale and fragrant', 'Using butter', 'Using a pan'],
      correctIndex: 1
    },
    {
      question: 'What is the main rich flavor base besides garlic?',
      options: ['Coconut oil only', 'Butter', 'Soy sauce', 'Vinegar'],
      correctIndex: 1
    },
    {
      question: 'About how long is this recipe?',
      options: ['45 minutes', '15 minutes', '3 hours', '60 minutes'],
      correctIndex: 1
    },
    {
      question: 'What do you stir in near the end (besides salt and pepper)?',
      options: ['Only ketchup', 'Grated Parmesan', 'Raw eggs', 'A cup of flour'],
      correctIndex: 1
    }
  ],
  5: [
    {
      question: 'About how long do you sear the chicken per side?',
      options: ['30 seconds', '4–5 minutes until golden', '25 minutes without flipping', 'You don’t sear it'],
      correctIndex: 1
    },
    {
      question: 'After searing, what do you add on medium heat?',
      options: ['Cold broth only', 'Butter, lemon zest, and lemon juice', 'Raw flour only', 'Ice cubes'],
      correctIndex: 1
    },
    {
      question: 'What does the broth help you do in the pan?',
      options: ['Replace the chicken', 'Scrape up browned bits and form a simple sauce', 'Make it soup only', 'Freeze the pan'],
      correctIndex: 1
    },
    {
      question: 'What should you do to the chicken before cooking?',
      options: ['Soak in soda', 'Pat dry and season with salt and pepper', 'Don’t season', 'Only oil, no salt'],
      correctIndex: 1
    },
    {
      question: 'About how long does this recipe take?',
      options: ['10 minutes', '25 minutes', '2 hours', '5 minutes'],
      correctIndex: 1
    }
  ],
  6: [
    {
      question: 'For fried rice, leftover rice is often best because…',
      options: ['It’s drier and fries without turning mushy', 'It must be frozen solid', 'Raw rice works the same', 'You should only use instant oatmeal'],
      correctIndex: 0
    },
    {
      question: 'What do you do with the eggs first?',
      options: ['Scramble them and set aside', 'Crack them raw on top at the end', 'Boil them whole in the rice', 'Skip eggs'],
      correctIndex: 0
    },
    {
      question: 'About how long do you sauté the garlic and vegetables?',
      options: ['2–3 minutes', '45 minutes', 'No cooking—raw only', '10 seconds only'],
      correctIndex: 0
    },
    {
      question: 'When do soy sauce and sesame oil go in?',
      options: ['Before the rice hits the pan', 'When you combine everything with the eggs', 'Before cracking eggs', 'Never'],
      correctIndex: 1
    },
    {
      question: 'Green onions are usually added…',
      options: ['At the beginning with raw rice', 'On top at the end', 'Only before buying rice', 'Never'],
      correctIndex: 1
    }
  ],
  7: [
    {
      question: 'About how long should the crushed tomatoes simmer?',
      options: ['8–10 minutes', '1 minute', '60 minutes uncovered always', 'They should never cook'],
      correctIndex: 0
    },
    {
      question: 'When is the cream added?',
      options: ['Before tomatoes', 'After the tomato sauce simmers', 'Only before garlic', 'Cream is not used'],
      correctIndex: 1
    },
    {
      question: 'How long do you sauté the garlic in oil (first)?',
      options: ['About 30 seconds', '30 minutes', 'You never cook garlic', 'Only after cream'],
      correctIndex: 0
    },
    {
      question: 'Sugar in the tomato sauce is…',
      options: ['Optional to balance acidity', 'Always 1 cup required', 'Only for dessert', 'Replaced by vinegar only'],
      correctIndex: 0
    },
    {
      question: 'Why might you add a splash of reserved pasta water?',
      options: ['To make it sweeter', 'If the sauce needs loosening when tossing', 'To cool the pasta only', 'To replace all sauce'],
      correctIndex: 1
    }
  ],
  8: [
    {
      question: 'What makes the dressing?',
      options: ['Lemon juice, olive oil, salt, and pepper', 'Heavy cream only', 'Soy sauce and honey only', 'No dressing'],
      correctIndex: 0
    },
    {
      question: 'How should you add the avocado?',
      options: ['Mash it with the can liquid', 'Dice it and gently fold it in', 'Deep-fry it first', 'Only after baking the salad'],
      correctIndex: 1
    },
    {
      question: 'What should you do with canned chickpeas first?',
      options: ['Drain and rinse', 'Use with all the can liquid only', 'Toast them whole in shell', 'Skip chickpeas'],
      correctIndex: 0
    },
    {
      question: 'Which onion prep matches the recipe?',
      options: ['Half a red onion, thinly sliced', 'A whole onion dropped in whole', 'Only onion powder, no fresh onion', 'Pickled onions only, no fresh'],
      correctIndex: 0
    },
    {
      question: 'How is the salad served?',
      options: ['Baked 40 minutes', 'Tossed gently and served fresh', 'Blended into soup', 'Deep-fried'],
      correctIndex: 1
    }
  ],
  9: [
    {
      question: 'What temperature do you preheat the oven to?',
      options: ['300°F (150°C)', '425°F (220°C)', '200°F (95°C)', 'Broil only, no preheat'],
      correctIndex: 1
    },
    {
      question: 'About how long do the vegetables roast?',
      options: ['25–30 minutes, flipping halfway', '5 minutes total', '3 hours covered', 'They are never roasted'],
      correctIndex: 0
    },
    {
      question: 'How do you apply the oil?',
      options: ['Drizzle on the pan and toss vegetables to coat', 'No oil', 'Only spray the oven walls', 'Submerge in a deep fryer'],
      correctIndex: 0
    },
    {
      question: 'What is one way to serve them?',
      options: ['Only as dessert with frosting', 'As a side or over rice/grains', 'Raw only, never cooked', 'Blended into a smoothie only'],
      correctIndex: 1
    },
    {
      question: 'What pan do you use?',
      options: ['A sheet pan', 'A small espresso cup', 'A wok with lid only', 'A blender jar'],
      correctIndex: 0
    }
  ],
  10: [
    {
      question: 'What do you mix the tuna with (besides salt and pepper)?',
      options: ['Mayo (or Greek yogurt)', 'Maple syrup', 'Flour and water paste', 'Orange juice only'],
      correctIndex: 0
    },
    {
      question: 'How do you assemble before cooking?',
      options: ['Cheese under the bread only', 'Tuna on bread, cheese on top', 'Tuna in the pan alone', 'Bread with no filling'],
      correctIndex: 1
    },
    {
      question: 'Where does the butter go?',
      options: ['Only inside the tuna can', 'On the outside of the bread for grilling', 'On the ceiling', 'Nowhere'],
      correctIndex: 1
    },
    {
      question: 'About how long per side in the pan?',
      options: ['3–4 minutes until golden and melted', '30 seconds', '20 minutes covered', 'You never cook it'],
      correctIndex: 0
    },
    {
      question: 'Mustard in the mix is…',
      options: ['Optional', 'Required—1 cup', 'Forbidden', 'Only added after freezing'],
      correctIndex: 0
    }
  ]
}

export function getRecipeQuiz(recipeId) {
  return recipeQuizzes[recipeId] ?? []
}
