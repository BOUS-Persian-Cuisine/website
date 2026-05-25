import type { Language } from "@/context/LanguageContext";
import { SiteLayout } from "@/components/SiteLayout";
import { useLanguage } from "@/context/LanguageContext";

type MenuItem = {
  name: string;
  price?: string;
  description: string;
};

type MenuCopy = {
  pageTitle: string;
  sectionLabel: string;
  eyebrow: string;
  heading: string;
  pdfHref: string;
  pdfLabel: string;
  note: string;
  groups: MenuItem[][];
};

const menuCopy: Record<Language, MenuCopy> = {
  en: {
    pageTitle: "Menu - BOUS Persian Cuisine",
    sectionLabel: "Soft opening menu",
    eyebrow: "Soft opening",
    heading: "Menu",
    pdfHref: "/menu-soft-opening-en.pdf",
    pdfLabel: "Open PDF menu",
    note: "* Vegetarian option available.",
    groups: [
      [
        {
          name: "Sangak Bread",
          description: "Traditional Persian sourdough flatbread",
        },
        {
          name: "Paneer Sabzi",
          price: "9",
          description:
            "Feta cheese, Black Sesame, Fresh herbs, Walnuts, Radish",
        },
        {
          name: "Maast-o-Khiar",
          price: "18",
          description:
            "House-Made Yogurt, Cucumber, Kashan Rose Petal, Walnut, Garlic, Herbs",
        },
        {
          name: "Spicy Saffron Chicken Wings",
          price: "17",
          description: "Chicken wingette, Saffron, Aleppo pepper",
        },
        {
          name: "Golden Square Mile Tahchin",
          price: "22",
          description:
            "Crispy saffron rice, Spring herbs, Barberries, Pistachio",
        },
        {
          name: "Kashk-o-Bademjoon",
          price: "24",
          description: "Smoked eggplant, Kashk, Crispy onion, Mint, Fried garlic",
        },
      ],
      [
        {
          name: "Koobideh Kabab",
          price: "32",
          description: "Charcoal-grilled ground beef, Grilled vegetables",
        },
        {
          name: "Joojeh Kabab",
          price: "38",
          description:
            "Charcoal-grilled saffron-marinated Quebec chicken breast, Grilled vegetables",
        },
        {
          name: "Barg Kabab",
          price: "54",
          description: "Charcoal-grilled beef tenderloin, Grilled Vegetables",
        },
        {
          name: "Shishlik",
          price: "65",
          description:
            "Charcoal-grilled Kamouraska Lamb Chops, Grilled Vegetables",
        },
      ],
      [
        {
          name: "Duck Fesenjoon *",
          price: "48",
          description:
            "Duck leg confit, Slow Cooked Walnut with Pomegranate Molasses",
        },
        {
          name: "Kamouraska Lamb Ghormeh Sabzi *",
          price: "55",
          description:
            "Braised lamb shank, five-herb sauce, Red beans, Dried lime",
        },
      ],
      [
        {
          name: "Salad Shirazi",
          price: "13",
          description: "Cucumber, Tomato, Onion, Mint, Verjus",
        },
        {
          name: "Maast-o-Moosir",
          price: "14",
          description: "House-Made Yogurt, Persian shallots",
        },
        {
          name: "Borani Bademjoon",
          price: "14",
          description: "House-Made Yogurt, Smoked eggplant, Spices",
        },
        {
          name: "Saffron Rice",
          price: "8",
          description: "Northern Iranian Rice, Saffron",
        },
        {
          name: "Sir Torshi",
          price: "5",
          description: "Aged pickled garlic",
        },
      ],
    ],
  },
  fr: {
    pageTitle: "Menu - BOUS Cuisine perse",
    sectionLabel: "Menu d'ouverture progressive",
    eyebrow: "Ouverture progressive",
    heading: "Menu",
    pdfHref: "/menu-soft-opening-fr.pdf",
    pdfLabel: "Ouvrir le menu PDF",
    note: "* Option végétarienne disponible",
    groups: [
      [
        {
          name: "Pain Sangak",
          description: "Pain plat persan traditionnel au levain",
        },
        {
          name: "Paneer Sabzi",
          price: "9",
          description: "Feta, sésame noir, herbes fraîches, noix, radis",
        },
        {
          name: "Maast-o-Khiar",
          price: "18",
          description:
            "Yogourt maison, concombre, pétales de rose de Kashan, noix, ail, herbes",
        },
        {
          name: "Ailes de poulet épicées au safran",
          price: "17",
          description: "Ailerons de poulet, safran, piment d’Alep",
        },
        {
          name: "Mille carré doré Tahchin",
          price: "22",
          description:
            "Riz croustillant au safran, herbes printanières, épines-vinettes, pistaches",
        },
        {
          name: "Kashk-o-Bademjoon",
          price: "24",
          description:
            "Aubergine fumée, kashk, oignons croustillants, menthe, ail frit",
        },
      ],
      [
        {
          name: "Koobideh Kabab",
          price: "32",
          description: "Bœuf haché grillé au charbon, légumes grillés",
        },
        {
          name: "Joojeh Kabab",
          price: "38",
          description:
            "Poitrine de poulet du Québec marinée au safran et grillée au charbon, légumes grillés",
        },
        {
          name: "Barg Kabab",
          price: "54",
          description: "Filet de bœuf grillé au charbon, légumes grillés",
        },
        {
          name: "Shishlik",
          price: "65",
          description:
            "Côtelettes d’agneau de Kamouraska grillées au charbon, légumes grillés",
        },
      ],
      [
        {
          name: "Fesenjoon au canard *",
          price: "48",
          description:
            "Confit de cuisse de canard, noix mijotées à la mélasse de grenade",
        },
        {
          name: "Ghormeh Sabzi d’agneau de Kamouraska *",
          price: "55",
          description:
            "Jarret d’agneau braisé, sauce aux cinq herbes, haricots rouges, lime séchée",
        },
      ],
      [
        {
          name: "Salade Shirazi",
          price: "13",
          description: "Concombre, tomate, oignon, menthe, verjus",
        },
        {
          name: "Maast-o-Moosir",
          price: "14",
          description: "Yogourt maison, échalotes persanes",
        },
        {
          name: "Borani Bademjoon",
          price: "14",
          description: "Yogourt maison, aubergine fumée, épices",
        },
        {
          name: "Riz au safran",
          price: "8",
          description: "Riz du nord de l’Iran, safran",
        },
        {
          name: "Sir Torshi",
          price: "5",
          description: "Ail mariné vieilli",
        },
      ],
    ],
  },
};

function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <li>
      <p className="font-operetta text-xl font-light leading-tight text-foreground sm:text-2xl">
        <span className="font-semibold">{item.name}</span>
        {item.price ? <span className="font-light"> {item.price}</span> : null}
      </p>
      <p className="mx-auto mt-2 max-w-3xl text-base leading-7 tracking-[0.01em] text-foreground/78 sm:text-lg sm:leading-8">
        {item.description}
      </p>
    </li>
  );
}

export default function Menu() {
  const { language } = useLanguage();
  const copy = menuCopy[language];

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
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <h1 className="font-operetta text-6xl font-light leading-none sm:text-7xl md:text-8xl">
                  {copy.heading}
                </h1>
                <a
                  href={copy.pdfHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 w-fit items-center justify-center border border-bous-gold/70 px-5 text-[0.72rem] uppercase tracking-[0.24em] text-bous-cream transition-colors hover:bg-bous-gold hover:text-bous-burgundy"
                >
                  {copy.pdfLabel}
                </a>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-5xl px-6 py-14 text-center sm:px-8 sm:py-18 lg:px-10 lg:py-22">
            {copy.groups.map((group, groupIndex) => (
              <div key={`menu-group-${groupIndex}`}>
                {groupIndex > 0 ? (
                  <div
                    className="mx-auto my-12 h-px w-24 bg-bous-gold/55 sm:my-16"
                    aria-hidden
                  />
                ) : null}
                <ol className="space-y-7 sm:space-y-8">
                  {group.map((item) => (
                    <MenuItemRow
                      key={`${item.name}-${item.price ?? "none"}`}
                      item={item}
                    />
                  ))}
                </ol>
              </div>
            ))}

            <p className="mt-16 text-sm tracking-[0.04em] text-foreground/72 sm:mt-20 sm:text-base">
              {copy.note}
            </p>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
