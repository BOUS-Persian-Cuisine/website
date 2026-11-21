import styles from "@/styles/dinner-menu.module.css";
import type { Language } from "@/context/LanguageContext";
import { MenuPageLayout } from "@/components/MenuPageLayout";
import { useLanguage } from "@/context/LanguageContext";

type MenuItem = {
  name: string;
  price?: string;
  description?: string;
};

type MenuCopy = {
  pageTitle: string;
  sectionLabel: string;
  heading: string;
  pdfHref: string;
  pdfLabel: string;
  reserveLabel: string;
  groups: { title: string; items: MenuItem[]; note?: string }[];
};

const menuCopy: Record<Language, MenuCopy> = {
  en: {
    pageTitle: "Dinner Menu - BOUS Persian Cuisine",
    sectionLabel: "Dinner menu",
    heading: "Dinner Menu",
    pdfHref: "/dinner-menu-en.pdf",
    pdfLabel: "Open PDF menu",
    reserveLabel: "Make a reservation",
    groups: [
      {
        title: "TO BEGIN",
        items: [
          {
            name: "Sangak Bread",
            price: "6",
            description: "Traditional Persian sourdough flatbread"
          },
          {
            name: "Maast-o-Khiar",
            price: "18",
            description: "House-Made Yogurt, Cucumber, Kashan Rose Petal, Walnut, Herbs"
          },
          {
            name: "Zeyton Parvardeh",
            price: "20",
            description: "Green Olive, Walnut, Pomegranate, Olive oil, Garlic, Tarragon, Herbs"
          },
          {
            name: "Spicy Saffron Chicken Wings",
            price: "18",
            description: "Chicken wingette, Saffron, Aleppo pepper"
          },
          {
            name: "Golden Square Mile Tahchin",
            price: "22",
            description: "Crispy saffron rice, Spring herbs, Barberries, Pistachio"
          },
          {
            name: "Kashk-o-Bademjoon",
            price: "28",
            description: "Smoked eggplant, Kashk, Crispy onion, Mint, Fried garlic"
          },
          {
            name: "Season Special | Ghalieh Meygoo",
            price: "32",
            description: "Argentinian King Shrimp, cooked herbs, Garlic, tamarine, hot chili"
          }
        ]
      },
      {
        title: "PERSIAN CAVIAR",
        items: [
          {
            name: "CAVIAR on Tahdig Bites",
            price: "48",
            description: "Persian Baerii Caviar, three bites of rice and bread tahdig, house-made yogurt"
          },
          {
            name: "CAVIAR on Saffron Tahchin",
            price: "65",
            description: "Persian Ossetra Caviar, Pistachio, Barberry"
          }
        ]
      },
      {
        title: "FROM THE CHARCOAL GRILL",
        items: [
          {
            name: "Koobideh Kabab",
            price: "36",
            description: "Charcoal-grilled ground beef, Grilled vegetables"
          },
          {
            name: "Joojeh Kabab",
            price: "38",
            description: "Charcoal-grilled saffron-marinated Quebec chicken breast, Grilled vegetables"
          },
          {
            name: "Barg Kabab",
            price: "56",
            description: "Charcoal-grilled beef tenderloin, Grilled Vegetables"
          },
          {
            name: "Shishlik",
            price: "65",
            description: "Charcoal-grilled Kamouraska Lamb Chops, Grilled Vegetables"
          },
          {
            name: "Branzino",
            price: "75",
            description: "Charcoal-grilled whole branzino, pistachios & barberries, served on traditional Northern Iranian rice, smoke-cured with dried rice stalks"
          },
          {
            name: "Season Special | Qafqazi Lamb",
            price: "62",
            description: "Quebec Lamb Tenderloin, Grilled Vegetables, Pomegranate and Walnut, Assorted Mushrooms, Fresh Herbs"
          }
        ]
      },
      {
        title: "SLOW-COOKED",
        items: [
          {
            name: "Duck Fesenjoon *",
            price: "48",
            description: "Duck leg confit, Slow-cooked walnuts with pomegranate molasses"
          },
          {
            name: "Kamouraska Lamb Ghormeh Sabzi *",
            price: "55",
            description: "Braised lamb shank, five-herb sauce, Red beans, Dried lime"
          },
          {
            name: "Season Special | Morasa Polo with Lamb Neck",
            price: "65",
            description: "Quebec lamb neck, Barberry, Pistachios, Almond, Saffron, Orange peel, Carrot, Northern Iranian rice"
          }
        ],
        note: "* Vegan option available"
      },
      {
        title: "ACCOMPANIMENTS",
        items: [
          {
            name: "Saffron Rice",
            price: "9",
            description: "Northern Iranian Rice, Saffron"
          },
          {
            name: "Salad Shirazi",
            price: "11",
            description: "Cucumber, Tomato, Onion, Mint, Verjus"
          },
          {
            name: "Maast-o-Moosir",
            price: "7",
            description: "House-Made Yogurt, Persian shallots"
          },
          {
            name: "Mirza Ghasemi",
            price: "7",
            description: "Smoked eggplant, Tomato, Garlic"
          },
          {
            name: "Borani Esfenaj",
            price: "7",
            description: "House-Made Yogurt, Spinach, Spices"
          },
          {
            name: "Sir Torshi",
            price: "7",
            description: "Aged pickled garlic"
          },
          {
            name: "Torshi Naz Khaton",
            price: "7",
            description: "Pickled Mixed chopped veggie with Spices"
          },
          {
            name: "Torshi Quebec Spicy Albaloo",
            price: "7",
            description: "Pickled Quebec sour cherry with jalapeno"
          },
          {
            name: "Barberry and Onion Torshi",
            price: "7",
            description: "Pickled Barberry with Red onion"
          },
          {
            name: "Side Mix Platter 3/6",
            price: "20/30"
          }
        ]
      }
    ],
  },
  fr: {
    pageTitle: "Menu du soir - BOUS Cuisine perse",
    sectionLabel: "Menu du soir",
    heading: "Menu du soir",
    pdfHref: "/dinner-menu-fr.pdf",
    pdfLabel: "Ouvrir le menu PDF",
    reserveLabel: "Faire une réservation",
    groups: [
      {
        title: "Pour commencer",
        items: [
          {
            name: "Pain Sangak",
            price: "6",
            description: "Pain plat persan traditionnel au levain"
          },
          {
            name: "Maast-o-Khiar",
            price: "18",
            description: "Yogourt maison, concombre, pétales de rose de Kashan, noix et herbes"
          },
          {
            name: "Zeyton Parvardeh",
            price: "20",
            description: "Olives vertes, noix, grenade, huile d’olive, ail, estragon et herbes"
          },
          {
            name: "Ailes de poulet épicées au safran",
            price: "18",
            description: "Ailerons de poulet, safran et piment d’Alep"
          },
          {
            name: "Tahchin du Mille carré doré",
            price: "22",
            description: "Riz croustillant au safran, herbes printanières, épines-vinettes et pistaches"
          },
          {
            name: "Kashk-o-Bademjoon",
            price: "28",
            description: "Aubergine fumée, kashk, oignons croustillants, menthe et ail frit"
          },
          {
            name: "Spécial de saison | Ghalieh Meygoo",
            price: "32",
            description: "Grosses crevettes d’Argentine, herbes mijotées, ail, tamarin et piment fort"
          }
        ]
      },
      {
        title: "Caviar persan",
        items: [
          {
            name: "Caviar sur bouchées de tahdig",
            price: "48",
            description: "Caviar persan Baerii, trois bouchées de tahdig de riz et de pain, yogourt maison"
          },
          {
            name: "Caviar sur tahchin au safran",
            price: "65",
            description: "Caviar persan Ossetra, pistaches et épines-vinettes"
          }
        ]
      },
      {
        title: "Grillades au charbon",
        items: [
          {
            name: "Koobideh Kabab",
            price: "36",
            description: "Bœuf haché grillé au charbon, légumes grillés"
          },
          {
            name: "Joojeh Kabab",
            price: "38",
            description: "Poitrine de poulet du Québec marinée au safran et grillée au charbon, légumes grillés"
          },
          {
            name: "Barg Kabab",
            price: "56",
            description: "Filet de bœuf grillé au charbon, légumes grillés"
          },
          {
            name: "Shishlik",
            price: "65",
            description: "Côtelettes d’agneau de Kamouraska grillées au charbon, légumes grillés"
          },
          {
            name: "Branzino",
            price: "75",
            description: "Bar entier grillé au charbon, pistaches et épines-vinettes, servi sur un riz du nord de l’Iran fumé à la paille de riz séchée"
          },
          {
            name: "Spécial de saison | Agneau Qafqazi",
            price: "62",
            description: "Filet d’agneau du Québec, légumes grillés, grenade, noix, assortiment de champignons et herbes fraîches"
          }
        ]
      },
      {
        title: "Plats mijotés",
        items: [
          {
            name: "Fesenjoon au canard *",
            price: "48",
            description: "Confit de cuisse de canard, noix mijotées à la mélasse de grenade"
          },
          {
            name: "Ghormeh Sabzi à l’agneau de Kamouraska *",
            price: "55",
            description: "Jarret d’agneau braisé, sauce aux cinq herbes, haricots rouges et lime séchée"
          },
          {
            name: "Spécial de saison | Morasa Polo au cou d’agneau",
            price: "65",
            description: "Cou d’agneau du Québec, épines-vinettes, pistaches, amandes, safran, zeste d’orange, carottes et riz du nord de l’Iran"
          }
        ],
        note: "* Option végétalienne disponible"
      },
      {
        title: "Accompagnements",
        items: [
          {
            name: "Riz au safran",
            price: "9",
            description: "Riz du nord de l’Iran et safran"
          },
          {
            name: "Salade Shirazi",
            price: "11",
            description: "Concombre, tomate, oignon, menthe et verjus"
          },
          {
            name: "Maast-o-Moosir",
            price: "7",
            description: "Yogourt maison et échalotes persanes"
          },
          {
            name: "Mirza Ghasemi",
            price: "7",
            description: "Aubergine fumée, tomate et ail"
          },
          {
            name: "Borani Esfenaj",
            price: "7",
            description: "Yogourt maison, épinards et épices"
          },
          {
            name: "Sir Torshi",
            price: "7",
            description: "Ail mariné vieilli"
          },
          {
            name: "Torshi Naz Khaton",
            price: "7",
            description: "Mélange de légumes hachés et marinés aux épices"
          },
          {
            name: "Torshi de griottes épicées du Québec",
            price: "7",
            description: "Griottes du Québec marinées au jalapeño"
          },
          {
            name: "Torshi aux épines-vinettes et à l’oignon",
            price: "7",
            description: "Épines-vinettes marinées à l’oignon rouge"
          },
          {
            name: "Assiette de 3 ou 6 accompagnements",
            price: "20/30"
          }
        ]
      }
    ],
  },
};

function MenuItems({ items }: { items: MenuItem[] }) {
  return (
    <ul className={styles.items}>
      {items.map((item) => {
        const [prefix, special] = item.name.split(" | ");
        return (
          <li key={item.name}>
            <div className={styles.row}>
              <strong>{special ? <><em>{prefix} | </em>{special}</> : item.name}</strong>
              <span className={styles.price}>{item.price}</span>
            </div>
            {item.description && <p>{item.description}</p>}
          </li>
        );
      })}
    </ul>
  );
}

function MenuSection({ group }: { group: MenuCopy["groups"][number] }) {
  return (
    <section>
      <h2>{group.title}</h2>
      <MenuItems items={group.items} />
      {group.note && <p className={styles.note}>{group.note}</p>}
    </section>
  );
}

export default function Menu() {
  const { language } = useLanguage();
  const copy = menuCopy[language];
  const [starters, caviar, grill, slowCooked, sides] = copy.groups;
  const halfway = Math.ceil(sides.items.length / 2);

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
      <div className={styles.sheet}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <MenuSection group={starters} />
            <MenuSection group={caviar} />
          </div>
          <div className={styles.column}>
            <MenuSection group={grill} />
            <MenuSection group={slowCooked} />
          </div>
        </div>
        <section className={styles.sides}>
          <h2>{sides.title}</h2>
          <div className={styles.columns}>
            <MenuItems items={sides.items.slice(0, halfway)} />
            <MenuItems items={sides.items.slice(halfway)} />
          </div>
        </section>
      </div>
    </MenuPageLayout>
  );
}
