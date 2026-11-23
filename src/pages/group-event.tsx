import { useEffect, useRef, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { GroupInquiry } from "@/components/GroupInquiry";
import { useLanguage } from "@/context/LanguageContext";
import { individualDetails, money, type Style } from "@/constants/groupEvent";
import { tiers } from "@/constants/groupMenus";
import css from "@/styles/group-event.module.css";

export default function GroupEvent() {
  const { language } = useLanguage();
  const t = (en: string, fr: string) => (language === "fr" ? fr : en);
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState<Style>("undecided");
  const [comparison, setComparison] = useState<"sharing" | "individual">(
    "sharing",
  );
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const sync = () => setOpen(window.location.hash === "#request");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  useEffect(() => {
    if (open) title.current?.focus();
  }, [open]);
  const begin = (preferred: Style) => {
    setStyle(preferred);
    window.location.hash = "request";
    setOpen(true);
    window.scrollTo(0, 0);
  };
  return (
    <SiteLayout title={t("Group Event", "Événement de groupe") + " · BOUS"}>
      <main className={css.page}>
        {!open && (
          <>
            <section className={css.hero}>
              <div className={css.heroText}>
                <p className={css.kicker}>
                  {t(
                    "Group dining · Golden Square Mile",
                    "Repas de groupe · Mille carré doré",
                  )}
                </p>
                <h1>{t("Gather at BOUS", "Recevoir chez BOUS")}</h1>
                <p>
                  {t(
                    "Bring your guests to our Persian table in downtown Montréal. We host team lunches, birthdays, wedding dinners and private receptions, with saffron rice, charcoal-grilled kababs and dishes passed from hand to hand.",
                    "Réunissez vos convives autour de notre table persane au centre-ville de Montréal. Dîners d’équipe, anniversaires, soupers de mariage ou réceptions privées se partagent autour du riz safrané, des kababs grillés sur charbon et des plats qui circulent à table.",
                  )}
                </p>
                <div className={css.actions}>
                  <button
                    type="button"
                    className={css.primary}
                    onClick={() => begin("undecided")}
                  >
                    {t("Plan my event", "Organiser mon événement")}
                  </button>
                  <a className={css.textLink} href="#menus">
                    {t("Explore the menus", "Découvrir les menus")}
                  </a>
                </div>
              </div>
              <div
                role="img"
                aria-label={t(
                  "Guests sharing Persian dishes at BOUS",
                  "Convives partageant des plats persans chez BOUS",
                )}
                className={css.photo}
              />
            </section>
            <section id="menus" className={css.menuSection}>
              <div className={css.intro}>
                <p className={css.kicker}>
                  {t("Menus for groups", "Menus de groupe")}
                </p>
                <h2>
                  {t(
                    "How would you like to dine?",
                    "Comment souhaitez-vous partager le repas ?",
                  )}
                </h2>
                <p>
                  {t(
                    "Choose one menu for the group. We’ll work with you on allergies, seating and the details of the day.",
                    "Choisissez un menu pour le groupe. Nous verrons ensemble les allergies, le plan de table et le déroulement de votre événement.",
                  )}
                </p>
              </div>
              <div
                role="group"
                aria-label={t("Dining style", "Style de service")}
                className={css.tabs}
              >
                {(["sharing", "individual"] as const).map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={comparison === s}
                    onClick={() => setComparison(s)}
                  >
                    {i === 0
                      ? t("Served to share", "À partager")
                      : t("Individual choices", "Choix individuels")}
                  </button>
                ))}
              </div>
              <p>
                {comparison === "sharing"
                  ? t(
                      "For tables of eight or more, platters arrive in the centre for everyone to share.",
                      "Pour les groupes de huit ou plus, les plats sont servis au centre de la table.",
                    )
                  : t(
                      "Guests choose their own main in advance. On weekday lunches, the $45 Table d’Hôte also offers an individual starter.",
                      "Chaque convive choisit son plat principal à l’avance. Au dîner en semaine, la table d’hôte à 45 $ comprend aussi une entrée au choix.",
                    )}
              </p>
              <div className={css.tiers}>
                {tiers.map((tier, i) => (
                  <article key={tier.name}>
                    <h3>{tier.name}</h3>
                    <p className={css.price}>
                      {money(tier.price, language)}{" "}
                      <small>{t("per guest", "par personne")}</small>
                    </p>
                    <p>
                      {
                        (comparison === "sharing"
                          ? tier
                          : individualDetails[i])[language]
                      }
                    </p>
                  </article>
                ))}
              </div>
              <p className={css.fine}>
                {t(
                  "Prices in CAD, before tax and service. We’ll confirm menus and availability for your date.",
                  "Prix en dollars canadiens, avant taxes et service. Nous confirmerons les menus et la disponibilité pour la date choisie.",
                )}
              </p>
              <div className={css.actions}>
                <button
                  className={css.primary}
                  onClick={() => begin(comparison)}
                >
                  {t(
                    "Request this dining style",
                    "Choisir ce style de service",
                  )}
                </button>
                <a
                  href={
                    comparison === "sharing" ? "/group-menu/" : "/lunch-menu/"
                  }
                  className={css.textLink}
                >
                  {comparison === "sharing"
                    ? t("Full sharing menus", "Menus à partager détaillés")
                    : t("View the lunch menu", "Voir le menu du dîner")}
                </a>
              </div>
            </section>
          </>
        )}
        {open && (
          <div className={css.formWrap}>
            <a
              className={css.textLink}
              href="#menus"
              onClick={() => setOpen(false)}
            >
              {t("Back to group menus", "Retour aux menus de groupe")}
            </a>
            <header className={css.formIntro}>
              <p className={css.kicker}>
                {t("Group event request", "Demande d’événement de groupe")}
              </p>
              <h1 ref={title} tabIndex={-1}>
                {t("Plan your event", "Organisez votre événement")}
              </h1>
            </header>
            <GroupInquiry initialStyle={style} />
          </div>
        )}
      </main>
    </SiteLayout>
  );
}
