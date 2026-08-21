import { MenuSwitcher, RelatedMenuLinks } from "@/components/MenuSwitcher";
import { SiteLayout } from "@/components/SiteLayout";
import { getOpenTableReservationUrl } from "@/constants/links";
import { useLanguage, type Language } from "@/context/LanguageContext";

type LocalizedText = Record<Language, string>;

type DrinkItem = {
  name: string;
  price?: string;
  description?: LocalizedText;
};

type DrinkSection = {
  title: LocalizedText;
  price?: string;
  items: DrinkItem[];
};

const pageCopy: Record<
  Language,
  {
    pageTitle: string;
    sectionLabel: string;
    eyebrow: string;
    heading: string;
    pdfLabel: string;
    reserveLabel: string;
  }
> = {
  en: {
    pageTitle: "Drinks Menu - BOUS Persian Cuisine",
    sectionLabel: "Drinks menu",
    eyebrow: "Drinks",
    heading: "Drinks Menu",
    pdfLabel: "Open PDF menu",
    reserveLabel: "Make a reservation",
  },
  fr: {
    pageTitle: "Carte des boissons - BOUS Cuisine perse",
    sectionLabel: "Carte des boissons",
    eyebrow: "Boissons",
    heading: "Carte des boissons",
    pdfLabel: "Ouvrir le menu PDF",
    reserveLabel: "Faire une réservation",
  },
};

const drinkSections: DrinkSection[] = [
  {
    title: { en: "BOUS Signatures", fr: "Signatures BOUS" },
    price: "21",
    items: [
      {
        name: "A Persian Martini",
        description: {
          en: "Saint Laurent Gin, dry vermouth - olives, capers, fine herbs, huile de citron",
          fr: "Gin Saint Laurent, vermouth sec - olives, câpres, fines herbes, huile de citron",
        },
      },
      {
        name: "Saffron Silk",
        description: {
          en: "Mezcal or non-alcoholic - black tea, naranj, tonka, whey, sumac",
          fr: "Mezcal ou sans alcool - thé noir, naranj, tonka, lactosérum, sumac",
        },
      },
      {
        name: "Golestan",
        description: {
          en: "Tequila or non-alcoholic - black tea, mint, rosewater, honey",
          fr: "Tequila ou sans alcool - thé noir, menthe, eau de rose, miel",
        },
      },
      {
        name: "Roobousi",
        description: {
          en: "Rhum, arak - sesame, pear, bergamot, cardamom, mango",
          fr: "Rhum, arak - sésame, poire, bergamote, cardamome, mangue",
        },
      },
      {
        name: "Sabzeh",
        description: {
          en: "Acerum blanc, limoncello - pistachio, decaffeinated coffee distillate, clear cacao",
          fr: "Acerum blanc, limoncello - pistache, distillat de café décaféiné, cacao clair",
        },
      },
      {
        name: "Yasi",
        description: {
          en: "Vodka - jasmine, strawberry, butter, micro arugula",
          fr: "Vodka - jasmin, beurre à la fraise, micro-roquette",
        },
      },
      {
        name: "Shiraz Chai Daiquiri",
        description: {
          en: "White rum - smoked tea, figs",
          fr: "Rhum blanc - thé fumé, figues",
        },
      },
      {
        name: "Above Alborz",
        description: {
          en: "Exotic citrus gin - saffron cream, egg whites, fizz",
          fr: "Gin aux agrumes exotiques - crème au safran, blanc d'œuf, fizz",
        },
      },
    ],
  },
  {
    title: { en: "House", fr: "Créations maison" },
    items: [
      {
        name: "Vodka Barberry Bloom",
        price: "16",
        description: {
          en: "Vodka - barberry, Persian sour tea, poached barberries",
          fr: "Vodka - épine-vinette, thé aigre persan, épines-vinettes pochées",
        },
      },
      {
        name: "Gin Sekanjebin",
        price: "16",
        description: {
          en: "Gin - mint, rosewater, white wine vinegar, cucumber",
          fr: "Gin - menthe, eau de rose, vinaigre de vin blanc, concombre",
        },
      },
      {
        name: "Saffron Martini",
        price: "18",
        description: {
          en: "Saffron-infused gin - served with olives and ghooreh",
          fr: "Gin infusé au safran - servi avec olives et ghooreh",
        },
      },
    ],
  },
  {
    title: { en: "Sharbats", fr: "Sharbats" },
    price: "10",
    items: [
      {
        name: "Barberry Bloom",
        description: {
          en: "Barberry, Persian sour tea, poached barberries",
          fr: "Épine-vinette, thé aigre persan, épines-vinettes pochées",
        },
      },
      {
        name: "Sekanjebin",
        description: {
          en: "Mint, rosewater, white wine vinegar, cucumber",
          fr: "Menthe, eau de rose, vinaigre de vin blanc, concombre",
        },
      },
      {
        name: "Indigo Breeze",
        description: {
          en: "Borage tea, dried lime, lemon",
          fr: "Tisane de bourrache, lime séchée, citron",
        },
      },
      {
        name: "Golden Rose",
        description: {
          en: "Saffron, rosewater, basil seeds",
          fr: "Safran, eau de rose, graines de basilic",
        },
      },
      {
        name: "Willow Sun",
        description: {
          en: "Willow extract, orange blossom water, khakshir, simple syrup",
          fr: "Extrait de saule, eau de fleur d’oranger, khakshir, sirop simple",
        },
      },
    ],
  },
  {
    title: { en: "Persian Classics", fr: "Classiques persans" },
    price: "6",
    items: [
      {
        name: "Dough",
        description: {
          en: "Carbonated yogurt drink",
          fr: "Boisson gazeuse au yogourt",
        },
      },
      {
        name: "Persian Coke",
        description: { en: "Persian Coke", fr: "Coke perse" },
      },
      {
        name: "Persian Fanta",
        description: { en: "Persian Fanta", fr: "Fanta perse" },
      },
      {
        name: "Persian Lemonade",
        description: { en: "Persian lemonade", fr: "Limonade perse" },
      },
    ],
  },
  {
    title: { en: "Beers", fr: "Bières" },
    items: [
      { name: "Wills Bright Lager", price: "12" },
      { name: "Wills Hugo Blanche", price: "12" },
      { name: "Wills Brown Alem", price: "12" },
      { name: "Wills Ghost Farm IPA", price: "12" },
      { name: "Krombacher Pils Bouteilles", price: "12" },
      { name: "Krombacher Pils 0.0% Bouteilles", price: "10" },
    ],
  },
];

function DrinkItemRow({ item, language }: { item: DrinkItem; language: Language }) {
  return (
    <li>
      <p className="font-operetta text-xl font-light leading-tight text-foreground sm:text-2xl">
        <span className="font-semibold">{item.name}</span>
        {item.price ? <span className="font-light"> {item.price}</span> : null}
      </p>
      {item.description ? (
        <p className="mx-auto mt-2 max-w-3xl text-base leading-7 tracking-[0.01em] text-foreground/78 sm:text-lg sm:leading-8">
          {item.description[language]}
        </p>
      ) : null}
    </li>
  );
}

export default function DrinksMenu() {
  const { language } = useLanguage();
  const copy = pageCopy[language];
  const reservationUrl = getOpenTableReservationUrl(language);

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
            <div className="absolute inset-0 bg-bous-burgundy/82" aria-hidden />
            <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
              <p className="text-[0.72rem] uppercase tracking-[0.32em] text-bous-gold">
                {copy.eyebrow}
              </p>
              <h1 className="font-operetta text-6xl font-light leading-none sm:text-7xl md:text-8xl">
                {copy.heading}
              </h1>
            </div>
          </div>

          <div className="mx-auto max-w-5xl px-6 py-14 text-center sm:px-8 sm:py-18 lg:px-10 lg:py-22">
            <div className="mb-14 flex flex-col items-center justify-center gap-2 sm:mb-16">
              <MenuSwitcher active="drinks" />
              <a
                href="/drinks-menu.pdf"
                target="_blank"
                rel="noreferrer"
                className="brand-link inline-flex min-h-9 w-fit items-center justify-center px-2 text-[0.68rem] uppercase tracking-[0.22em] text-foreground/68 underline-offset-4 transition-colors hover:text-bous-red hover:underline"
              >
                {copy.pdfLabel}
              </a>
            </div>

            <div className="bg-bous-white/28 px-6 py-10 shadow-[0_18px_50px_rgba(53,5,20,0.08)] sm:px-8 sm:py-12">
              {drinkSections.map((section, sectionIndex) => (
                <section key={section.title.en}>
                  {sectionIndex > 0 ? (
                    <div
                      className="mx-auto my-12 h-px w-24 bg-bous-gold/55 sm:my-16"
                      aria-hidden
                    />
                  ) : null}
                  <h2 className="text-[0.76rem] uppercase tracking-[0.3em] text-bous-red">
                    {section.title[language]}
                    {section.price ? ` ${section.price}` : ""}
                  </h2>
                  <ol className="mt-8 space-y-7 sm:space-y-8">
                    {section.items.map((item) => (
                      <DrinkItemRow
                        key={`${section.title.en}-${item.name}`}
                        item={item}
                        language={language}
                      />
                    ))}
                  </ol>
                </section>
              ))}
            </div>

            <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-3 border-t border-bous-gold/35 pt-10 sm:mt-12">
              <a
                href={reservationUrl}
                className="inline-flex min-h-12 items-center justify-center border border-bous-red bg-bous-red px-6 text-[0.72rem] uppercase tracking-[0.22em] text-bous-white transition-colors hover:border-bous-burgundy hover:bg-bous-burgundy"
              >
                {copy.reserveLabel}
              </a>
              <RelatedMenuLinks active="drinks" />
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
