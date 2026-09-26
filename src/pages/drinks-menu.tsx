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
  intro?: LocalizedText;
  note?: LocalizedText;
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
    price: "23",
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
          fr: "Vodka - jasmin, fraise, beurre, micro-roquette",
        },
      },
      {
        name: "Shiraz Chai Daiquiri",
        description: {
          en: "Silver rum - smoked tea, figs",
          fr: "Rhum blanc - thé fumé, figues",
        },
      },
      {
        name: "Above Alborz",
        price: "25",
        description: {
          en: "Exotic citrus gin - saffron cream, egg whites, fizz",
          fr: "Gin aux agrumes exotiques - crème au safran, blanc d'œuf, fizz",
        },
      },
    ],
  },
  {
    title: { en: "Alcoholic Sharbats", fr: "Sharbats Alcoolisés" },
    items: [
      {
        name: "Vodka Zereshk",
        price: "19",
        description: {
          en: "Vodka - barberry, Persian sour tea, poached barberries",
          fr: "Vodka - épine-vinette, thé aigre persan, épines-vinettes pochées",
        },
      },
      {
        name: "Gin Sekanjebin",
        price: "19",
        description: {
          en: "Gin - mint, rosewater, white wine vinegar, cucumber",
          fr: "Gin - menthe, eau de rose, vinaigre de vin blanc, concombre",
        },
      },
      {
        name: "Saffron Martini",
        price: "20",
        description: {
          en: "Saffron-infused gin - served with olives and ghooreh",
          fr: "Gin infusé au safran - servi avec olives et ghooreh",
        },
      },
    ],
  },
  {
    title: { en: "Sharbats", fr: "Sharbats" },
    price: "14",
    intro: {
      en: "In Iran, welcoming a guest often begins with a glass of sharbat. Made with fruits, herbs or floral waters, it is a refreshing gesture of Persian hospitality.",
      fr: "En Iran, l’accueil d’un invité commence souvent par un verre de sharbat. Préparé à base de fruits, d’herbes ou d’eaux florales, il est une expression rafraîchissante de l’hospitalité persane.",
    },
    items: [
      {
        name: "Zereshk",
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
        name: "Gol-Gav-Zabaan",
        description: {
          en: "Borage tea, dried lime, lemon",
          fr: "Tisane de bourrache, lime séchée, citron",
        },
      },
      {
        name: "Golab",
        description: {
          en: "Saffron, rosewater, basil seeds",
          fr: "Safran, eau de rose, graines de basilic",
        },
      },
      {
        name: "Bahar Narej",
        description: {
          en: "Willow extract, orange blossom water, flixweed seeds, simple syrup",
          fr: "Extrait de saule, eau de fleur d’oranger, graines de flixweed, sirop simple",
        },
      },
    ],
  },
  {
    title: { en: "Persian Classics", fr: "Classiques persans" },
    price: "6",
    items: [
      {
        name: "Abeali Doogh",
        description: {
          en: "Carbonated yogurt drink",
          fr: "Boisson gazeuse au yogourt",
        },
      },
      {
        name: "Persian Fanta",
        description: { en: "Persian Fanta", fr: "Fanta persane" },
      },
      {
        name: "Persian Lemonade",
        description: { en: "Persian lemonade", fr: "Limonade persane" },
      },
    ],
  },
  {
    title: { en: "Beers", fr: "Bières" },
    note: {
      en: "Please ask your server about our beer selection.",
      fr: "Renseignez-vous auprès de votre serveur sur notre sélection de bières.",
    },
    items: [],
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
            {section.intro ? (
              <p className="mx-auto mt-4 max-w-[65ch] text-center text-base leading-6 text-bous-burgundy/88">
                {section.intro[language]}
              </p>
            ) : null}
            {section.items.length > 0 ? (
              <ol className="mt-6 space-y-4">
                {section.items.map((item) => (
                  <DrinkItemRow
                    key={`${section.title.en}-${item.name}`}
                    item={item}
                    language={language}
                  />
                ))}
              </ol>
            ) : null}
            {section.note ? (
              <p className="mx-auto mt-4 max-w-[65ch] text-center text-base leading-6 text-bous-burgundy/88">
                {section.note[language]}
              </p>
            ) : null}
          </section>
        ))}
      </div>
    </MenuPageLayout>
  );
}
