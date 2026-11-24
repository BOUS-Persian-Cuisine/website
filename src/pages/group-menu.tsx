import { MenuPageHeader } from "@/components/MenuPageHeader";
import { RelatedMenuLinks } from "@/components/MenuSwitcher";
import { SiteLayout } from "@/components/SiteLayout";
import Link from "next/link";
import { tiers, courses, pairings } from "@/constants/groupMenus";
import { useLanguage } from "@/context/LanguageContext";
import styles from "@/styles/group-menu.module.css";

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
        <MenuPageHeader active="group" heading={title} />
        <div className={styles.wrap}>
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <p>{t("Choose one menu for your table of eight or more. Every dish listed is served to share, from the first plates to dessert.", "Choisissez un menu pour votre table de huit personnes ou plus. Tous les plats indiqués sont servis à partager, des entrées au dessert.")}</p>
              <div className={styles.links}>
                <Link className={styles.plannerLink} href="/group-event/#request">
                  {t("Plan your event", "Organiser votre événement")}
                  <span aria-hidden="true">→</span>
                </Link>
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
                  <h3>{t("Dessert", "Dessert")}</h3><p>{t("Chef's Choice", "Choix du chef")}</p>
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
            <p>{t("Please confirm your final guest count at least two business days before the event, excluding weekends. Please let us know about any food allergies at least 48 hours before your event. With less notice, we can’t guarantee that our kitchen can accommodate your request.", "Veuillez confirmer le nombre final de convives au moins deux jours ouvrables avant l’événement, sans compter les fins de semaine. Veuillez nous signaler toute allergie alimentaire au moins 48 heures avant votre événement. Avec un préavis plus court, nous ne pouvons pas garantir que notre équipe pourra adapter le menu.")}</p>
            <div className={styles.links}><Link href="/group-event/">{t("Plan a group event", "Organiser un événement de groupe")}</Link><a href="mailto:info@bous.ca">info@bous.ca</a></div>
          </section>
          <RelatedMenuLinks active="group" />
        </div>
      </main>
    </SiteLayout>
  );
}
