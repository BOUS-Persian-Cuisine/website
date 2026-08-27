import { MenuPageLayout } from "@/components/MenuPageLayout";
import { useLanguage, type Language } from "@/context/LanguageContext";

type LunchMenuItem = {
  name: string;
  price?: string;
  description?: string;
};

type LunchMenuSection = {
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
  addOnColumns: LunchMenuItem[][];
  dessert: LunchMenuItem;
};

const lunchMenuCopy: Record<Language, LunchMenuCopy> = {
  en: {
    pageTitle: "Lunch Menu - BOUS Persian Cuisine",
    sectionLabel: "Lunch menu",
    heading: "Lunch Menu",
    menuTitle: "Table d'Hôte Menu",
    price: "$45 per person",
    includes: "Includes one starter and one main",
    pdfHref: "/lunch-menu.pdf",
    pdfLabel: "Open PDF menu",
    reserveLabel: "Make a reservation",
    addOnsTitle: "À La Carte & Optional Add-ons",
    sections: [
      {
        title: "Starters",
        detail: "Choose one",
        items: [
          {
            name: "Kashk-o-Bademjoon",
            description:
              "Charcoal-smoked eggplant, kashk, crispy onion, mint, and fried garlic",
          },
          {
            name: "Tahchin & Yogurt",
            description:
              "Crispy saffron rice served over our house-made yogurt, topped with barberries and pistachio",
          },
          {
            name: "Watermelon and Grilled Peach Salad",
            description: "Watermelon, charcoaled peach, mint, feta, dressing",
          },
          {
            name: "Garden Salad Shirazi",
            description: "Cucumber, tomato, onion, mint, and verjus",
          },
          {
            name: "Sour Mushrooms",
            description:
              "Charcoal-grilled mushrooms marinated with butter and Qara Qurut",
          },
        ],
      },
      {
        title: "Mains",
        detail: "Choose one",
        items: [
          {
            name: "Koobideh Kabab Plate",
            description:
              "Charcoal-grilled ground beef, grilled vegetables, and Persian rice",
          },
          {
            name: "Joojeh Kabab Plate",
            description:
              "Saffron-marinated Quebec chicken breast, grilled vegetables, and Persian rice",
          },
          {
            name: "Fish Kabab Plate",
            description:
              "Charcoal-grilled fish, Persian spices, grilled vegetables, and Persian rice",
          },
          {
            name: "Mixed Vegetarian Grill",
            description:
              "Seasonal grilled vegetables, herbs, and Persian rice",
          },
        ],
      },
    ],
    addOnColumns: [
      [
        {
          name: "Barg Kabab",
          price: "54",
          description: "Charcoal-grilled beef tenderloin",
        },
        {
          name: "Shishlik",
          price: "65",
          description: "Charcoal-grilled Kamouraska lamb chops",
        },
        {
          name: "Duck Fesenjoon",
          price: "48",
          description:
            "Duck leg confit, slow cooked walnut with pomegranate molasses",
        },
      ],
      [
        {
          name: "Mast-o-Moosir",
          price: "14",
          description: "House-made yogurt, Persian shallots",
        },
        {
          name: "Borani Bademjoon",
          price: "14",
          description: "House-made yogurt, smoked eggplant, spices",
        },
        {
          name: "Persian Rice",
          price: "8",
          description: "Northern Iranian rice, saffron",
        },
      ],
    ],
    dessert: {
      name: "Dessert of the day",
      price: "11",
    },
  },
  fr: {
    pageTitle: "Menu midi - BOUS Cuisine perse",
    sectionLabel: "Menu midi",
    heading: "Menu midi",
    menuTitle: "Menu Table d'Hôte",
    price: "45 $ par personne",
    includes: "Une entrée et un plat principal inclus",
    pdfHref: "/lunch-menu.pdf",
    pdfLabel: "Ouvrir le menu PDF",
    reserveLabel: "Faire une réservation",
    addOnsTitle: "À la carte et ajouts optionnels",
    sections: [
      {
        title: "Entrées",
        detail: "Choisissez une entrée",
        items: [
          {
            name: "Kashk-o-Bademjoon",
            description:
              "Aubergine fumée, kashk, oignons croustillants, menthe, ail frit",
          },
          {
            name: "Tahchin & yogourt",
            description:
              "Riz safrané croustillant servi sur notre yogourt maison, garni d'épine-vinettes et de pistaches",
          },
          {
            name: "Salade de melon d'eau et pêche grillée",
            description:
              "Melon d'eau, pêche grillée au charbon, menthe, feta et vinaigrette",
          },
          {
            name: "Salade Shirazi du jardin",
            description: "Concombre, tomate, oignon, menthe et verjus",
          },
          {
            name: "Champignons acidulés",
            description:
              "Champignons grillés au charbon, marinés au beurre et au qara qurut",
          },
        ],
      },
      {
        title: "Plats principaux",
        detail: "Choisissez un plat",
        items: [
          {
            name: "Assiette de kabab koobideh",
            description:
              "Bœuf haché grillé au charbon, légumes grillés et riz persan",
          },
          {
            name: "Assiette de joojeh kabab",
            description:
              "Poitrine de poulet du Québec marinée au safran, légumes grillés et riz persan",
          },
          {
            name: "Assiette de kabab de poisson",
            description:
              "Poisson grillé au charbon, épices persanes, légumes grillés et riz persan",
          },
          {
            name: "Grillade végétarienne mixte",
            description:
              "Légumes de saison grillés, herbes fraîches et riz persan",
          },
        ],
      },
    ],
    addOnColumns: [
      [
        {
          name: "Barg Kabab",
          price: "54",
          description: "Filet de bœuf grillé au charbon",
        },
        {
          name: "Shishlik",
          price: "65",
          description: "Côtelettes d'agneau de Kamouraska grillées au charbon",
        },
        {
          name: "Duck Fesenjoon",
          price: "48",
          description:
            "Confit de cuisse de canard, noix mijotées à la mélasse de grenade",
        },
      ],
      [
        {
          name: "Mast-o-Moosir",
          price: "14",
          description: "Yogourt maison, échalotes persanes",
        },
        {
          name: "Borani Bademjoon",
          price: "14",
          description: "Yogourt maison, aubergine fumée, épices",
        },
        {
          name: "Persian Rice",
          price: "8",
          description: "Riz du nord de l'Iran, safran",
        },
      ],
    ],
    dessert: {
      name: "Dessert du moment",
      price: "11",
    },
  },
};

function LunchMenuItemRow({ item }: { item: LunchMenuItem }) {
  return (
    <li className="text-center">
      <p className="text-base leading-6 text-bous-burgundy">
        <span className="font-semibold">{item.name}</span>
        {item.price ? (
          <span className="ml-1 font-normal tabular-nums">{item.price}</span>
        ) : null}
      </p>
      {item.description ? (
        <p className="mx-auto mt-1 max-w-[65ch] text-base leading-6 text-bous-burgundy/88">
          {item.description}
        </p>
      ) : null}
    </li>
  );
}

function LunchSection({ section }: { section: LunchMenuSection }) {
  return (
    <section className="text-center">
      <h2 className="font-operetta text-2xl font-normal leading-tight text-bous-burgundy">
        {section.title}
      </h2>
      <p className="mt-1.5 text-base leading-6 text-bous-burgundy/72">
        {section.detail}
      </p>
      <ol className="mt-6 space-y-4">
        {section.items.map((item) => (
          <LunchMenuItemRow key={item.name} item={item} />
        ))}
      </ol>
    </section>
  );
}

export default function LunchMenu() {
  const { language } = useLanguage();
  const copy = lunchMenuCopy[language];

  return (
    <MenuPageLayout
      active="lunch"
      heading={copy.heading}
      pdfHref={copy.pdfHref}
      pdfLabel={copy.pdfLabel}
      reserveLabel={copy.reserveLabel}
      sectionLabel={copy.sectionLabel}
      title={copy.pageTitle}
    >
      <div>
        <div className="text-center">
          <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-bous-red">
            {copy.menuTitle}
          </h2>
          <p className="font-operetta mt-3 text-3xl font-light leading-tight text-bous-burgundy">
            {copy.price}
          </p>
          <p className="mt-2 text-base leading-6 text-bous-burgundy/72">
            {copy.includes}
          </p>
        </div>

        <div className="mt-14 space-y-14 sm:mt-16 sm:space-y-16">
          {copy.sections.map((section) => (
            <LunchSection key={section.title} section={section} />
          ))}
        </div>

        <section className="mt-14 text-center sm:mt-16">
          <h2 className="font-operetta text-2xl font-normal leading-tight text-bous-burgundy">
            {copy.addOnsTitle}
          </h2>
          <ol className="mt-6 space-y-4">
            {copy.addOnColumns.flat().map((item) => (
              <LunchMenuItemRow key={item.name} item={item} />
            ))}
          </ol>
          <ol className="mt-4">
            <LunchMenuItemRow item={copy.dessert} />
          </ol>
        </section>
      </div>
    </MenuPageLayout>
  );
}
