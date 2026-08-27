import type { Language } from "@/context/LanguageContext";
import { MenuPageLayout } from "@/components/MenuPageLayout";
import { useLanguage } from "@/context/LanguageContext";

type GroupMenuCourse = {
  title: string;
  detail?: string;
  items: string[];
  isChoice?: boolean;
};

type GroupMenuPackage = {
  name: string;
  price: string;
  minimum: string;
  courses: GroupMenuCourse[];
};

type GroupMenuCopy = {
  pageTitle: string;
  sectionLabel: string;
  heading: string;
  intro: string;
  pdfHref: string;
  pdfLabel: string;
  reserveLabel: string;
  informationTitle: string;
  information: string[];
  packages: GroupMenuPackage[];
};

const groupMenuCopy: Record<Language, GroupMenuCopy> = {
  en: {
    pageTitle: "Group Menu - BOUS Persian Cuisine",
    sectionLabel: "Group menu",
    heading: "Group Menu",
    intro: "Shared set menus for parties of 8 guests or more.",
    pdfHref: "/group-menu-sofreh-mehmani-bazm.pdf",
    pdfLabel: "Open PDF menu",
    reserveLabel: "Make a reservation",
    informationTitle: "Group Dining Information",
    information: [
      "Minimum 8 guests",
      "Group menu selection is required for the entire table",
      "Final guest count required 48 hours prior to the event",
      "Dietary restrictions can be accommodated with advance notice",
      "Applicable taxes and an 18% service charge are additional",
    ],
    packages: [
      {
        name: "Sofreh",
        price: "$80 per person",
        minimum: "Minimum 8 Guests",
        courses: [
          {
            title: "For the Table",
            detail: "One of each item for every 4 guests",
            items: [
              "Sangak Bread",
              "Paneer Sabzi",
              "Maast-o-Khiar",
              "Kashk-o-Bademjoon",
            ],
          },
          {
            title: "Main Course",
            detail: "Choose One",
            isChoice: true,
            items: [
              "Koobideh Kabab",
              "Joojeh Kabab",
              "Duck Fesenjoon",
              "Vegetarian Cauliflower Fesenjoon",
            ],
          },
          {
            title: "Accompaniments",
            detail: "Shared for every 2 guests",
            items: ["Saffron Rice", "Maast-o-Moosir"],
          },
          {
            title: "Dessert",
            items: ["Dessert of the day"],
          },
          {
            title: "Tea Service",
            items: ["Persian Tea"],
          },
        ],
      },
      {
        name: "Mehmani",
        price: "$95 per person",
        minimum: "Minimum 8 Guests",
        courses: [
          {
            title: "Mehmani Opening",
            detail: "One of each item for every 4 guests",
            items: ["Sangak Bread", "Paneer Sabzi", "Maast-o-Khiar"],
          },
          {
            title: "Signature Course",
            detail: "One of each item for every 4 guests",
            items: ["Fresh Sangak Bread", "Kashk-o-Bademjoon", "Tahchin"],
          },
          {
            title: "Main Course",
            detail: "Choose One",
            isChoice: true,
            items: [
              "Joojeh Kabab",
              "Barg Kabab (+$5)",
              "Salmon Kabab",
              "Kamouraska Lamb Ghormeh Sabzi (+$5)",
              "Vegetarian Mushroom Ghormeh Sabzi",
            ],
          },
          {
            title: "Accompaniments",
            detail: "Shared for every 2 guests",
            items: ["Salad Shirazi", "Saffron Rice", "Maast-o-Moosir"],
          },
          {
            title: "Dessert",
            items: ["Dessert of the day"],
          },
          {
            title: "Tea Service",
            items: ["Persian Tea"],
          },
        ],
      },
      {
        name: "Bazm",
        price: "$125 per person",
        minimum: "Minimum 8 Guests",
        courses: [
          {
            title: "Welcome",
            items: ["Persian Cocktail/Sharbat"],
          },
          {
            title: "Bazm Opening",
            detail: "One of each item for every 4 guests",
            items: ["Sangak Bread", "Paneer Sabzi", "Maast-o-Khiar"],
          },
          {
            title: "Signature Course",
            detail: "One of each item for every 4 guests",
            items: [
              "Fresh Sangak Bread",
              "Kashk-o-Bademjoon",
              "Spicy Saffron Chicken Wings",
              "Tahchin",
            ],
          },
          {
            title: "Persian Feast",
            detail: "Shared for every 4 guests",
            items: ["Kamouraska Lamb Chops Fesenjoon"],
          },
          {
            title: "Main Course",
            detail: "Choose One",
            isChoice: true,
            items: [
              "Barg Kabab (+$5)",
              "Koobideh Kabab",
              "Joojeh Kabab",
              "Salmon Kabab",
              "Kamouraska Lamb Ghormeh Sabzi (+$5)",
              "Vegetarian Mushroom Ghormeh Sabzi",
            ],
          },
          {
            title: "Accompaniments",
            detail: "Shared for every 4 guests",
            items: [
              "Salad Shirazi",
              "Saffron Rice",
              "Borani Bademjoon",
              "Maast-o-Moosir",
              "Sir Torshi",
            ],
          },
          {
            title: "Dessert",
            items: ["Dessert of the day"],
          },
          {
            title: "Tea Ceremony",
            items: ["Persian Tea"],
          },
        ],
      },
    ],
  },
  fr: {
    pageTitle: "Menu de groupe - BOUS Cuisine perse",
    sectionLabel: "Menu de groupe",
    heading: "Menu de groupe",
    intro: "Menus partagés pour les groupes de 8 personnes ou plus.",
    pdfHref: "/group-menu-sofreh-mehmani-bazm.pdf",
    pdfLabel: "Ouvrir le menu PDF",
    reserveLabel: "Faire une réservation",
    informationTitle: "Information pour les groupes",
    information: [
      "Minimum 8 personnes",
      "La sélection du menu de groupe est requise pour toute la table",
      "Le nombre final d'invités est requis 48 heures avant l'événement",
      "Les restrictions alimentaires peuvent être accommodées avec un préavis",
      "Les taxes applicables et des frais de service de 18 % sont en sus",
    ],
    packages: [
      {
        name: "Sofreh",
        price: "80 $ par personne",
        minimum: "Minimum 8 personnes",
        courses: [
          {
            title: "Pour la table",
            detail: "Un de chaque item pour 4 personnes",
            items: [
              "Pain Sangak",
              "Paneer Sabzi",
              "Maast-o-Khiar",
              "Kashk-o-Bademjoon",
            ],
          },
          {
            title: "Plat principal",
            detail: "Choisir un",
            isChoice: true,
            items: [
              "Koobideh Kabab",
              "Joojeh Kabab",
              "Fesenjoon au canard",
              "Fesenjoon végétarien au chou-fleur",
            ],
          },
          {
            title: "Accompagnements",
            detail: "Partagé pour 2 personnes",
            items: ["Riz au safran", "Maast-o-Moosir"],
          },
          {
            title: "Dessert",
            items: ["Dessert du jour"],
          },
          {
            title: "Service de thé",
            items: ["Thé persan"],
          },
        ],
      },
      {
        name: "Mehmani",
        price: "95 $ par personne",
        minimum: "Minimum 8 personnes",
        courses: [
          {
            title: "Ouverture Mehmani",
            detail: "Un de chaque item pour 4 personnes",
            items: ["Pain Sangak", "Paneer Sabzi", "Maast-o-Khiar"],
          },
          {
            title: "Service signature",
            detail: "Un de chaque item pour 4 personnes",
            items: ["Pain Sangak frais", "Kashk-o-Bademjoon", "Tahchin"],
          },
          {
            title: "Plat principal",
            detail: "Choisir un",
            isChoice: true,
            items: [
              "Joojeh Kabab",
              "Barg Kabab (+5 $)",
              "Kabab de saumon",
              "Ghormeh Sabzi d'agneau de Kamouraska (+5 $)",
              "Ghormeh Sabzi végétarien aux champignons",
            ],
          },
          {
            title: "Accompagnements",
            detail: "Partagé pour 2 personnes",
            items: ["Salade Shirazi", "Riz au safran", "Maast-o-Moosir"],
          },
          {
            title: "Dessert",
            items: ["Dessert du jour"],
          },
          {
            title: "Service de thé",
            items: ["Thé persan"],
          },
        ],
      },
      {
        name: "Bazm",
        price: "125 $ par personne",
        minimum: "Minimum 8 personnes",
        courses: [
          {
            title: "Accueil",
            items: ["Cocktail persan/Sharbat"],
          },
          {
            title: "Ouverture Bazm",
            detail: "Un de chaque item pour 4 personnes",
            items: ["Pain Sangak", "Paneer Sabzi", "Maast-o-Khiar"],
          },
          {
            title: "Service signature",
            detail: "Un de chaque item pour 4 personnes",
            items: [
              "Pain Sangak frais",
              "Kashk-o-Bademjoon",
              "Ailes de poulet épicées au safran",
              "Tahchin",
            ],
          },
          {
            title: "Festin persan",
            detail: "Partagé pour 4 personnes",
            items: ["Côtelettes d'agneau de Kamouraska Fesenjoon"],
          },
          {
            title: "Plat principal",
            detail: "Choisir un",
            isChoice: true,
            items: [
              "Barg Kabab (+5 $)",
              "Koobideh Kabab",
              "Joojeh Kabab",
              "Kabab de saumon",
              "Ghormeh Sabzi d'agneau de Kamouraska (+5 $)",
              "Ghormeh Sabzi végétarien aux champignons",
            ],
          },
          {
            title: "Accompagnements",
            detail: "Partagé pour 4 personnes",
            items: [
              "Salade Shirazi",
              "Riz au safran",
              "Borani Bademjoon",
              "Maast-o-Moosir",
              "Sir Torshi",
            ],
          },
          {
            title: "Dessert",
            items: ["Dessert du jour"],
          },
          {
            title: "Cérémonie du thé",
            items: ["Thé persan"],
          },
        ],
      },
    ],
  },
};

function CourseBlock({ course }: { course: GroupMenuCourse }) {
  return (
    <div className="text-center">
      <h3 className="text-base font-semibold leading-6 text-bous-burgundy">
        {course.title}
      </h3>
      {course.detail ? (
        <p className="mt-1 text-base leading-6 text-bous-burgundy/72">
          {course.detail}
        </p>
      ) : null}
      <ul className="mt-2 space-y-1 text-base leading-6 text-bous-burgundy/88">
        {course.items.map((item) => (
          <li key={`${course.title}-${item}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function GroupMenuCard({ menu }: { menu: GroupMenuPackage }) {
  return (
    <article className="text-center">
      <div>
        <h2 className="font-operetta text-4xl font-light leading-none tracking-[-0.02em] text-bous-burgundy">
          {menu.name}
        </h2>
        <p className="mt-3 text-base leading-6 text-bous-burgundy/78">
          <span className="tabular-nums">{menu.price}</span>
          <span className="mx-2 text-bous-gold" aria-hidden>
            /
          </span>
          {menu.minimum}
        </p>
      </div>

      <div className="mt-10 space-y-9">
        {menu.courses.map((course) => (
          <CourseBlock key={`${menu.name}-${course.title}`} course={course} />
        ))}
      </div>
    </article>
  );
}

export default function GroupMenu() {
  const { language } = useLanguage();
  const copy = groupMenuCopy[language];

  return (
    <MenuPageLayout
      active="group"
      heading={copy.heading}
      intro={copy.intro}
      pdfHref={copy.pdfHref}
      pdfLabel={copy.pdfLabel}
      reserveLabel={copy.reserveLabel}
      sectionLabel={copy.sectionLabel}
      title={copy.pageTitle}
    >
      <div className="space-y-20">
        {copy.packages.map((menu) => (
          <GroupMenuCard key={menu.name} menu={menu} />
        ))}
      </div>

      <section className="mt-20 text-center">
        <h2 className="font-operetta text-2xl font-normal leading-tight text-bous-burgundy">
          {copy.informationTitle}
        </h2>
        <ul className="mt-6 space-y-2 text-base leading-7 text-bous-burgundy/78">
          {copy.information.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </MenuPageLayout>
  );
}
