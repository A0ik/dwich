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
      image: "/images/salade-dwich.png",
      products: [
        {
          slug: "salade-dwich",
          name: "Salade Dwich",
          description: "Poulet ou viande au choix, salade, tomate, oignons rouges, maïs, cranberry, graines",
          basePrice: 900,
          includesDrink: true,
          image: "/images/salade-dwich.png",
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
          image: "/images/assiette.png",
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
      image: "/images/tacos2.png",
      products: [
        {
          slug: "tacos",
          name: "Tacos",
          description: "Garni de frites et sauce fromagère",
          basePrice: 900,
          includesDrink: true,
          image: "/images/tacos2.png",
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
      image: "/images/Giant.png",
      products: [
        {
          slug: "cheese",
          name: "Cheese",
          description: "Steak 45g, salade, fromage",
          basePrice: 350,
          image: "/images/cheese.png",
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
          image: "/images/double-cheese.png",
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
          image: "/images/triple-cheese.png",
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
          image: "/images/woping.png",
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
          image: "/images/double-woping.png",
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
          image: "/images/triple-woping.png",
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
          image: "/images/bacon-burger.png",
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
          image: "/images/Giant.png",
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
          image: "/images/tasty-burger.png",
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
          image: "/images/b-dwich.png",
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
          image: "/images/authentique-chicken.png",
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
          slug: "mozza",
          name: "Mozza Burger",
          description: "Steak 90g, mozzarella fondante, tomate, salade",
          basePrice: 750,
          image: "/images/mozza.png",
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
      image: "/images/kebab.png",
      products: [
        {
          slug: "kebab",
          name: "Kebab",
          description: "Emincé kebab, salade, tomate, oignons, fromage",
          basePrice: 600,
          image: "/images/kebab.png",
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
          image: "/images/steak.png",
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
          image: "/images/escalope.png",
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
          image: "/images/curry.png",
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
          image: "/images/tandoori.png",
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
          image: "/images/supreme.png",
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
          image: "/images/full.png",
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
          description: "2 escalopes, poivrons, oignons, fromage fondu",
          basePrice: 900,
          image: "/images/farmer.png",
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
          image: "/images/casdal.png",
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
      image: "/images/frite.png",
      products: [
        {
          slug: "nuggets",
          name: "Nuggets",
          description: "Nuggets de poulet croustillants",
          basePrice: 350,
          image: "/images/nuggets.png",
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
          image: "/images/tenders.png",
          optionGroups: []
        },
        {
          slug: "mozza-stick",
          name: "Mozza Stick",
          description: "Bâtonnets de mozzarella (4 pièces)",
          basePrice: 350,
          image: "/images/mozza.png",
          optionGroups: []
        },
        {
          slug: "frites",
          name: "Barquette de Frites",
          description: "Frites croustillantes",
          basePrice: 250,
          image: "/images/frite.png",
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
          image: "/images/barquette-kebab.png",
          optionGroups: []
        }
      ]
    },
    {
      slug: "menu-enfant",
      name: "Menu enfant",
      description: "Pour les petits gourmands",
      emoji: "🧒",
      image: "/images/menu-enfant.png",
      products: [
        {
          slug: "menu-enfant",
          name: "Menu enfant",
          description: "Plat + frites + Capri Sun + surprise",
          basePrice: 550,
          image: "/images/menu-enfant.png",
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
