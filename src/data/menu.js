const DRINK_OPTIONS = [
  { name: "Coca-Cola", priceDelta: 150 },
  { name: "Coca-Cola Zéro", priceDelta: 150 },
  { name: "Fanta", priceDelta: 150 },
  { name: "Sprite", priceDelta: 150 },
  { name: "Ice Tea", priceDelta: 150 },
  { name: "Oasis", priceDelta: 150 },
  { name: "Orangina", priceDelta: 150 },
];

const SAUCE_OPTIONS = [
  "Algérienne",
  "Mayonnaise",
  "Ketchup",
  "Biggy Burger",
  "Blanche",
  "Samouraï",
  "Andalouse",
  "Barbecue",
  "Harissa",
  "Poivre",
  "Hannibal",
];

const BOISSON_GROUP = {
  slug: "boisson",
  name: "Boisson 33cl (optionnelle)",
  type: "SINGLE",
  required: false,
  options: DRINK_OPTIONS,
};

const BURGER_SAUCES_GROUP = {
  slug: "sauces",
  name: "Sauces",
  type: "MULTIPLE",
  required: false,
  maxSelect: 2,
  options: SAUCE_OPTIONS.map((name) => ({ name, priceDelta: 0 })),
};

export const menuData = {
  categories: [
    {
      slug: "assiettes",
      name: "Salade Dwich & Assiettes",
      description: "Salade Dwich (avec boisson) et assiettes avec viandes au choix",
      emoji: "🥗",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
      products: [
        {
          slug: "salade-dwich",
          name: "Salade Dwich",
          description: "Poulet ou viande au choix, salade, tomate, oignons rouges, maïs, cranberry, graines",
          basePrice: 900,
          includesDrink: true,
          image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=600&q=80",
          optionGroups: [
            {
              slug: "viande-salade",
              name: "Choix de la viande",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Poulet", priceDelta: 0 },
                { name: "Kebab", priceDelta: 0 },
                { name: "Steak", priceDelta: 0 },
                { name: "Escalope", priceDelta: 0 }
              ]
            },
            BOISSON_GROUP
          ]
        },
        {
          slug: "assiette",
          name: "Assiette",
          description: "Crudités, frites et viandes au choix",
          basePrice: 1000,
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80",
          optionGroups: [
            {
              slug: "taille-assiette",
              name: "Nombre de viandes",
              type: "SINGLE",
              required: true,
              options: [
                { name: "1 viande", priceDelta: 0 },
                { name: "2 viandes", priceDelta: 200 },
                { name: "3 viandes", priceDelta: 400 }
              ]
            },
            {
              slug: "viandes-assiette",
              name: "Choix des viandes",
              type: "MULTIPLE",
              required: true,
              maxSelect: 3,
              options: [
                { name: "Kebab", priceDelta: 0 },
                { name: "Steak", priceDelta: 0 },
                { name: "Kefta", priceDelta: 0 },
                { name: "Tenders", priceDelta: 0 },
                { name: "Cordon bleu", priceDelta: 0 },
                { name: "Escalope", priceDelta: 0 },
                { name: "Curry", priceDelta: 0 },
                { name: "Tandoori", priceDelta: 0 },
                { name: "Merguez", priceDelta: 0 },
                { name: "Nuggets", priceDelta: 0 }
              ]
            },
            {
              slug: "sauces",
              name: "Sauces",
              type: "MULTIPLE",
              required: false,
              maxSelect: 2,
              options: [
                { name: "Algérienne", priceDelta: 0 },
                { name: "Mayonnaise", priceDelta: 0 },
                { name: "Ketchup", priceDelta: 0 },
                { name: "Biggy Burger", priceDelta: 0 },
                { name: "Blanche", priceDelta: 0 },
                { name: "Poivre", priceDelta: 0 },
                { name: "Samouraï", priceDelta: 0 },
                { name: "Hannibal", priceDelta: 0 },
                { name: "Andalouse", priceDelta: 0 },
                { name: "Barbecue", priceDelta: 0 },
                { name: "Harissa", priceDelta: 0 }
              ]
            },
            BOISSON_GROUP
          ]
        }
      ]
    },
    {
      slug: "tacos",
      name: "Nos Tacos",
      description: "Garnis de frites et de sauce fromagère",
      emoji: "🌮",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
      products: [
        {
          slug: "tacos",
          name: "Tacos",
          description: "Garni de frites et sauce fromagère",
          basePrice: 900,
          includesDrink: true,
          image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=600&q=80",
          optionGroups: [
            {
              slug: "taille-tacos",
              name: "Taille",
              type: "SINGLE",
              required: true,
              options: [
                { name: "M (1 viande)", priceDelta: 0 },
                { name: "L (2 viandes)", priceDelta: 200 },
                { name: "XL (3 viandes)", priceDelta: 400 }
              ]
            },
            {
              slug: "viandes-tacos",
              name: "Choix des viandes",
              type: "MULTIPLE",
              required: true,
              maxSelect: 3,
              options: [
                { name: "Kebab", priceDelta: 0 },
                { name: "Steak", priceDelta: 0 },
                { name: "Kefta", priceDelta: 0 },
                { name: "Tenders", priceDelta: 0 },
                { name: "Cordon bleu", priceDelta: 0 },
                { name: "Escalope", priceDelta: 0 },
                { name: "Curry", priceDelta: 0 },
                { name: "Tandoori", priceDelta: 0 },
                { name: "Merguez", priceDelta: 0 },
                { name: "Nuggets", priceDelta: 0 }
              ]
            },
            {
              slug: "sauces",
              name: "Sauces",
              type: "MULTIPLE",
              required: true,
              maxSelect: 2,
              options: [
                { name: "Algérienne", priceDelta: 0 },
                { name: "Mayonnaise", priceDelta: 0 },
                { name: "Ketchup", priceDelta: 0 },
                { name: "Biggy Burger", priceDelta: 0 },
                { name: "Samouraï", priceDelta: 0 },
                { name: "Andalouse", priceDelta: 0 },
                { name: "Barbecue", priceDelta: 0 },
                { name: "Harissa", priceDelta: 0 }
              ]
            },
            {
              slug: "supplements",
              name: "Suppléments",
              type: "MULTIPLE",
              required: false,
              options: [
                { name: "Jambon de dinde", priceDelta: 150 },
                { name: "Bacon de dinde", priceDelta: 150 },
                { name: "Oeuf", priceDelta: 100 },
                { name: "Cheddar", priceDelta: 100 },
                { name: "Boursin", priceDelta: 100 }
              ]
            },
            BOISSON_GROUP
          ]
        }
      ]
    },
    {
      slug: "burgers",
      name: "Nos Burgers",
      description: "Burger seul ou en menu (Frites + Boisson)",
      emoji: "🍔",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
      products: [
        {
          slug: "cheese",
          name: "Cheese",
          description: "Steak 45g, salade, fromage",
          basePrice: 350,
          image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&q=80",
          optionGroups: [
            {
              slug: "formule-burger",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Burger Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            BURGER_SAUCES_GROUP,
            BOISSON_GROUP
          ]
        },
        {
          slug: "double-cheese",
          name: "Double Cheese",
          description: "2 steaks 45g, salade, fromage",
          basePrice: 500,
          image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80",
          optionGroups: [
            {
              slug: "formule-burger",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Burger Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            BURGER_SAUCES_GROUP,
            BOISSON_GROUP
          ]
        },
        {
          slug: "triple-cheese",
          name: "Triple Cheese",
          description: "3 steaks 45g, salade, fromage",
          basePrice: 650,
          image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80",
          optionGroups: [
            {
              slug: "formule-burger",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Burger Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            BURGER_SAUCES_GROUP,
            BOISSON_GROUP
          ]
        },
        {
          slug: "woping-simple",
          name: "Woping Simple",
          description: "Steak 90g grill, cornichons, salade, tomate, oignons, fromage",
          basePrice: 750,
          image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80",
          optionGroups: [
            {
              slug: "formule-burger",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Burger Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            BURGER_SAUCES_GROUP,
            BOISSON_GROUP
          ]
        },
        {
          slug: "double-woping",
          name: "Double Woping",
          description: "2 steaks 90g grill, cornichons, salade, tomate, oignons, fromage",
          basePrice: 800,
          image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80",
          optionGroups: [
            {
              slug: "formule-burger",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Burger Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            BURGER_SAUCES_GROUP,
            BOISSON_GROUP
          ]
        },
        {
          slug: "bacon-burger",
          name: "Bacon Burger",
          description: "Steak 90g, bacon dinde, salade, tomate, oignons, fromage",
          basePrice: 650,
          image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&q=80",
          optionGroups: [
            {
              slug: "formule-burger",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Burger Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            BURGER_SAUCES_GROUP,
            BOISSON_GROUP
          ]
        },
        {
          slug: "giant",
          name: "Giant",
          description: "2 steaks 90g, sauce giant, fromage",
          basePrice: 790,
          image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80",
          optionGroups: [
            {
              slug: "formule-burger",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Burger Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            BURGER_SAUCES_GROUP,
            BOISSON_GROUP
          ]
        },
        {
          slug: "triple-woping",
          name: "Triple Woping",
          description: "3 steaks 90g au grill, cornichons, salade, tomate, oignons, fromage",
          basePrice: 900,
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
          optionGroups: [
            {
              slug: "formule-burger",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Burger Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            BURGER_SAUCES_GROUP,
            BOISSON_GROUP
          ]
        },
        {
          slug: "tasty",
          name: "Tasty",
          description: "Steak 90g, poulet pané, cornichons, salade, tomate, oignons, fromage",
          basePrice: 800,
          image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80",
          optionGroups: [
            {
              slug: "formule-burger",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Burger Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            BURGER_SAUCES_GROUP,
            BOISSON_GROUP
          ]
        },
        {
          slug: "b-dwich",
          name: "B-Dwich",
          description: "2 steaks 45g, cornichons, fromage",
          basePrice: 650,
          image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80",
          optionGroups: [
            {
              slug: "formule-burger",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Burger Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            BURGER_SAUCES_GROUP,
            BOISSON_GROUP
          ]
        },
        {
          slug: "authentique-chicken",
          name: "Authentique Chicken",
          description: "Poulet pané, salade, fromage",
          basePrice: 650,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
          optionGroups: [
            {
              slug: "formule-burger",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Burger Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            BURGER_SAUCES_GROUP,
            BOISSON_GROUP
          ]
        }
      ]
    },
    {
      slug: "sandwichs",
      name: "Nos Sandwichs",
      description: "Pain Kebab ou Tortilla",
      emoji: "🥙",
      image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80",
      products: [
        {
          slug: "kebab",
          name: "Kebab",
          description: "Emincé kebab, salade, tomate, oignons, fromage",
          basePrice: 600,
          image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=600&q=80",
          optionGroups: [
            {
              slug: "pain",
              name: "Choix du pain",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Pain Kebab", priceDelta: 0 },
                { name: "Tortilla", priceDelta: 0 }
              ]
            },
            {
              slug: "formule-sandwich",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Sandwich Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            {
              slug: "sauces",
              name: "Sauces",
              type: "MULTIPLE",
              required: true,
              maxSelect: 2,
              options: [
                { name: "Algérienne", priceDelta: 0 },
                { name: "Mayonnaise", priceDelta: 0 },
                { name: "Biggy Burger", priceDelta: 0 },
                { name: "Samouraï", priceDelta: 0 }
              ]
            },
            {
              slug: "supplements",
              name: "Suppléments",
              type: "MULTIPLE",
              required: false,
              options: [
                { name: "Jambon de dinde", priceDelta: 150 },
                { name: "Bacon de dinde", priceDelta: 150 },
                { name: "Oeuf", priceDelta: 100 },
                { name: "Cheddar", priceDelta: 100 },
                { name: "Boursin", priceDelta: 100 }
              ]
            },
            BOISSON_GROUP
          ]
        },
        {
          slug: "steak",
          name: "Steak",
          description: "Steak, salade, tomate, oignons, fromage",
          basePrice: 600,
          image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&q=80",
          optionGroups: [
            {
              slug: "pain",
              name: "Choix du pain",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Pain Kebab", priceDelta: 0 },
                { name: "Tortilla", priceDelta: 0 }
              ]
            },
            {
              slug: "formule-sandwich",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Sandwich Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            {
              slug: "sauces",
              name: "Choix des sauces",
              type: "MULTIPLE",
              required: true,
              maxSelect: 3,
              options: [
                { name: "Algérienne", priceDelta: 0 },
                { name: "Samouraï", priceDelta: 0 },
                { name: "Ketchup", priceDelta: 0 },
                { name: "Mayo", priceDelta: 0 },
                { name: "Barbecue", priceDelta: 0 },
                { name: "Blanche", priceDelta: 0 },
                { name: "Harissa", priceDelta: 0 },
                { name: "Biggy", priceDelta: 0 }
              ]
            },
            {
              slug: "supplements",
              name: "Suppléments",
              type: "MULTIPLE",
              required: false,
              maxSelect: 5,
              options: [
                { name: "Jambon de dinde", priceDelta: 150 },
                { name: "Bacon de dinde", priceDelta: 150 },
                { name: "Oeuf", priceDelta: 100 },
                { name: "Cheddar", priceDelta: 100 },
                { name: "Boursin", priceDelta: 100 }
              ]
            },
            BOISSON_GROUP
          ]
        },
        {
          slug: "escalope",
          name: "Escalope",
          description: "Escalope de poulet, salade, tomate, oignons, fromage",
          basePrice: 600,
          image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=600&q=80",
          optionGroups: [
            {
              slug: "pain",
              name: "Choix du pain",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Pain Kebab", priceDelta: 0 },
                { name: "Tortilla", priceDelta: 0 }
              ]
            },
            {
              slug: "formule-sandwich",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Sandwich Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            {
              slug: "sauces",
              name: "Choix des sauces",
              type: "MULTIPLE",
              required: true,
              maxSelect: 3,
              options: [
                { name: "Algérienne", priceDelta: 0 },
                { name: "Samouraï", priceDelta: 0 },
                { name: "Ketchup", priceDelta: 0 },
                { name: "Mayo", priceDelta: 0 },
                { name: "Barbecue", priceDelta: 0 },
                { name: "Blanche", priceDelta: 0 },
                { name: "Harissa", priceDelta: 0 },
                { name: "Biggy", priceDelta: 0 }
              ]
            },
            {
              slug: "supplements",
              name: "Suppléments",
              type: "MULTIPLE",
              required: false,
              maxSelect: 5,
              options: [
                { name: "Jambon de dinde", priceDelta: 150 },
                { name: "Bacon de dinde", priceDelta: 150 },
                { name: "Oeuf", priceDelta: 100 },
                { name: "Cheddar", priceDelta: 100 },
                { name: "Boursin", priceDelta: 100 }
              ]
            },
            BOISSON_GROUP
          ]
        },
        {
          slug: "curry",
          name: "Curry",
          description: "Chicken curry, salade, tomate, oignons, fromage",
          basePrice: 700,
          image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=600&q=80",
          optionGroups: [
            {
              slug: "pain",
              name: "Choix du pain",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Pain Kebab", priceDelta: 0 },
                { name: "Tortilla", priceDelta: 0 }
              ]
            },
            {
              slug: "formule-sandwich",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Sandwich Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            {
              slug: "sauces",
              name: "Choix des sauces",
              type: "MULTIPLE",
              required: true,
              maxSelect: 3,
              options: [
                { name: "Algérienne", priceDelta: 0 },
                { name: "Samouraï", priceDelta: 0 },
                { name: "Ketchup", priceDelta: 0 },
                { name: "Mayo", priceDelta: 0 },
                { name: "Barbecue", priceDelta: 0 },
                { name: "Blanche", priceDelta: 0 },
                { name: "Harissa", priceDelta: 0 },
                { name: "Biggy", priceDelta: 0 }
              ]
            },
            {
              slug: "supplements",
              name: "Suppléments",
              type: "MULTIPLE",
              required: false,
              maxSelect: 5,
              options: [
                { name: "Jambon de dinde", priceDelta: 150 },
                { name: "Bacon de dinde", priceDelta: 150 },
                { name: "Oeuf", priceDelta: 100 },
                { name: "Cheddar", priceDelta: 100 },
                { name: "Boursin", priceDelta: 100 }
              ]
            },
            BOISSON_GROUP
          ]
        },
        {
          slug: "tandoori",
          name: "Tandoori",
          description: "Chicken tandoori, salade, tomate, oignons, fromage",
          basePrice: 700,
          image: "https://images.unsplash.com/photo-1618213837799-25d5552820d3?w=600&q=80",
          optionGroups: [
            {
              slug: "pain",
              name: "Choix du pain",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Pain Kebab", priceDelta: 0 },
                { name: "Tortilla", priceDelta: 0 }
              ]
            },
            {
              slug: "formule-sandwich",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Sandwich Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            {
              slug: "sauces",
              name: "Choix des sauces",
              type: "MULTIPLE",
              required: true,
              maxSelect: 3,
              options: [
                { name: "Algérienne", priceDelta: 0 },
                { name: "Samouraï", priceDelta: 0 },
                { name: "Ketchup", priceDelta: 0 },
                { name: "Mayo", priceDelta: 0 },
                { name: "Barbecue", priceDelta: 0 },
                { name: "Blanche", priceDelta: 0 },
                { name: "Harissa", priceDelta: 0 },
                { name: "Biggy", priceDelta: 0 }
              ]
            },
            {
              slug: "supplements",
              name: "Suppléments",
              type: "MULTIPLE",
              required: false,
              maxSelect: 5,
              options: [
                { name: "Jambon de dinde", priceDelta: 150 },
                { name: "Bacon de dinde", priceDelta: 150 },
                { name: "Oeuf", priceDelta: 100 },
                { name: "Cheddar", priceDelta: 100 },
                { name: "Boursin", priceDelta: 100 }
              ]
            },
            BOISSON_GROUP
          ]
        },
        {
          slug: "supreme",
          name: "Le Suprême",
          description: "3 steaks 45g, oeuf, bacon, salade, tomate, oignons rouges, fromage",
          basePrice: 900,
          image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80",
          optionGroups: [
            {
              slug: "pain",
              name: "Choix du pain",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Pain Kebab", priceDelta: 0 },
                { name: "Tortilla", priceDelta: 0 }
              ]
            },
            {
              slug: "formule-sandwich",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Sandwich Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            {
              slug: "sauces",
              name: "Sauces",
              type: "MULTIPLE",
              required: true,
              maxSelect: 2,
              options: [
                { name: "Algérienne", priceDelta: 0 },
                { name: "Mayonnaise", priceDelta: 0 },
                { name: "Biggy Burger", priceDelta: 0 },
                { name: "Samouraï", priceDelta: 0 }
              ]
            },
            {
              slug: "supplements",
              name: "Suppléments",
              type: "MULTIPLE",
              required: false,
              options: [
                { name: "Jambon de dinde", priceDelta: 150 },
                { name: "Bacon de dinde", priceDelta: 150 },
                { name: "Oeuf", priceDelta: 100 },
                { name: "Cheddar", priceDelta: 100 },
                { name: "Boursin", priceDelta: 100 }
              ]
            },
            BOISSON_GROUP
          ]
        },
        {
          slug: "full",
          name: "Le Full",
          description: "2 steaks, escalope, sauce fromagère, salade, tomate, oignons, fromage",
          basePrice: 1000,
          image: "https://images.unsplash.com/photo-1481070555726-e2fe8357571d?w=600&q=80",
          optionGroups: [
            {
              slug: "pain",
              name: "Choix du pain",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Pain Kebab", priceDelta: 0 },
                { name: "Tortilla", priceDelta: 0 }
              ]
            },
            {
              slug: "formule-sandwich",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Sandwich Seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            {
              slug: "sauces",
              name: "Sauces",
              type: "MULTIPLE",
              required: true,
              maxSelect: 2,
              options: [
                { name: "Blanche", priceDelta: 0 },
                { name: "Samouraï", priceDelta: 0 },
                { name: "Barbecue", priceDelta: 0 },
                { name: "Algérienne", priceDelta: 0 },
                { name: "Mayo", priceDelta: 0 },
                { name: "Ketchup", priceDelta: 0 }
              ]
            },
            {
              slug: "supplements",
              name: "Suppléments",
              type: "MULTIPLE",
              required: false,
              maxSelect: 3,
              options: [
                { name: "Jambon de dinde", priceDelta: 150 },
                { name: "Bacon de dinde", priceDelta: 150 },
                { name: "Oeuf", priceDelta: 100 },
                { name: "Cheddar", priceDelta: 100 },
                { name: "Boursin", priceDelta: 100 }
              ]
            },
            BOISSON_GROUP
          ]
        },
        {
          slug: "farmer",
          name: "Farmer",
          description: "Escalope, Boursin, oeuf, jambon de dinde, salade, tomate, oignons, fromage",
          basePrice: 900,
          image: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=600&q=80",
          optionGroups: [
            {
              slug: "pain",
              name: "Choix du pain",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Pain Kebab", priceDelta: 0 },
                { name: "Tortilla", priceDelta: 0 }
              ]
            },
            {
              slug: "formule-sandwich",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Sandwich seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            {
              slug: "sauces",
              name: "Sauces",
              type: "MULTIPLE",
              required: true,
              maxSelect: 3,
              options: [
                { name: "Samourai", priceDelta: 0 },
                { name: "Blanche", priceDelta: 0 },
                { name: "Algérienne", priceDelta: 0 },
                { name: "Barbecue", priceDelta: 0 },
                { name: "Mayonnaise", priceDelta: 0 },
                { name: "Ketchup", priceDelta: 0 },
                { name: "Harissa", priceDelta: 0 },
                { name: "Andalouse", priceDelta: 0 }
              ]
            },
            {
              slug: "supplements",
              name: "Suppléments",
              type: "MULTIPLE",
              required: false,
              options: [
                { name: "Jambon de dinde", priceDelta: 150 },
                { name: "Bacon de dinde", priceDelta: 150 },
                { name: "Oeuf", priceDelta: 100 },
                { name: "Cheddar", priceDelta: 100 },
                { name: "Boursin", priceDelta: 100 }
              ]
            },
            BOISSON_GROUP
          ]
        },
        {
          slug: "casdal",
          name: "Le Casdal",
          description: "2 steaks 45g, viande au choix, salade, tomate, oignons, fromage",
          basePrice: 900,
          image: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=600&q=80",
          optionGroups: [
            {
              slug: "pain",
              name: "Choix du pain",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Pain Kebab", priceDelta: 0 },
                { name: "Tortilla", priceDelta: 0 }
              ]
            },
            {
              slug: "viande-casdal",
              name: "Viande au choix",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Kebab", priceDelta: 0 },
                { name: "Escalope", priceDelta: 0 },
                { name: "Tenders", priceDelta: 0 },
                { name: "Steak", priceDelta: 0 }
              ]
            },
            {
              slug: "formule-sandwich",
              name: "Formule",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Sandwich seul", priceDelta: 0 },
                { name: "Menu (Frites + Boisson)", priceDelta: 200 }
              ]
            },
            {
              slug: "sauces",
              name: "Sauces",
              type: "MULTIPLE",
              required: true,
              maxSelect: 3,
              options: [
                { name: "Samourai", priceDelta: 0 },
                { name: "Blanche", priceDelta: 0 },
                { name: "Algérienne", priceDelta: 0 },
                { name: "Barbecue", priceDelta: 0 },
                { name: "Mayonnaise", priceDelta: 0 },
                { name: "Ketchup", priceDelta: 0 },
                { name: "Harissa", priceDelta: 0 },
                { name: "Andalouse", priceDelta: 0 }
              ]
            },
            {
              slug: "supplements",
              name: "Suppléments",
              type: "MULTIPLE",
              required: false,
              options: [
                { name: "Jambon de dinde", priceDelta: 150 },
                { name: "Bacon de dinde", priceDelta: 150 },
                { name: "Oeuf", priceDelta: 100 },
                { name: "Cheddar", priceDelta: 100 },
                { name: "Boursin", priceDelta: 100 }
              ]
            },
            BOISSON_GROUP
          ]
        }
      ]
    },
    {
      slug: "tex-mex",
      name: "Tex Mex & Barquettes",
      description: "Snacks et frites",
      emoji: "🍟",
      image: "https://images.unsplash.com/photo-1630384060421-cb20aeb56f83?w=800&q=80",
      products: [
        {
          slug: "nuggets",
          name: "Nuggets",
          description: "Nuggets de poulet croustillants",
          basePrice: 350,
          image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600&q=80",
          optionGroups: [
            {
              slug: "quantite-nuggets",
              name: "Quantité",
              type: "SINGLE",
              required: true,
              options: [
                { name: "4 pièces", priceDelta: 0 },
                { name: "8 pièces", priceDelta: 250 }
              ]
            }
          ]
        },
        {
          slug: "tenders",
          name: "Tenders",
          description: "Filets de poulet panés (4 pièces)",
          basePrice: 500,
          image: "https://images.unsplash.com/photo-1585325701165-fc1f97060794?w=600&q=80",
          optionGroups: []
        },
        {
          slug: "mozza-stick",
          name: "Mozza Stick",
          description: "Bâtonnets de mozzarella (4 pièces)",
          basePrice: 350,
          image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=600&q=80",
          optionGroups: []
        },
        {
          slug: "jalapenos",
          name: "Jalapenos",
          description: "Jalapenos (4 pièces)",
          basePrice: 350,
          image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&q=80",
          optionGroups: []
        },
        {
          slug: "frites",
          name: "Barquette de Frites",
          description: "Frites croustillantes",
          basePrice: 250,
          image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80",
          optionGroups: [
            {
              slug: "taille-frites",
              name: "Taille",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Petite", priceDelta: 0 },
                { name: "Grande", priceDelta: 100 }
              ]
            }
          ]
        },
        {
          slug: "barquette-kebab",
          name: "Barquette Kebab",
          description: "Viande de kebab seule",
          basePrice: 600,
          image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=80",
          optionGroups: []
        }
      ]
    },
    {
      slug: "menu-enfant",
      name: "Menu enfant",
      description: "Pour les petits gourmands",
      emoji: "🧒",
      image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80",
      products: [
        {
          slug: "menu-enfant",
          name: "Menu enfant",
          description: "Plat + frites + Capri Sun + surprise",
          basePrice: 550,
          image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=80",
          optionGroups: [
            {
              slug: "choix-menu-enfant",
              name: "Plat",
              type: "SINGLE",
              required: true,
              options: [
                { name: "Cheese burger", priceDelta: 0 },
                { name: "4 nuggets", priceDelta: 0 }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default menuData;
