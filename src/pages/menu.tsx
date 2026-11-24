import styles from "@/styles/dinner-menu.module.css";
import { dessertCourse, dinnerCourses, type DinnerMenuItem } from "@/constants/dinnerMenu";
import { MenuPageLayout } from "@/components/MenuPageLayout";
import { useLanguage } from "@/context/LanguageContext";

const menuCopy = {
  en: {
    pageTitle: "Dinner Menu - BOUS Persian Cuisine",
    sectionLabel: "Dinner menu",
    heading: "Dinner Menu",
    pdfHref: "/dinner-menu-en.pdf",
    pdfLabel: "Open PDF menu",
    reserveLabel: "Make a reservation",
  },
  fr: {
    pageTitle: "Menu du soir - BOUS Cuisine perse",
    sectionLabel: "Menu du soir",
    heading: "Menu du soir",
    pdfHref: "/dinner-menu-fr.pdf",
    pdfLabel: "Ouvrir le menu PDF",
    reserveLabel: "Faire une réservation",
  },
};

function MenuItems({ items }: { items: DinnerMenuItem[] }) {
  const { language } = useLanguage();
  return (
    <ul className={styles.items}>
      {items.map((item) => (
        <li key={item.name.en}>
          <div className={styles.row}>
            <strong>
              {item.seasonal && (
                <em>
                  {language === "fr"
                    ? "Spécial de saison | "
                    : "Season Special | "}
                </em>
              )}
              {item.name[language]}
              {item.veganOption && " *"}
            </strong>
            <span className={styles.price}>
              {typeof item.price === "number"
                ? item.price
                : item.price.map((option) => option.price).join("/")}
            </span>
          </div>
          {item.description && <p>{item.description[language]}</p>}
        </li>
      ))}
    </ul>
  );
}

function MenuSection({ group }: { group: (typeof dinnerCourses)[number] }) {
  const { language } = useLanguage();
  return (
    <section>
      <h2>{group.title[language]}</h2>
      <MenuItems items={group.dishes} />
      {group.note && <p className={styles.note}>{group.note[language]}</p>}
    </section>
  );
}

export default function Menu() {
  const { language } = useLanguage();
  const copy = menuCopy[language];
  const [starters, caviar, grill, slowCooked, sides] = dinnerCourses;

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
        {[sides, dessertCourse].map(({ id, title, dishes }) => {
          const halfway = Math.ceil(dishes.length / 2);
          return (
            <section key={id} id={id} className={styles.fullWidthSection}>
              <h2>{title[language]}</h2>
              <div className={styles.columns}>
                <MenuItems items={dishes.slice(0, halfway)} />
                <MenuItems items={dishes.slice(halfway)} />
              </div>
            </section>
          );
        })}
      </div>
    </MenuPageLayout>
  );
}
