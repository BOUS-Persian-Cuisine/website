import { courses, tiers } from "@/constants/groupMenus";
import { lunchMenuCopy } from "@/constants/lunchMenu";
import { money, type Style } from "@/constants/groupEvent";
import type { Language } from "@/context/LanguageContext";
import css from "@/styles/group-event.module.css";

export function MenuInclusions({
  name,
  style,
  language,
}: {
  name: string;
  style: Style;
  language: Language;
}) {
  const t = (en: string, fr: string) => (language === "fr" ? fr : en);
  if (name === "Table d’Hôte") {
    const lunch = lunchMenuCopy[language];
    return (
      <div className={css.courseList}>
        <p>
          {t("Weekday lunch", "Dîner en semaine")} · {lunch.price}
        </p>
        {lunch.sections.map((section) => (
          <section key={section.title}>
            <h3>
              {section.title} · {section.detail}
            </h3>
            <ul>
              {section.items.map((item) => (
                <li key={item.name}>
                  {item.name} {item.price}{" "}
                  {item.description && <small>{item.description}</small>}
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p>{lunch.note}</p>
      </div>
    );
  }
  const tier = tiers.findIndex((item) => item.name === name);
  if (tier === -1) return null;
  const shared = style === "sharing";
  const section = (heading: string, items: string[]) => (
    <section key={heading}>
      <h3>{heading}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
  const starters = ["Sangak", "Maast-o-Khiar", "Kashk-o-Bademjoon"];
  if (tier >= 1) starters.push(t("Golden Tahchin", "Tahchin doré"));
  if (tier === 2)
    starters.push(
      t("Spicy saffron chicken wings", "Ailes de poulet épicées au safran"),
    );
  const sides = [
    t("Salad Shirazi", "Salade Shirazi"),
    t("Saffron rice", "Riz safrané"),
    "Maast-o-Moosir",
  ];
  if (tier === 2) sides.push("Borani Bademjoon", "Sir Torshi");
  const supplement = (en: string, fr: string, n: number) =>
    t(en, fr) + " (+" + money(n, language) + ")";
  const mains = [
    "Koobideh Kabab",
    "Joojeh Kabab",
    t(
      "Salmon kabab with sumac and saffron",
      "Kabab de saumon au sumac et au safran",
    ),
    supplement("Barg Kabab", "Kabab Barg", 10),
    supplement("Shishlik", "Shishlik", 20),
    supplement("Branzino and pistachio", "Branzino aux pistaches", 25),
  ];
  if (tier === 1)
    mains.push(
      supplement(
        "Kamouraska lamb shank Ghormeh Sabzi",
        "Ghormeh Sabzi au jarret d’agneau de Kamouraska",
        10,
      ),
    );
  if (tier === 2)
    mains.push(supplement("Duck Fesenjoon", "Fesenjoon au canard", 5));
  return (
    <div className={css.courseList}>
      <p>
        {shared
          ? t("Family-style sharing", "Menu à partager")
          : t("Individual choices", "Choix individuels")}{" "}
        · {money(tiers[tier].price, language)} {t("per guest", "par personne")}
      </p>
      {tier === 2 &&
        section(t("Welcome drink", "À l’accueil"), [
          t("Persian sharbat (non-alcoholic)", "Sharbat persan (sans alcool)"),
        ])}
      {shared ? (
        courses.map((course) =>
          section(
            course[language],
            course.dishes
              .filter((d) => d.tier !== null && d.tier <= tier)
              .map(
                (d) => (d[language] ?? d.en) + " · " + d.description[language],
              ),
          ),
        )
      ) : (
        <>
          {section(t("Starters to share", "Entrées à partager"), starters)}
          {tier > 0 &&
            section(t("For the table", "Pour la table"), [
              tier === 1
                ? t("Duck Fesenjoon", "Fesenjoon au canard")
                : t(
                    "Kamouraska lamb shank Ghormeh Sabzi",
                    "Ghormeh Sabzi au jarret d’agneau de Kamouraska",
                  ),
            ])}
          {section(
            t("One main per guest", "Un plat principal par personne"),
            mains,
          )}
          <p>
            {t(
              "Vegetarian options are available on request.",
              "Des options végétariennes sont offertes sur demande.",
            )}
          </p>
          {section(
            t("Shared accompaniments", "Accompagnements à partager"),
            sides,
          )}
        </>
      )}
      {section(t("Dessert", "Dessert"), [
        shared
          ? t("Chef’s choice", "Choix du chef")
          : t("Dessert of the day", "Dessert du jour"),
      ])}
    </div>
  );
}
