import { MenuSwitcher, RelatedMenuLinks } from "@/components/MenuSwitcher";
import { SiteLayout } from "@/components/SiteLayout";
import { OPENTABLE_RESERVATION_URL } from "@/constants/links";
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
  eyebrow: string;
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
    eyebrow: "Lunch",
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
    eyebrow: "Midi",
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
    <li>
      <p className="font-operetta text-xl font-light leading-tight text-foreground sm:text-2xl">
        <span className="font-semibold">{item.name}</span>
        {item.price ? <span className="font-light"> {item.price}</span> : null}
      </p>
      {item.description ? (
        <p className="mx-auto mt-2 max-w-3xl text-base leading-7 tracking-[0.01em] text-foreground/78 sm:text-lg sm:leading-8">
          {item.description}
        </p>
      ) : null}
    </li>
  );
}

function LunchSection({ section }: { section: LunchMenuSection }) {
  return (
    <section>
      <h2 className="text-[0.76rem] uppercase tracking-[0.3em] text-bous-red">
        {section.title}
      </h2>
      <p className="mt-3 text-base leading-7 tracking-[0.03em] text-foreground/70">
        {section.detail}
      </p>
      <ol className="mt-8 space-y-6 sm:space-y-7">
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
    <SiteLayout title={copy.pageTitle}>
      <main className="bg-bous-cream">
        <section
          aria-label={copy.sectionLabel}
          className="relative overflow-hidden bg-bous-cream"
        >
          <div className="relative isolate border-b border-bous-gold/30 bg-bous-burgundy text-bous-cream">
            <div
              className="absolute inset-0 bg-[url('/bous-real-tiles.jpg')] bg-cover bg-center opacity-[0.16]"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-bous-burgundy/82"
              aria-hidden
            />
            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
              <p className="text-[0.72rem] uppercase tracking-[0.32em] text-bous-gold">
                {copy.eyebrow}
              </p>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <h1 className="font-operetta text-6xl font-light leading-none sm:text-7xl md:text-8xl">
                  {copy.heading}
                </h1>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-5xl px-6 py-14 text-center sm:px-8 sm:py-18 lg:px-10 lg:py-22">
            <div className="mb-14 flex flex-col items-center justify-center gap-2 sm:mb-16">
              <MenuSwitcher active="lunch" />
              <a
                href={copy.pdfHref}
                target="_blank"
                rel="noreferrer"
                className="brand-link inline-flex min-h-9 w-fit items-center justify-center px-2 text-[0.68rem] uppercase tracking-[0.22em] text-foreground/68 underline-offset-4 transition-colors hover:text-bous-red hover:underline"
              >
                {copy.pdfLabel}
              </a>
            </div>

            <div className="bg-bous-white/28 px-6 py-10 shadow-[0_18px_50px_rgba(53,5,20,0.08)] sm:px-8 sm:py-12">
              <div className="mx-auto max-w-3xl border-b border-bous-gold/35 pb-10">
                <h2 className="text-[0.76rem] uppercase tracking-[0.3em] text-bous-red">
                  {copy.menuTitle}
                </h2>
                <p className="mt-4 font-operetta text-3xl font-light leading-tight text-foreground sm:text-4xl">
                  {copy.price}
                </p>
                <p className="mt-3 text-base leading-7 tracking-[0.03em] text-foreground/70 sm:text-lg">
                  {copy.includes}
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-3xl space-y-12 sm:mt-12 sm:space-y-14">
                {copy.sections.map((section) => (
                  <LunchSection key={section.title} section={section} />
                ))}
              </div>

              <div className="mx-auto my-12 h-px w-24 bg-bous-gold/55 sm:my-16" />

              <section>
                <h2 className="text-[0.76rem] uppercase tracking-[0.3em] text-bous-red">
                  {copy.addOnsTitle}
                </h2>
                <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
                  {copy.addOnColumns.map((column, index) => (
                    <ol
                      key={`lunch-add-ons-${index}`}
                      className="space-y-6 sm:space-y-7"
                    >
                      {column.map((item) => (
                        <LunchMenuItemRow key={item.name} item={item} />
                      ))}
                    </ol>
                  ))}
                </div>
                <ol className="mt-10">
                  <LunchMenuItemRow item={copy.dessert} />
                </ol>
              </section>
            </div>

            <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-3 border-t border-bous-gold/35 pt-10 sm:mt-12">
              <a
                href={OPENTABLE_RESERVATION_URL}
                className="inline-flex min-h-12 items-center justify-center border border-bous-red bg-bous-red px-6 text-[0.72rem] uppercase tracking-[0.22em] text-bous-white transition-colors hover:border-bous-burgundy hover:bg-bous-burgundy"
              >
                {copy.reserveLabel}
              </a>
              <RelatedMenuLinks active="lunch" />
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
