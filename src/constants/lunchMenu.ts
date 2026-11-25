import type { Language } from "@/context/LanguageContext";

export type LunchMenuItem = {
  name: string;
  price?: string;
  description?: string;
};

export type LunchMenuSection = {
  title: string;
  detail: string;
  items: LunchMenuItem[];
};

type LunchMenuCopy = {
  pageTitle: string;
  sectionLabel: string;
  heading: string;
  menuTitle: string;
  price: string;
  includes: string;
  pdfHref: string;
  pdfLabel: string;
  reserveLabel: string;
  addOnsTitle: string;
  sections: LunchMenuSection[];
  addOns: LunchMenuItem[];
  note: string;
};

export const lunchMenuCopy: Record<Language, LunchMenuCopy> = {
  en: {
    pageTitle: "Lunch Menu - BOUS Persian Cuisine",
    sectionLabel: "Lunch menu",
    heading: "Lunch Menu",
    menuTitle: "Table d’Hôte Menu",
    price: "$45 per person",
    includes: "Includes one starter and one main",
    pdfHref: "/lunch-menu.pdf",
    pdfLabel: "Open bilingual PDF menu",
    reserveLabel: "Make a reservation",
    addOnsTitle: "Optional Add-ons",
    sections: [
      {
        title: "Appetiser",
        detail: "Choose one",
        items: [
          {
            name: "Soup of the day",
            description: "Made with fresh, seasonal ingredients."
          },
          {
            name: "Kashk-e Bademjoon",
            description: "Charcoal-smoked eggplant, kashk, crispy onion, fried mint, and garlic"
          },
          {
            name: "Cabbage and Beet Salad",
            description: "Shaved red cabbage, roasted beets, blood orange, fresh mint, feta."
          },
          {
            name: "Garden Salad Shirazi",
            description: "Cucumber, tomato, onion, mint, and verjus"
          },
          {
            name: "Sour Mushrooms",
            description: "Charcoal-grilled mushrooms marinated with butter and Qara Qurut"
          },
          {
            name: "Dolmeh Felfel",
            price: "+$5",
            description: "Persian-style bell pepper stuffed with beef, rice and fragrant herbs."
          }
        ]
      },
      {
        title: "Main",
        detail: "Choose one",
        items: [
          {
            name: "Koobideh Kabab Plate",
            description: "Charcoal-grilled ground beef, grilled vegetables, and Persian rice"
          },
          {
            name: "Joojeh Kabab Plate",
            description: "Saffron-marinated Quebec chicken breast, grilled vegetables, and Persian rice"
          },
          {
            name: "Salmon Kabab Plate",
            description: "Charcoal-grilled Salmon, Persian spices, grilled vegetables, and Persian rice"
          },
          {
            name: "Beef Tenderloin Gheimeh Tahchin",
            description: "Crisp saffron rice with a Persian stew of beef tenderloin, yellow split peas, tomatoes and dried lime."
          },
          {
            name: "Duck Fesenjoon",
            price: "+$10",
            description: "Slow-cooked walnut and pomegranate stew, and Persian rice"
          },
          {
            name: "Barg Kabab",
            price: "+$15",
            description: "Charcoal-grilled beef tenderloin, and Persian rice"
          },
          {
            name: "Shishlik",
            price: "+$20",
            description: "Charcoal-grilled Kamouraska Lamb Chops, grilled vegetables and Persian rice"
          }
        ]
      }
    ],
    addOns: [
      {
        name: "Maast-o-Moosir",
        price: "14",
        description: "House-made yogurt with Persian shallots"
      },
      {
        name: "Dessert of the Day",
        price: "11"
      }
    ],
    note: "For vegetarian options, please ask your server."
  },
  fr: {
    pageTitle: "Menu midi - BOUS Cuisine perse",
    sectionLabel: "Menu midi",
    heading: "Menu midi",
    menuTitle: "Menu table d’hôte",
    price: "45 $ par personne",
    includes: "Une entrée et un plat principal au choix",
    pdfHref: "/lunch-menu.pdf#page=2",
    pdfLabel: "Ouvrir le menu PDF bilingue",
    reserveLabel: "Faire une réservation",
    addOnsTitle: "Suppléments au choix",
    sections: [
      {
        title: "Entrées",
        detail: "Choisissez une entrée",
        items: [
          {
            name: "Soupe du jour",
            description: "Préparée avec des ingrédients frais de saison."
          },
          {
            name: "Kashk-e Bademjoon",
            description: "Aubergine fumée au charbon, kashk, oignons croustillants, menthe frite et ail."
          },
          {
            name: "Salade de chou rouge et de betteraves",
            description: "Chou rouge émincé, betteraves rôties, orange sanguine, menthe fraîche et feta."
          },
          {
            name: "Salade du jardin à la shirazi",
            description: "Concombre, tomate, oignon, menthe et verjus."
          },
          {
            name: "Champignons acidulés",
            description: "Champignons marinés au beurre et au qara qurut, puis grillés au charbon."
          },
          {
            name: "Dolmeh Felfel",
            price: "+5 $",
            description: "Poivron farci à la persane, au bœuf, au riz et aux fines herbes."
          }
        ]
      },
      {
        title: "Plats principaux",
        detail: "Choisissez un plat",
        items: [
          {
            name: "Assiette de kabab koobideh",
            description: "Bœuf haché grillé au charbon, légumes grillés et riz persan."
          },
          {
            name: "Assiette de joojeh kabab",
            description: "Poitrine de poulet du Québec marinée au safran, légumes grillés et riz persan."
          },
          {
            name: "Assiette de kabab de saumon",
            description: "Saumon grillé au charbon, épices persanes, légumes grillés et riz persan."
          },
          {
            name: "Tahchin au gheimeh de filet de bœuf",
            description: "Riz croustillant au safran et ragoût persan de filet de bœuf, de pois cassés jaunes, de tomates et de lime séchée."
          },
          {
            name: "Fesenjoon au canard",
            price: "+10 $",
            description: "Canard mijoté aux noix de Grenoble et à la grenade, servi avec du riz persan."
          },
          {
            name: "Barg Kabab",
            price: "+15 $",
            description: "Filet de bœuf grillé au charbon et riz persan."
          },
          {
            name: "Shishlik",
            price: "+20 $",
            description: "Côtelettes d’agneau de Kamouraska grillées au charbon, légumes grillés et riz persan."
          }
        ]
      }
    ],
    addOns: [
      {
        name: "Maast-o-Moosir",
        price: "14",
        description: "Yogourt maison aux échalotes persanes."
      },
      {
        name: "Dessert du jour",
        price: "11"
      }
    ],
    note: "Pour les options végétariennes, renseignez-vous auprès de votre serveur."
  }
};
