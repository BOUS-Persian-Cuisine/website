import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import css from "@/styles/group-event-landing.module.css";

export function GroupEventLanding({ onPlan }: { onPlan: () => void }) {
  const { language } = useLanguage();
  const t = (en: string, fr: string) => (language === "fr" ? fr : en);
  const action = t("Plan your event", "Organiser votre événement");
  return (
    <div className={css.landing}>
      <section className={css.hero} aria-labelledby="gather-heading">
        <Image
          className={css.heroImage}
          src="/img/group-events/bar.webp"
          alt={t(
            "The warmly lit bar and sculpted ceiling at BOUS",
            "Le bar de BOUS sous un plafond sculpté, dans une lumière dorée",
          )}
          width={1600}
          height={1067}
          priority
          sizes="100vw"
        />
        <div className={css.heroContent}>
          <p className={css.eyebrow}>
            {t("Private dining & events", "Repas privés et événements")}
          </p>
          <h1 id="gather-heading">
            {t("Gather at BOUS", "Recevoir chez BOUS")}
          </h1>
          <p>
            {t(
              "A Persian table for your guests in Montréal’s Golden Square Mile.",
              "Une table persane pour vos convives au cœur du Mille carré doré de Montréal.",
            )}
          </p>
          <button className={css.heroButton} onClick={onPlan}>
            {action}
          </button>
        </div>
      </section>

      <section
        id="menus"
        className={css.story}
        aria-labelledby="group-menu-heading"
      >
        <div className={css.storyText}>
          <p className={css.eyebrow}>
            {t("Persian hospitality", "Hospitalité persane")}
          </p>
          <h2 id="group-menu-heading" tabIndex={-1}>
            {t("Around the sofreh", "Autour du sofreh")}
          </h2>
          <p>
            {t(
              "In a Persian home, the sofreh is the spread everyone gathers around. At BOUS, it starts with sangak bread and bowls of cucumber yogurt. Then come the saffron rice and charcoal-grilled kababs, passed from one end of the table to the other.",
              "Dans une maison iranienne, le sofreh est la table dressée autour de laquelle on se réunit. Chez BOUS, on commence par le pain sangak et le yogourt au concombre. Puis viennent le riz au safran et les kababs grillés au charbon, qu’on se passe d’un bout à l’autre de la table.",
            )}
          </p>
          <p>
            {t(
              "For groups of eight or more, our Sofreh, Mehmani and Bazm menus bring that tradition to your table. If your guests prefer to choose their own main, we can arrange that too.",
              "Dès huit convives, nos menus Sofreh, Mehmani et Bazm font vivre cette tradition à votre table. Si vos invités préfèrent choisir leur propre plat principal, c’est aussi possible.",
            )}
          </p>
          <Link href="/group-menu/">
            {t("Explore the sharing menus", "Découvrir les menus à partager")}
          </Link>
        </div>
        <div className={css.tablePhotos}>
          <Image
            className={css.spread}
            width={1400}
            height={933}
            sizes="(max-width: 760px) 92vw, 50vw"
            src="/img/bous-shared-table.webp"
            alt={t(
              "Guests sharing kababs, rice and small plates at BOUS",
              "Des convives se partagent kababs, riz et petites assiettes chez BOUS",
            )}
          />
          <Image
            className={css.chef}
            width={700}
            height={1050}
            sizes="(max-width: 760px) 32vw, 14vw"
            src="/img/group-events/finishing-tahchin.webp"
            alt={t(
              "A chef finishing golden tahchin at the pass",
              "Un chef apporte la dernière touche à un tahchin doré",
            )}
          />
        </div>
      </section>

      <section className={css.address} aria-labelledby="address-heading">
        <Image
          width={1600}
          height={1067}
          sizes="(max-width: 760px) 100vw, 55vw"
          src="/img/group-events/dining-alcove.webp"
          alt={t(
            "A wood dining table, dark banquette and pendant lights at BOUS",
            "Une table en bois, une banquette sombre et des suspensions chez BOUS",
          )}
        />
        <div>
          <p className={css.eyebrow}>
            {t("1310 Sherbrooke Street West", "1310, rue Sherbrooke Ouest")}
          </p>
          <h2 id="address-heading">
            {t("Inside the Golden Square Mile", "Au cœur du Mille carré doré")}
          </h2>
          <p>
            {t(
              "On one of Montréal’s grandest streets, warm wood, soft pendant lights and geometric lines drawn from Persian architecture give the dining room its character. Settle into a banquette for a birthday dinner or welcome your guests with a drink at the bar.",
              "Sur l’une des grandes artères de Montréal, le bois chaleureux, les suspensions tamisées et les lignes géométriques inspirées de l’architecture persane donnent son caractère à la salle. Installez-vous sur une banquette pour un anniversaire ou accueillez vos invités autour d’un verre au bar.",
            )}
          </p>
        </div>
      </section>

      <section className={css.occasions} aria-labelledby="occasions-heading">
        <div className={css.pair}>
          <Image
            width={700}
            height={1050}
            sizes="(max-width:760px) 47vw, 23vw"
            src="/img/group-events/saffron-kabab.webp"
            alt={t(
              "Saffron chicken kabab with grilled tomato and herbs",
              "Kabab de poulet au safran, tomate grillée et fines herbes",
            )}
          />
          <Image
            width={667}
            height={1000}
            sizes="(max-width:760px) 44vw, 21vw"
            src="/img/group-events/cocktail.webp"
            alt={t(
              "An amber cocktail on the veined stone bar",
              "Un cocktail ambré sur le comptoir de pierre veiné",
            )}
          />
        </div>
        <div className={css.occasionText}>
          <h2 id="occasions-heading">
            {t("Make the space yours", "Un lieu pour votre occasion")}
          </h2>
          <dl>
            <div>
              <dt>{t("At the table", "À table")}</dt>
              <dd>
                {t(
                  "Bring colleagues for a weekday lunch, gather family for a birthday, or welcome out-of-town guests for a rehearsal dinner.",
                  "Réunissez vos collègues pour un dîner en semaine, votre famille pour un anniversaire ou vos proches pour un souper avant le mariage.",
                )}
              </dd>
            </div>
            <div>
              <dt>{t("In the private room", "En salon privé")}</dt>
              <dd>
                {t(
                  "An intimate setting for up to 10 guests, with a $1,500 minimum spend for the room.",
                  "Un cadre intime pour un maximum de 10 convives, avec un minimum de consommation de 1 500 $ pour la salle.",
                )}
              </dd>
            </div>
            <div>
              <dt>
                {t("The whole restaurant", "Le restaurant en exclusivité")}
              </dt>
              <dd>
                {t(
                  "Host a reception with exclusive use of BOUS. Add passed canapés and choose drinks for the evening.",
                  "Privatisez BOUS pour une réception, ajoutez des canapés servis sur plateau et choisissez les boissons de la soirée.",
                )}
              </dd>
            </div>
          </dl>
          <button className={css.plan} onClick={onPlan}>
            {action}
          </button>
        </div>
      </section>
    </div>
  );
}
