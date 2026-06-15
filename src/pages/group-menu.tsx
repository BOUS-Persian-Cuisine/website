import Link from "next/link";

import type { Language } from "@/context/LanguageContext";
import { MenuSwitcher } from "@/components/MenuSwitcher";
import { SiteLayout } from "@/components/SiteLayout";
import { OPENTABLE_RESERVATION_URL } from "@/constants/links";
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
  eyebrow: string;
  heading: string;
  intro: string;
  pdfHref: string;
  pdfLabel: string;
  packageLabel: string;
  reserveLabel: string;
  otherMenuLabel: string;
  informationTitle: string;
  information: string[];
  packages: GroupMenuPackage[];
};

const groupMenuCopy: Record<Language, GroupMenuCopy> = {
  en: {
    pageTitle: "Group Menu - BOUS Persian Cuisine",
    sectionLabel: "Group menu",
    eyebrow: "Group dining",
    heading: "Group Menu",
    intro: "Shared set menus for parties of 8 guests or more.",
    pdfHref: "/group-menu-sofreh-mehmani-bazm.pdf",
    pdfLabel: "Open PDF menu",
    packageLabel: "Group Menu",
    reserveLabel: "Make a reservation",
    otherMenuLabel: "View Dinner Menu",
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
            detail: "Choose One",
            isChoice: true,
            items: ["Faloodeh", "Persian Love Cake"],
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
            title: "Sofreh Opening",
            detail: "One of each item for every 4 guests",
            items: ["Sangak Bread", "Paneer Sabzi", "Maast-o-Khiar"],
          },
          {
            title: "Signature Course",
            detail: "One of each item for every 4 guests",
            items: [
              "Fresh Sangak Bread",
              "Kashk-o-Bademjoon",
              "Golden Square Mile Tahchin",
            ],
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
            detail: "Choose One",
            isChoice: true,
            items: ["Faloodeh", "Persian Love Cake"],
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
            items: ["Persian Sharbat"],
          },
          {
            title: "Sofreh Opening",
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
              "Golden Square Mile Tahchin",
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
            detail: "Choose One",
            isChoice: true,
            items: ["Persian Love Cake", "Faloodeh", "Chocolate Date Cake"],
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
    eyebrow: "Repas de groupe",
    heading: "Menu de groupe",
    intro: "Menus partagés pour les groupes de 8 personnes ou plus.",
    pdfHref: "/group-menu-sofreh-mehmani-bazm.pdf",
    pdfLabel: "Ouvrir le menu PDF",
    packageLabel: "Menu de groupe",
    reserveLabel: "Faire une réservation",
    otherMenuLabel: "Voir le menu du soir",
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
            detail: "Choisir un",
            isChoice: true,
            items: ["Faloodeh", "Gâteau d'amour persan"],
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
            title: "Ouverture Sofreh",
            detail: "Un de chaque item pour 4 personnes",
            items: ["Pain Sangak", "Paneer Sabzi", "Maast-o-Khiar"],
          },
          {
            title: "Service signature",
            detail: "Un de chaque item pour 4 personnes",
            items: [
              "Pain Sangak frais",
              "Kashk-o-Bademjoon",
              "Tahchin du Mille carré doré",
            ],
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
            detail: "Choisir un",
            isChoice: true,
            items: ["Faloodeh", "Gâteau d'amour persan"],
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
            items: ["Sharbat persan"],
          },
          {
            title: "Ouverture Sofreh",
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
              "Tahchin du Mille carré doré",
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
            detail: "Choisir un",
            isChoice: true,
            items: [
              "Gâteau d'amour persan",
              "Faloodeh",
              "Gâteau aux dattes et chocolat",
            ],
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
    <div className="border-t border-bous-gold/25 pt-6">
      <h3 className="text-[0.74rem] uppercase tracking-[0.26em] text-bous-red">
        {course.title}
      </h3>
      {course.detail ? (
        <p className="mt-3 text-sm leading-6 tracking-[0.03em] text-foreground/70">
          {course.detail}
        </p>
      ) : null}
      <ul className="mt-3 space-y-2 text-base leading-7 text-foreground/84">
        {course.items.map((item) => (
          <li
            key={`${course.title}-${item}`}
            className="flex items-center gap-3"
          >
            <span
              className="h-1.5 w-1.5 shrink-0 bg-bous-gold"
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GroupMenuCard({
  menu,
  packageLabel,
}: {
  menu: GroupMenuPackage;
  packageLabel: string;
}) {
  return (
    <article className="border border-bous-gold/35 bg-bous-white/28 px-6 py-8 shadow-[0_18px_50px_rgba(53,5,20,0.08)] sm:px-8 sm:py-10">
      <div className="border-b border-bous-gold/30 pb-6">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-bous-red">
          {packageLabel}
        </p>
        <h2 className="font-operetta mt-3 text-5xl font-light leading-none text-foreground sm:text-6xl">
          {menu.name}
        </h2>
        <p className="mt-4 text-lg leading-7 text-foreground/78">
          {menu.price} <span className="text-bous-gold">•</span>{" "}
          {menu.minimum}
        </p>
      </div>

      <div className="mt-7 space-y-7">
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
                <div>
                  <h1 className="font-operetta text-6xl font-light leading-none sm:text-7xl md:text-8xl">
                    {copy.heading}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-5xl px-6 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-22">
            <div className="mb-10 flex flex-col items-center justify-center gap-2 sm:mb-12">
              <MenuSwitcher active="group" />
              <a
                href={copy.pdfHref}
                target="_blank"
                rel="noreferrer"
                className="brand-link inline-flex min-h-9 w-fit items-center justify-center px-2 text-[0.68rem] uppercase tracking-[0.22em] text-foreground/68 underline-offset-4 transition-colors hover:text-bous-red hover:underline"
              >
                {copy.pdfLabel}
              </a>
              <p className="mt-4 max-w-2xl text-center text-lg font-light leading-8 tracking-[0.01em] text-foreground/72 sm:text-xl">
                {copy.intro}
              </p>
            </div>

            <div className="grid gap-8">
              {copy.packages.map((menu) => (
                <GroupMenuCard
                  key={menu.name}
                  menu={menu}
                  packageLabel={copy.packageLabel}
                />
              ))}
            </div>

            <div className="mx-auto mt-10 max-w-4xl border-t border-bous-gold/45 pt-10 text-center sm:mt-14 sm:pt-12">
              <h2 className="text-[0.74rem] uppercase tracking-[0.3em] text-bous-red">
                {copy.informationTitle}
              </h2>
              <ul className="mx-auto mt-6 max-w-3xl space-y-3 text-base leading-7 tracking-[0.02em] text-foreground/76 sm:text-left">
                {copy.information.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-[0.62em] h-1.5 w-1.5 shrink-0 bg-bous-gold"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-3 border-t border-bous-gold/35 pt-10 sm:mt-12">
                <a
                  href={OPENTABLE_RESERVATION_URL}
                  className="inline-flex min-h-12 items-center justify-center border border-bous-red bg-bous-red px-6 text-[0.72rem] uppercase tracking-[0.22em] text-bous-white transition-colors hover:border-bous-burgundy hover:bg-bous-burgundy"
                >
                  {copy.reserveLabel}
                </a>
                <Link
                  href="/menu"
                  className="brand-link px-2 text-[0.72rem] uppercase tracking-[0.22em] text-foreground/68 underline-offset-4 transition-colors hover:text-bous-red hover:underline"
                >
                  {copy.otherMenuLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
