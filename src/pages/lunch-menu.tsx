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
  addOns: LunchMenuItem[];
  note: string;
};

const lunchMenuCopy: Record<Language, LunchMenuCopy> = {
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
        name: "Borani Bademjoon",
        price: "14",
        description: "Eggplant, yogurt, garlic, and herbs"
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
        name: "Borani Bademjoon",
        price: "14",
        description: "Aubergine, yogourt, ail et fines herbes."
      },
      {
        name: "Dessert du jour",
        price: "11"
      }
    ],
    note: "Pour les options végétariennes, renseignez-vous auprès de votre serveur."
  }
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
            {copy.addOns.map((item) => (
              <LunchMenuItemRow key={item.name} item={item} />
            ))}
          </ol>
          <p className="mt-6 text-sm text-bous-burgundy/80">{copy.note}</p>
        </section>
      </div>
    </MenuPageLayout>
  );
}
