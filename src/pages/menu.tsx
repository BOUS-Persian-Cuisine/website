import type { Language } from "@/context/LanguageContext";
import { MenuPageLayout } from "@/components/MenuPageLayout";
import { useLanguage } from "@/context/LanguageContext";

type MenuItem = {
  name: string;
  price?: string;
  description: string;
};

type MenuCopy = {
  pageTitle: string;
  sectionLabel: string;
  heading: string;
  pdfHref: string;
  pdfLabel: string;
  reserveLabel: string;
  note: string;
  groups: MenuItem[][];
  dessertTitle: string;
  desserts: MenuItem[];
};

const menuCopy: Record<Language, MenuCopy> = {
  en: {
    pageTitle: "Dinner Menu - BOUS Persian Cuisine",
    sectionLabel: "Dinner menu",
    heading: "Dinner Menu",
    pdfHref: "/dinner-menu-en.pdf",
    pdfLabel: "Open PDF menu",
    reserveLabel: "Make a reservation",
    note: "* Vegetarian option available",
    groups: [
      [
        {
          name: "Sangak Bread",
          price: "6",
          description: "Traditional Persian sourdough flatbread",
        },
        {
          name: "Maast-o-Khiar",
          price: "18",
          description:
            "House-Made Yogurt, Cucumber, Kashan Rose Petal, Walnut, Herbs",
        },
        {
          name: "Zeyton Parvardeh",
          price: "20",
          description:
            "Green Olive, Walnut, Pomegranate, Olive oil, Garlic, Tarragon, Herbs",
        },
        {
          name: "Spicy Saffron Chicken Wings",
          price: "18",
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
          price: "28",
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
        {
          name: "Branzino",
          price: "72",
          description:
            "Charcoal-grilled whole branzino, pistachios & barberries, served on traditional Northern Iranian rice, smoke-cured with dried rice stalks",
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
        {
          name: "Summer Special | Albaloo Polo with Lamb Neck",
          price: "58",
          description:
            "Quebec lamb neck, Quebec sour cherries from Domaine Deslandes, Northern Iranian rice, pistachios, Saffron",
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
    dessertTitle: "Desserts",
    desserts: [
      {
        name: "Faloodeh",
        price: "12",
        description:
          "Frozen Rice Vermicelli, Lime & Rosewater Syrup, Poached Barberries, Lime",
      },
      {
        name: "Persian Love Cake",
        price: "14",
        description:
          "Cardamom Financier, Rosewater and Yogurt Mousse, Poached Rhubarb, Pistachios, Olive Oil, Rose Petals",
      },
      {
        name: "Chocolate Date Cake",
        price: "16",
        description:
          "Chocolate and Date Cake, Chocolate Date Sauce, Sesame Halva Icecream, Sesame Brittle",
      },
      {
        name: "Bastani Sonnati",
        price: "16",
        description:
          "Saffron, Rose and Pistachio Icecream, Clotted Cream, Ghorabieh, Freeze Dried Raspberry",
      },
    ],
  },
  fr: {
    pageTitle: "Menu du soir - BOUS Cuisine perse",
    sectionLabel: "Menu du soir",
    heading: "Menu du soir",
    pdfHref: "/dinner-menu-fr.pdf",
    pdfLabel: "Ouvrir le menu PDF",
    reserveLabel: "Faire une réservation",
    note: "* Option végétarienne disponible",
    groups: [
      [
        {
          name: "Pain Sangak",
          price: "6",
          description: "Pain plat persan traditionnel au levain",
        },
        {
          name: "Maast-o-Khiar",
          price: "18",
          description:
            "Yogourt maison, concombre, pétales de rose de Kashan, noix, herbes",
        },
        {
          name: "Zeyton Parvardeh",
          price: "20",
          description:
            "Olives vertes, noix, grenade, huile d’olive, ail, estragon, herbes",
        },
        {
          name: "Ailes de poulet épicées au safran",
          price: "18",
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
          price: "28",
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
        {
          name: "Branzino",
          price: "72",
          description:
            "Branzino entier grillé au charbon, pistaches et épine-vinette, servi sur un riz traditionnel du nord de l’Iran, fumé à la paille de riz séchée",
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
        {
          name: "Spécial d’été | Albaloo Polo au cou d’agneau",
          price: "58",
          description:
            "Cou d’agneau du Québec, griottes du Québec du Domaine Deslandes, riz du nord de l’Iran, pistaches, safran",
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
    dessertTitle: "Desserts",
    desserts: [
      {
        name: "Faloodeh",
        price: "12",
        description:
          "Vermicelles de riz glacés, sirop à la lime et à l'eau de rose, épine-vinettes pochées, lime",
      },
      {
        name: "Gâteau d'amour persan",
        price: "14",
        description:
          "Financier à la cardamome, mousse au yogourt et à l'eau de rose, rhubarbe pochée, pistaches, huile d'olive, pétales de rose",
      },
      {
        name: "Gâteau au chocolat et aux dattes",
        price: "16",
        description:
          "Gâteau au chocolat et aux dattes, sauce chocolat-dattes, crème glacée au halva de sésame, croquant au sésame",
      },
      {
        name: "Bastani Sonnati",
        price: "16",
        description:
          "Crème glacée au safran, à la rose et à la pistache, crème caillée, ghorabieh, framboises lyophilisées",
      },
    ],
  },
};

function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <li className="text-center">
      <p className="text-base leading-6 text-bous-burgundy">
        <span className="font-semibold">{item.name}</span>
        {item.price ? (
          <span className="ml-1 font-normal tabular-nums">{item.price}</span>
        ) : null}
      </p>
      <p className="mx-auto mt-1 max-w-[65ch] text-base leading-6 text-bous-burgundy/88">
        {item.description}
      </p>
    </li>
  );
}

export default function Menu() {
  const { language } = useLanguage();
  const copy = menuCopy[language];

  return (
    <MenuPageLayout
      active="dining"
      heading={copy.heading}
      pdfHref={copy.pdfHref}
      pdfLabel={copy.pdfLabel}
      reserveLabel={copy.reserveLabel}
      sectionLabel={copy.sectionLabel}
      title={copy.pageTitle}
    >
      <div>
        {copy.groups.map((group, groupIndex) => (
          <div
            key={`menu-group-${groupIndex}`}
            className={
              groupIndex > 0
                ? "mt-14 sm:mt-16"
                : undefined
            }
          >
            <ol className="space-y-4">
              {group.map((item) => (
                <MenuItemRow
                  key={`${item.name}-${item.price ?? "none"}`}
                  item={item}
                />
              ))}
            </ol>
          </div>
        ))}

        <p className="mt-14 text-center text-base text-bous-burgundy/82">
          {copy.note}
        </p>

        <section className="mt-16 text-center sm:mt-20">
          <h2 className="font-operetta text-2xl font-normal leading-tight text-bous-burgundy">
            {copy.dessertTitle}
          </h2>
          <ol className="mt-6 space-y-4">
            {copy.desserts.map((item) => (
              <MenuItemRow
                key={`${item.name}-${item.price ?? "none"}`}
                item={item}
              />
            ))}
          </ol>
        </section>
      </div>
    </MenuPageLayout>
  );
}
