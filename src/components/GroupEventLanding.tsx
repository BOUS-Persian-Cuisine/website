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
          src="/img/bous-shared-table.webp"
          alt={t(
            "Guests sharing kababs, rice and small plates at BOUS",
            "Des convives se partagent kababs, riz et petites assiettes chez BOUS",
          )}
          width={1400}
          height={933}
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
        <Image
          className={css.chef}
          width={640}
          height={959}
          sizes="(max-width: 490px) 88vw, (max-width: 760px) 27rem, 38vw"
          src="/img/group-events/chef-at-the-pass.webp"
          alt={t(
            "A chef finishing golden tahchin at the pass",
            "Un chef apporte la dernière touche à un tahchin doré",
          )}
        />
      </section>

      <section className={css.address} aria-labelledby="address-heading">
        <div className={css.roomPhotos}>
          <Image
            width={760}
            height={1139}
            sizes="(max-width: 760px) 53vw, 29vw"
            src="/img/group-events/brickwork-and-tapestry.webp"
            alt={t(
              "A red wall hanging beside the open brick screen in the BOUS dining room",
              "Une tenture rouge près de la cloison de briques ajourée dans la salle de BOUS",
            )}
          />
          <Image
            width={700}
            height={1049}
            sizes="(max-width: 760px) 47vw, 26vw"
            src="/img/group-events/set-tables.webp"
            alt={t(
              "Wooden tables set for dinner beneath illuminated wall niches",
              "Des tables en bois dressées sous les niches éclairées du mur",
            )}
          />
        </div>
        <div className={css.addressText}>
          <p className={css.eyebrow}>
            {t("1310 Sherbrooke Street West", "1310, rue Sherbrooke Ouest")}
          </p>
          <h2 id="address-heading">
            {t("Inside the Golden Square Mile", "Au cœur du Mille carré doré")}
          </h2>
          <p>
            {t(
              "On Sherbrooke Street West, a red woven wall hanging catches the eye through a screen of pale brick. Along the banquette, softly lit niches brighten the wooden tables. Welcome your guests at the bar, then settle in for dinner.",
              "Rue Sherbrooke Ouest, une tenture rouge se découvre à travers une cloison de briques claires. Le long de la banquette, des niches éclairent doucement les tables en bois. Accueillez vos invités au bar, puis passez à table.",
            )}
          </p>
        </div>
      </section>

      <Image
        className={css.barPhoto}
        src="/img/group-events/bar.webp"
        width={1600}
        height={1067}
        sizes="100vw"
        alt={t(
          "The warmly lit bar and sculpted ceiling at BOUS",
          "Le bar de BOUS sous un plafond sculpté, dans une lumière dorée",
        )}
      />

      <section className={css.occasions} aria-labelledby="occasions-heading">
        <div className={css.pair}>
          <Image
            width={840}
            height={1258}
            sizes="(max-width:760px) 47vw, 23vw"
            src="/img/group-events/group-at-dinner.webp"
            alt={t(
              "Guests in conversation around a long dinner table, seen through the brick screen",
              "Des convives discutent autour d’une longue table, à travers la cloison de briques",
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
