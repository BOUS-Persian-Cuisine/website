import { MenuPageLayout } from "@/components/MenuPageLayout";
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
    heading: string;
    pdfLabel: string;
    reserveLabel: string;
  }
> = {
  en: {
    pageTitle: "Drinks Menu - BOUS Persian Cuisine",
    sectionLabel: "Drinks menu",
    heading: "Drinks Menu",
    pdfLabel: "Open PDF menu",
    reserveLabel: "Make a reservation",
  },
  fr: {
    pageTitle: "Carte des boissons - BOUS Cuisine perse",
    sectionLabel: "Carte des boissons",
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
    <li className="text-center">
      <p className="text-base leading-6 text-bous-burgundy">
        <span className="font-semibold">{item.name}</span>
        {item.price ? (
          <span className="ml-1 font-normal tabular-nums">{item.price}</span>
        ) : null}
      </p>
      {item.description ? (
        <p className="mx-auto mt-1 max-w-[65ch] text-base leading-6 text-bous-burgundy/88">
          {item.description[language]}
        </p>
      ) : null}
    </li>
  );
}

export default function DrinksMenu() {
  const { language } = useLanguage();
  const copy = pageCopy[language];

  return (
    <MenuPageLayout
      active="drinks"
      heading={copy.heading}
      pdfHref="/drinks-menu.pdf"
      pdfLabel={copy.pdfLabel}
      reserveLabel={copy.reserveLabel}
      sectionLabel={copy.sectionLabel}
      title={copy.pageTitle}
    >
      <div>
        {drinkSections.map((section, sectionIndex) => (
          <section
            key={section.title.en}
            className={
              sectionIndex > 0
                ? "mt-14 sm:mt-16"
                : undefined
            }
          >
            <h2 className="font-operetta text-center text-2xl font-normal leading-tight text-bous-burgundy">
              <span>{section.title[language]}</span>
              {section.price ? (
                <span className="ml-1 text-xl font-light tabular-nums">
                  {section.price}
                </span>
              ) : null}
            </h2>
            <ol className="mt-6 space-y-4">
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
    </MenuPageLayout>
  );
}
