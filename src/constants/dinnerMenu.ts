type Localized = { en: string; fr: string };
const text = (en: string, fr = en): Localized => ({ en, fr });

type PriceOption = { name: Localized; price: number };
export type DinnerMenuItem = {
  name: Localized;
  price: number | PriceOption[];
  description?: Localized;
  seasonal?: boolean;
  veganOption?: boolean;
};
export type DinnerDish = DinnerMenuItem & { shortDescription: Localized };
type DinnerCourse = {
  id: string;
  title: Localized;
  note?: Localized;
  dishes: DinnerDish[];
};

export const dinnerCourses: DinnerCourse[] = [
  {
    id: "appetizers",
    title: text("TO BEGIN", "Pour commencer"),
    dishes: [
      {
        name: text("Sangak Bread", "Pain Sangak"),
        price: 6,
        shortDescription: text("Persian flatbread", "Pain persan"),
        description: text(
          "Traditional Persian sourdough flatbread",
          "Pain plat persan traditionnel au levain",
        ),
      },
      {
        name: text("Maast-o-Khiar"),
        price: 18,
        shortDescription: text("Cucumber yogurt", "Yogourt, Concombre"),
        description: text(
          "House-Made Yogurt, Cucumber, Kashan Rose Petal, Walnut, Herbs",
          "Yogourt maison, Concombre, Pétales de rose de Kashan, Noix et herbes",
        ),
      },
      {
        name: text("Zeyton Parvardeh"),
        price: 20,
        shortDescription: text("Marinated olives", "Olives marinées"),
        description: text(
          "Green Olive, Walnut, Pomegranate, Olive oil, Garlic, Tarragon, Herbs",
          "Olives vertes, Noix, Grenade, Huile d’olive, Ail, Estragon et herbes",
        ),
      },
      {
        name: text(
          "Spicy Saffron Chicken Wings",
          "Ailes de poulet épicées au safran",
        ),
        price: 18,
        shortDescription: text("Saffron wings", "Ailes safranées"),
        description: text(
          "Chicken wingette, Saffron, Aleppo pepper",
          "Ailerons de poulet, Safran et piment d’Alep",
        ),
      },
      {
        name: text("Golden Square Mile Tahchin", "Tahchin du Mille carré doré"),
        price: 22,
        shortDescription: text("Crispy rice", "Riz croustillant"),
        description: text(
          "Crispy saffron rice, Spring herbs, Barberries, Pistachio",
          "Riz croustillant au safran, Herbes printanières, Épines-vinettes et pistaches",
        ),
      },
      {
        name: text("Kashk-o-Bademjoon"),
        price: 28,
        shortDescription: text("Smoked eggplant", "Aubergine fumée"),
        description: text(
          "Smoked eggplant, Kashk, Crispy onion, Mint, Fried garlic",
          "Aubergine fumée, Kashk, Oignons croustillants, Menthe et ail frit",
        ),
      },
      {
        name: text("Ghalieh Meygoo"),
        price: 32,
        shortDescription: text("King shrimp", "Crevettes géantes"),
        description: text(
          "Argentinian King Shrimp, Cooked herbs, Garlic, Tamarine, Hot chili",
          "Grosses crevettes d’Argentine, Herbes mijotées, Ail, Tamarin et piment fort",
        ),
        seasonal: true,
      },
    ],
  },
  {
    id: "caviar",
    title: text("PERSIAN CAVIAR", "Caviar persan"),
    dishes: [
      {
        name: text("CAVIAR on Tahdig Bites", "Caviar sur bouchées de tahdig"),
        price: 48,
        shortDescription: text("Baerii caviar", "Caviar Baerii"),
        description: text(
          "Persian Baerii Caviar, Three bites of rice and bread tahdig, House-made yogurt",
          "Caviar persan Baerii, Trois bouchées de tahdig de riz et de pain, Yogourt maison",
        ),
      },
      {
        name: text("CAVIAR on Saffron Tahchin", "Caviar sur tahchin au safran"),
        price: 65,
        shortDescription: text("Ossetra caviar", "Caviar Ossetra"),
        description: text(
          "Persian Ossetra Caviar, Pistachio, Barberry",
          "Caviar persan Ossetra, Pistaches et épines-vinettes",
        ),
      },
    ],
  },
  {
    id: "grill",
    title: text("FROM THE CHARCOAL GRILL", "Grillades au charbon"),
    dishes: [
      {
        name: text("Koobideh Kabab"),
        price: 36,
        shortDescription: text("Ground beef", "Bœuf haché"),
        description: text(
          "Charcoal-grilled ground beef, Grilled vegetables",
          "Bœuf haché grillé au charbon, Légumes grillés",
        ),
      },
      {
        name: text("Joojeh Kabab"),
        price: 38,
        shortDescription: text("Saffron chicken", "Poulet safrané"),
        description: text(
          "Charcoal-grilled saffron-marinated Quebec chicken breast, Grilled vegetables",
          "Poitrine de poulet du Québec marinée au safran et grillée au charbon, Légumes grillés",
        ),
      },
      {
        name: text("Barg Kabab"),
        price: 55,
        shortDescription: text("Beef tenderloin", "Filet mignon"),
        description: text(
          "Charcoal-grilled beef tenderloin, Grilled Vegetables",
          "Filet de bœuf grillé au charbon, Légumes grillés",
        ),
      },
      {
        name: text("Shishlik"),
        price: 65,
        shortDescription: text("Lamb chops", "Côtelettes d’agneau"),
        description: text(
          "Charcoal-grilled Kamouraska Lamb Chops, Grilled Vegetables",
          "Côtelettes d’agneau de Kamouraska grillées au charbon, Légumes grillés",
        ),
      },
      {
        name: text("Branzino"),
        price: 75,
        shortDescription: text("Whole seabass", "Bar entier"),
        description: text(
          "Charcoal-grilled whole branzino, Pistachios & barberries, Served on traditional Northern Iranian rice, Smoke-cured with dried rice stalks",
          "Bar entier grillé au charbon, Pistaches et épines-vinettes, Servi sur un riz du nord de l’Iran fumé à la paille de riz séchée",
        ),
      },
      {
        name: text("Qafqazi Wagyu", "Wagyu Qafqazi"),
        price: 85,
        shortDescription: text("Australian Wagyu ribeye", "Faux-filet de wagyu australien"),
        description: text(
          "Australian Sir Harry Wagyu ribeye, Pomegranate, Walnuts, Grilled vegetables, Assorted mushrooms and herbs",
          "Faux-filet de wagyu australien Sir Harry, Grenade, Noix, Légumes grillés, Champignons variés et fines herbes",
        ),
        seasonal: true,
      },
    ],
  },
  {
    id: "slow-cooked",
    title: text("SLOW-COOKED", "Plats mijotés"),
    note: text("* Vegan option available", "* Option végétalienne disponible"),
    dishes: [
      {
        name: text("Duck Fesenjoon", "Fesenjoon au canard"),
        price: 48,
        shortDescription: text("Duck confit", "Canard confit"),
        description: text(
          "Duck leg confit, Slow-cooked walnuts with pomegranate molasses",
          "Confit de cuisse de canard, Noix mijotées à la mélasse de grenade",
        ),
        veganOption: true,
      },
      {
        name: text(
          "Kamouraska Lamb Ghormeh Sabzi",
          "Ghormeh Sabzi à l’agneau de Kamouraska",
        ),
        price: 55,
        shortDescription: text("Lamb shank", "Jarret d’agneau"),
        description: text(
          "Braised lamb shank, Five-herb sauce, Red beans, Dried lime",
          "Jarret d’agneau braisé, Sauce aux cinq herbes, Haricots rouges et lime séchée",
        ),
        veganOption: true,
      },
      {
        name: text("Morasa Polo with Lamb Neck", "Morasa Polo au cou d’agneau"),
        price: 65,
        shortDescription: text("Lamb neck", "Cou d’agneau"),
        description: text(
          "Quebec lamb neck, Barberry, Pistachios, Almond, Saffron, Orange peel, Carrot, Northern Iranian rice",
          "Cou d’agneau du Québec, Épines-vinettes, Pistaches, Amandes, Safran, Zeste d’orange, Carottes et riz du nord de l’Iran",
        ),
        seasonal: true,
      },
    ],
  },
  {
    id: "accompaniments",
    title: text("ACCOMPANIMENTS", "Accompagnements"),
    dishes: [
      {
        name: text("Saffron Rice", "Riz au safran"),
        price: 9,
        shortDescription: text("Saffron rice", "Riz safrané"),
        description: text(
          "Northern Iranian Rice, Saffron",
          "Riz du nord de l’Iran et safran",
        ),
      },
      {
        name: text("Salad Shirazi", "Salade Shirazi"),
        price: 11,
        shortDescription: text("Chopped salad", "Salade hachée"),
        description: text(
          "Cucumber, Tomato, Onion, Mint, Verjus",
          "Concombre, Tomate, Oignon, Menthe et verjus",
        ),
      },
      {
        name: text("Maast-o-Moosir"),
        price: 7,
        shortDescription: text("Shallot yogurt", "Yogourt, Échalotes"),
        description: text(
          "House-Made Yogurt, Persian shallots",
          "Yogourt maison et échalotes persanes",
        ),
      },
      {
        name: text("Mirza Ghasemi"),
        price: 7,
        shortDescription: text("Smoked eggplant", "Aubergine fumée"),
        description: text(
          "Smoked eggplant, Tomato, Garlic",
          "Aubergine fumée, Tomate et ail",
        ),
      },
      {
        name: text("Borani Esfenaj"),
        price: 7,
        shortDescription: text("Spinach yogurt", "Yogourt, Épinards"),
        description: text(
          "House-Made Yogurt, Spinach, Spices",
          "Yogourt maison, Épinards et épices",
        ),
      },
      {
        name: text("Sir Torshi"),
        price: 7,
        shortDescription: text("Pickled garlic", "Ail mariné"),
        description: text("Aged pickled garlic", "Ail mariné vieilli"),
      },
      {
        name: text("Torshi Naz Khaton"),
        price: 7,
        shortDescription: text("Pickled vegetables", "Légumes marinés"),
        description: text(
          "Pickled Mixed chopped veggie with Spices",
          "Mélange de légumes hachés et marinés aux épices",
        ),
      },
      {
        name: text(
          "Torshi Quebec Spicy Albaloo",
          "Torshi de griottes épicées du Québec",
        ),
        price: 7,
        shortDescription: text("Pickled cherries", "Griottes marinées"),
        description: text(
          "Pickled Quebec sour cherry with jalapeno",
          "Griottes du Québec marinées au jalapeño",
        ),
      },
      {
        name: text(
          "Barberry and Onion Torshi",
          "Torshi aux épines-vinettes et à l’oignon",
        ),
        price: 7,
        shortDescription: text(
          "Pickled barberries",
          "Épines-vinettes marinées",
        ),
        description: text(
          "Pickled Barberry with Red onion",
          "Épines-vinettes marinées à l’oignon rouge",
        ),
      },
      {
        name: text(
          "Side Mix Platter 3/6",
          "Assiette de 3 ou 6 accompagnements",
        ),
        price: [
          {
            name: text(
              "Side Mix Platter — 3 sides",
              "Assiette de 3 accompagnements",
            ),
            price: 20,
          },
          {
            name: text(
              "Side Mix Platter — 6 sides",
              "Assiette de 6 accompagnements",
            ),
            price: 35,
          },
        ],
        shortDescription: text("Assorted sides", "Accompagnements variés"),
      },
    ],
  },
];

export const dessertCourse = {
  id: "desserts",
  title: text("Desserts"),
  dishes: [
    {
      name: text("Faloodeh"),
      price: 14,
      description: text(
        "Frozen rice vermicelli, Lime and rosewater syrup, Poached barberries, Lime",
        "Vermicelles de riz glacés, Sirop à la lime et à l’eau de rose, Épines-vinettes pochées, Lime",
      ),
    },
    {
      name: text("Persian Love Cake"),
      price: 18,
      description: text(
        "Cardamom financier, Rosewater labneh cream, Poached pear, Pistachios",
        "Financier à la cardamome, Crème de labneh à l’eau de rose, Poire pochée, Pistaches",
      ),
    },
    {
      name: text("Chocolate Date Cake", "Gâteau au chocolat et aux dattes"),
      price: 21,
      description: text(
        "Chocolate and date cake, Chocolate date sauce, Sesame halva ice cream, Sesame brittle",
        "Gâteau au chocolat et aux dattes, Sauce chocolat-dattes, Crème glacée au halva de sésame, Croquant au sésame",
      ),
    },
    {
      name: text("Bastani Sonnati"),
      price: 21,
      description: text(
        "Saffron, Rose and pistachio ice cream, Clotted cream, Ghorabieh, Freeze-dried raspberry",
        "Crème glacée au safran, À la rose et à la pistache, Crème caillée, Ghorabieh, Framboises lyophilisées",
      ),
    },
    {
      name: text("Beh"),
      price: 21,
      description: text(
        "Poached quince, Orange blossom custard, Butter crumble, Sea buckthorn sauce",
        "Coing poché, Crème à la fleur d’oranger, Crumble au beurre, Sauce à l’argousier",
      ),
    },
  ] satisfies DinnerMenuItem[],
};
