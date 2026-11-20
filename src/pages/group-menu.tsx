import { MenuSwitcher, RelatedMenuLinks } from "@/components/MenuSwitcher";
import { SiteLayout } from "@/components/SiteLayout";
import { getOpenTableReservationUrl } from "@/constants/links";
import { useLanguage } from "@/context/LanguageContext";
import styles from "@/styles/group-menu.module.css";

const tiers = [
  { name: "Sofreh", price: 80, en: "Grilled beef, saffron chicken and duck confit.", fr: "Bœuf grillé, poulet au safran et canard confit." },
  { name: "Mehmani", price: 95, en: "Beef tenderloin, saffron chicken, duck confit and braised lamb.", fr: "Filet de bœuf, poulet au safran, canard confit et agneau braisé." },
  { name: "Bazm", price: 125, en: "Beef, chicken, duck and lamb, with whole sea bass, king shrimp and a welcome sharbat.", fr: "Bœuf, poulet, canard et agneau, avec bar entier, crevettes géantes et sharbat de bienvenue." },
];

// The first tier that includes a dish. A null tier is available only à la carte.
type Dish = { en: string; fr?: string; description: { en: string; fr: string }; price: number; tier: number | null; unit?: [string, string] };
type Course = { en: string; fr: string; dishes: Dish[] };
const courses: Course[] = [
  { en: "Bread & appetisers", fr: "Pain et entrées", dishes: [
    { en: "Sangak", description: { en: "Persian Flatbread", fr: "Pain plat" }, price: 6, tier: 0 },
    { en: "Maast-o-Khiar", description: { en: "Cucumber Yogurt", fr: "Yogourt, concombre" }, price: 18, tier: 0 },
    { en: "Kashk-o-Bademjoon", description: { en: "Smoked Eggplant", fr: "Aubergine fumée" }, price: 28, tier: 0 },
    { en: "Zeyton Parvardeh", description: { en: "Marinated Olives", fr: "Olives marinées" }, price: 20, tier: 1 },
    { en: "Golden Square Mile Tahchin", fr: "Tahchin du Mille carré doré", description: { en: "Crispy Rice", fr: "Riz croustillant" }, price: 22, tier: 1 },
    { en: "Ghalieh Meygoo", description: { en: "King Shrimp", fr: "Crevettes géantes" }, price: 10, tier: 2, unit: ["per shrimp", "la crevette"] },
    { en: "Spicy Saffron Chicken Wings", fr: "Ailes de poulet épicées au safran", description: { en: "Chicken Wingettes", fr: "Ailerons épicés" }, price: 18, tier: null },
    { en: "Caviar Tahdig Bite", fr: "Bouchée de tahdig au caviar", description: { en: "Baerii Caviar", fr: "Caviar Baerii" }, price: 15, tier: null, unit: ["per bite", "la bouchée"] },
  ] },
  { en: "Main dishes", fr: "Plats principaux", dishes: [
    { en: "Koobideh Kabab", description: { en: "Ground Beef", fr: "Bœuf haché" }, price: 36, tier: 0 },
    { en: "Joojeh Kabab", description: { en: "Saffron Chicken", fr: "Poulet safrané" }, price: 38, tier: 0 },
    { en: "Duck Fesenjoon", fr: "Fesenjoon au canard", description: { en: "Duck Confit", fr: "Canard confit" }, price: 48, tier: 0 },
    { en: "Barg Kabab", description: { en: "Beef Tenderloin", fr: "Filet bovin" }, price: 54, tier: 1 },
    { en: "Kamouraska Lamb Ghormeh Sabzi", fr: "Ghormeh Sabzi à l’agneau de Kamouraska", description: { en: "Lamb Shank", fr: "Jarret d’agneau" }, price: 55, tier: 1 },
    { en: "Whole Branzino", fr: "Bar entier", description: { en: "Sea Bass", fr: "Bar grillé" }, price: 72, tier: 2 },
    { en: "Shishlik", description: { en: "Lamb Chops", fr: "Côtelettes d’agneau" }, price: 65, tier: null },
    { en: "Jewel Rice with Lamb Neck", fr: "Riz aux joyaux et cou d’agneau", description: { en: "Braised Lamb", fr: "Agneau braisé" }, price: 58, tier: null },
  ] },
  { en: "Accompaniments", fr: "Accompagnements", dishes: [
    { en: "Saffron Rice", fr: "Riz safrané", description: { en: "Iranian Rice", fr: "Riz iranien" }, price: 8, tier: 0 },
    { en: "Salad Shirazi", fr: "Salade Shirazi", description: { en: "Cucumber, Tomato", fr: "Concombre, tomate" }, price: 13, tier: 0 },
    { en: "Maast-o-Moosir", description: { en: "Shallot Yogurt", fr: "Yogourt, échalotes" }, price: 14, tier: 0 },
    { en: "Sir Torshi", description: { en: "Pickled Garlic", fr: "Ail mariné" }, price: 5, tier: 2 },
    { en: "Borani Bademjoon", description: { en: "Eggplant Yogurt", fr: "Yogourt, aubergine" }, price: 14, tier: null },
  ] },
];

const pairings = [
  { en: "Wine Pairing", fr: "Accord de vins", glasses: 3, price: 65 },
  { en: "Ancient Persia Wine Pairing", fr: "Accord de vins de la Perse antique", glasses: 3, price: 95 },
  { en: "Cocktail Pairing", fr: "Accord de cocktails", glasses: 2, price: 45 },
  { en: "Sharbat Pairing", fr: "Accord de sharbats", glasses: 3, price: 42 },
  { en: "BOUS Curated", fr: "Sélection BOUS", glasses: null, price: 85 },
];

export default function GroupMenu() {
  const { language } = useLanguage();
  const fr = language === "fr";
  const t = (en: string, french: string) => fr ? french : en;
  const money = (n: number) => fr ? n + " $" : "$" + n;
  const title = t("Group Menus", "Menus de groupe");
  const perGuest = t("per guest", "par personne");
  return (
    <SiteLayout title={title + " · BOUS"}>
      <main className={styles.page}>
        <div className={styles.wrap}>
          <MenuSwitcher active="group" />
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <h1>{title}</h1>
              <p>{t("Choose one menu for your table of eight or more. Every dish listed is served to share, from the first plates to dessert.", "Choisissez un menu pour votre table de huit personnes ou plus. Tous les plats indiqués sont servis à partager, des entrées au dessert.")}</p>
              <div className={styles.links}>
                <a href={fr ? "/Options de menu de groupe.pdf" : "/Group Menu options.pdf"} download>
                  {t("Group Menu options", "Options de menu de groupe")}
                </a>
              </div>
            </div>
            <div role="img" aria-label={t("Persian dishes being shared at a BOUS table", "Plats persans partagés à une table de BOUS")} className={styles.photo} />
          </header>
          <section className={styles.tiers} aria-label={t("Family-style menus", "Menus à partager")}>
            {tiers.map((menu, i) => (
              <article key={menu.name}>
                <header><h2>{menu.name}</h2><p className={styles.price}>{money(menu.price)} <small>{perGuest}</small></p></header>
                <p>{menu[language]}</p>
                <details open>
                  <summary>{t("Included dishes", "Plats inclus")}</summary>
                  {courses.map(course => <div key={course.en}><h3>{course[language]}</h3><ul>{course.dishes.filter(d => d.tier !== null && d.tier <= i).map(d => <li key={d.en}>{d[language] ?? d.en} <span className={styles.description}>({d.description[language]})</span></li>)}</ul></div>)}
                  <h3>{t("Dessert", "Dessert")}</h3><p>{t("Dessert of the day", "Dessert du jour")} <span className={styles.description}>({t("To Share", "À partager")})</span></p>
                  {menu.name === "Bazm" && <><h3>{t("Welcome drink", "À l’accueil")}</h3><p>{t("Persian Sharbat", "Sharbat persan")} <span className={styles.description}>({t("Non-Alcoholic", "Sans alcool")})</span></p></>}
                </details>
              </article>
            ))}
          </section>
          <p className={styles.terms}>{t("Prices in CAD. Applicable taxes and an 18% service charge are additional.", "Prix en dollars canadiens. Taxes applicables et frais de service de 18 % en sus.")}</p>
          <section className={styles.extra}>
            <h2>{t("Optional pairings", "Accords facultatifs")}</h2>
            <p>{t("Supplement per guest.", "Supplément par personne.")}</p>
            <dl>{pairings.map(p => <div key={p.en}><dt>{p[language]}<small>{p.glasses ? p.glasses + t(" glasses", " verres") : t("Sharbat, wine and cocktail", "Sharbat, vin et cocktail")}</small></dt><dd>{money(p.price)}</dd></div>)}</dl>
          </section>
          <section className={styles.extra}>
            <h2>{t("Additional plates", "Plats supplémentaires")}</h2>
            <p>{t("Add to any group menu. Prices are per plate unless indicated.", "À ajouter à tout menu de groupe. Prix par assiette, sauf indication contraire.")}</p>
            {courses.map(course => <details key={course.en} open><summary>{course[language]}</summary><dl>{course.dishes.map(d => <div key={d.en}><dt>{d[language] ?? d.en} <span className={styles.description}>({d.description[language]})</span></dt><dd>{money(d.price)} {d.unit?.[fr ? 1 : 0]}</dd></div>)}</dl></details>)}
            <p>{t("Add Persian Ossetra caviar to a $22 Tahchin plate for an additional $60.", "Ajoutez du caviar persan Ossetra à une assiette de tahchin à 22 $ pour un supplément de 60 $.")}</p>
          </section>
          <section className={styles.booking}>
            <h2>{t("Group reservations", "Réservations de groupe")}</h2>
            <p>{t("Confirm your final guest count 48 hours before the event. Please let us know about dietary restrictions in advance.", "Confirmez le nombre final de convives 48 heures avant l’événement. Veuillez nous informer à l’avance de toute restriction alimentaire.")}</p>
            <div className={styles.links}><a href={getOpenTableReservationUrl(language)}>{t("Reserve a table", "Réserver une table")}</a><a href="mailto:info@bous.ca">info@bous.ca</a></div>
          </section>
          <RelatedMenuLinks active="group" />
        </div>
      </main>
    </SiteLayout>
  );
}
