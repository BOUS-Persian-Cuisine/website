import type { Language } from "@/context/LanguageContext";
import { MenuPageLayout } from "@/components/MenuPageLayout";
import { useLanguage } from "@/context/LanguageContext";

type GroupMenuCourse = {
  title: string;
  detail?: string;
  items: string[];
  isChoice?: boolean;
  note?: string;
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
      "Applicable taxes and an 18% service charge are additional"
    ],
    packages: [
      {
        name: "Sofreh",
        price: "$80 per person",
        minimum: "Minimum 8 Guests",
        courses: [
          {
            title: "Opening",
            detail: "For the table",
            items: [
              "Sangak Bread",
              "Maast-o-Khiar",
              "Kashk-o-Bademjoon"
            ]
          },
          {
            title: "Main Course",
            detail: "Choose One",
            isChoice: true,
            items: [
              "Koobideh Kabab (Ground Beef)",
              "Joojeh Kabab (Saffron Chicken)",
              "Salmon Kabab (Sumac and Saffron)",
              "Barg Kabab (Beef Tenderloin) +$10",
              "Shishlik (Kamouraska Lamb Chops) +$20",
              "Branzino and Pistachio +$25"
            ],
            note: "Vegetarian options are available"
          },
          {
            title: "Accompaniments",
            detail: "For the table",
            items: [
              "Salad Shirazi",
              "Saffron Rice",
              "Maast-o-Moosir"
            ]
          },
          {
            title: "Dessert",
            items: [
              "Dessert of the day"
            ]
          }
        ]
      },
      {
        name: "Mehmani",
        price: "$95 per person",
        minimum: "Minimum 8 Guests",
        courses: [
          {
            title: "Opening",
            detail: "For the table",
            items: [
              "Sangak Bread",
              "Maast-o-Khiar",
              "Kashk-o-Bademjoon",
              "Golden Tahchin"
            ]
          },
          {
            title: "Persian Feast",
            items: [
              "Kamouraska Lamb Ghormeh Sabzi"
            ]
          },
          {
            title: "Main Course",
            detail: "Choose One",
            isChoice: true,
            items: [
              "Koobideh Kabab (Ground Beef)",
              "Joojeh Kabab (Saffron Chicken)",
              "Salmon Kabab (Sumac and Saffron)",
              "Barg Kabab (Beef Tenderloin) +$10",
              "Shishlik (Kamouraska Lamb Chops) +$20",
              "Branzino and Pistachio +$25",
              "Kamouraska Lamb Ghormeh Sabzi +$10"
            ],
            note: "Vegetarian options are available"
          },
          {
            title: "Accompaniments",
            detail: "For the table",
            items: [
              "Salad Shirazi",
              "Saffron Rice",
              "Maast-o-Moosir"
            ]
          },
          {
            title: "Dessert",
            items: [
              "Dessert of the day"
            ]
          }
        ]
      },
      {
        name: "Bazm",
        price: "$125 per person",
        minimum: "Minimum 8 Guests",
        courses: [
          {
            title: "Welcome",
            items: [
              "Sharbat"
            ]
          },
          {
            title: "Opening",
            detail: "For the table",
            items: [
              "Sangak Bread",
              "Maast-o-Khiar",
              "Kashk-o-Bademjoon",
              "Spicy Saffron Chicken Wings",
              "Golden Tahchin"
            ]
          },
          {
            title: "Persian Feast",
            items: [
              "Kamouraska Lamb Ghormeh Sabzi"
            ]
          },
          {
            title: "Main Course",
            detail: "Choose One",
            isChoice: true,
            items: [
              "Koobideh Kabab (Ground Beef)",
              "Joojeh Kabab (Saffron Chicken)",
              "Salmon Kabab (Sumac and Saffron)",
              "Barg Kabab (Beef Tenderloin) +$10",
              "Shishlik (Kamouraska Lamb Chops) +$20",
              "Branzino and Pistachio +$25",
              "Duck Fesenjoon +$5"
            ],
            note: "Vegetarian options are available"
          },
          {
            title: "Accompaniments",
            detail: "For the table",
            items: [
              "Salad Shirazi",
              "Saffron Rice",
              "Borani Bademjoon",
              "Maast-o-Moosir",
              "Sir Torshi"
            ]
          },
          {
            title: "Dessert",
            items: [
              "Dessert of the day"
            ]
          }
        ]
      }
    ]
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
      "Les taxes applicables et des frais de service de 18 % sont en sus"
    ],
    packages: [
      {
        name: "Sofreh",
        price: "80 $ par personne",
        minimum: "Minimum 8 personnes",
        courses: [
          {
            title: "Ouverture",
            detail: "Pour la table",
            items: [
              "Pain Sangak",
              "Maast-o-Khiar",
              "Kashk-o-Bademjoon"
            ]
          },
          {
            title: "Plat principal",
            detail: "Choisir un plat",
            isChoice: true,
            items: [
              "Koobideh Kabab (bœuf haché)",
              "Joojeh Kabab (poulet au safran)",
              "Kabab de saumon (sumac et safran)",
              "Barg Kabab (filet de bœuf) +10 $",
              "Shishlik (côtelettes d’agneau de Kamouraska) +20 $",
              "Branzino et pistache +25 $"
            ],
            note: "Des options végétariennes sont disponibles"
          },
          {
            title: "Accompagnements",
            detail: "Pour la table",
            items: [
              "Salade Shirazi",
              "Riz au safran",
              "Maast-o-Moosir"
            ]
          },
          {
            title: "Dessert",
            items: [
              "Dessert du jour"
            ]
          }
        ]
      },
      {
        name: "Mehmani",
        price: "95 $ par personne",
        minimum: "Minimum 8 personnes",
        courses: [
          {
            title: "Ouverture",
            detail: "Pour la table",
            items: [
              "Pain Sangak",
              "Maast-o-Khiar",
              "Kashk-o-Bademjoon",
              "Tahchin doré"
            ]
          },
          {
            title: "Festin persan",
            items: [
              "Ghormeh Sabzi d’agneau de Kamouraska"
            ]
          },
          {
            title: "Plat principal",
            detail: "Choisir un plat",
            isChoice: true,
            items: [
              "Koobideh Kabab (bœuf haché)",
              "Joojeh Kabab (poulet au safran)",
              "Kabab de saumon (sumac et safran)",
              "Barg Kabab (filet de bœuf) +10 $",
              "Shishlik (côtelettes d’agneau de Kamouraska) +20 $",
              "Branzino et pistache +25 $",
              "Ghormeh Sabzi d’agneau de Kamouraska +10 $"
            ],
            note: "Des options végétariennes sont disponibles"
          },
          {
            title: "Accompagnements",
            detail: "Pour la table",
            items: [
              "Salade Shirazi",
              "Riz au safran",
              "Maast-o-Moosir"
            ]
          },
          {
            title: "Dessert",
            items: [
              "Dessert du jour"
            ]
          }
        ]
      },
      {
        name: "Bazm",
        price: "125 $ par personne",
        minimum: "Minimum 8 personnes",
        courses: [
          {
            title: "Accueil",
            items: [
              "Sharbat"
            ]
          },
          {
            title: "Ouverture",
            detail: "Pour la table",
            items: [
              "Pain Sangak",
              "Maast-o-Khiar",
              "Kashk-o-Bademjoon",
              "Ailes de poulet épicées au safran",
              "Tahchin doré"
            ]
          },
          {
            title: "Festin persan",
            items: [
              "Ghormeh Sabzi d’agneau de Kamouraska"
            ]
          },
          {
            title: "Plat principal",
            detail: "Choisir un plat",
            isChoice: true,
            items: [
              "Koobideh Kabab (bœuf haché)",
              "Joojeh Kabab (poulet au safran)",
              "Kabab de saumon (sumac et safran)",
              "Barg Kabab (filet de bœuf) +10 $",
              "Shishlik (côtelettes d’agneau de Kamouraska) +20 $",
              "Branzino et pistache +25 $",
              "Fesenjoon au canard +5 $"
            ],
            note: "Des options végétariennes sont disponibles"
          },
          {
            title: "Accompagnements",
            detail: "Pour la table",
            items: [
              "Salade Shirazi",
              "Riz au safran",
              "Borani Bademjoon",
              "Maast-o-Moosir",
              "Sir Torshi"
            ]
          },
          {
            title: "Dessert",
            items: [
              "Dessert du jour"
            ]
          }
        ]
      }
    ]
  }
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
      {course.note ? (
        <p className="mt-2 text-base italic leading-6 text-bous-burgundy/72">
          {course.note}
        </p>
      ) : null}
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
