import Image from "next/image";
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
          sizes="(max-width: 720px) 100vw, 56vw"
        />
        <div className={css.heroContent}>
          <p className={css.eyebrow}>
            {t("Private dining & events", "Repas privés et événements")}
          </p>
          <h1 id="gather-heading">
            <span>{t("Gather", "Recevoir")}</span>{" "}
            <span>{t("at BOUS", "chez BOUS")}</span>
          </h1>
          <p>
            {t(
              "A Persian table for your guests in Montréal’s Golden Square Mile.",
              "Une table persane pour vos convives au cœur du Mille carré doré de Montréal.",
            )}
          </p>
          <button className={css.heroButton} type="button" onClick={onPlan}>
            {action} <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <nav
        className={css.contents}
        aria-label={t("On this page", "Sur cette page")}
      >
        <a href="#menus">
          {t("The food", "La cuisine")} <span aria-hidden="true">↓</span>
        </a>
        <a href="#setting">
          {t("The space", "Les lieux")} <span aria-hidden="true">↓</span>
        </a>
        <a href="#occasions">
          {t("Your event", "Votre événement")} <span aria-hidden="true">↓</span>
        </a>
      </nav>

      <section
        id="menus"
        className={css.story}
        aria-labelledby="group-menu-heading"
      >
        <div className={css.chapterHeader}>
          <div>
            <p className={css.eyebrow}>
              {t("Persian hospitality", "Hospitalité persane")}
            </p>
            <h2 id="group-menu-heading" tabIndex={-1}>
              {t("Around the sofreh", "Autour du sofreh")}
            </h2>
          </div>
          <div className={css.storyCopy}>
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
          </div>
        </div>
        <div className={css.foodGallery}>
          <figure>
            <Image
              width={640}
              height={959}
              sizes="(max-width: 720px) 45vw, 23vw"
              src="/img/group-events/chef-at-the-pass.webp"
              alt={t(
                "A chef finishing golden tahchin at the pass",
                "Un chef apporte la dernière touche à un tahchin doré",
              )}
            />
            <figcaption>
              {t("Finishing the tahchin", "La finition du tahchin")}
            </figcaption>
          </figure>
          <figure>
            <Image
              width={840}
              height={1260}
              sizes="(max-width: 720px) 45vw, 23vw"
              src="/img/group-events/smoked-eggplant.webp"
              alt={t(
                "Smoked eggplant with kashk, crisp onions and mint",
                "Aubergine fumée garnie de kashk, d’oignons croustillants et de menthe",
              )}
            />
            <figcaption>Kashk-o-Bademjoon</figcaption>
          </figure>
          <figure>
            <Image
              width={840}
              height={1260}
              sizes="(max-width: 720px) 45vw, 23vw"
              src="/img/group-events/lamb-ghormeh-sabzi.webp"
              alt={t(
                "Braised lamb shank standing in a pool of herb sauce",
                "Jarret d’agneau braisé dans une sauce aux fines herbes",
              )}
            />
            <figcaption>
              {t(
                "Kamouraska Lamb Ghormeh Sabzi",
                "Ghormeh Sabzi à l’agneau de Kamouraska",
              )}
            </figcaption>
          </figure>
          <figure>
            <Image
              width={840}
              height={1260}
              sizes="(max-width: 720px) 45vw, 23vw"
              src="/img/group-events/herbed-yogurt.webp"
              alt={t(
                "A bowl of yogurt topped with fresh herbs and colourful petals",
                "Un bol de yogourt garni de fines herbes et de pétales colorés",
              )}
            />
            <figcaption>
              {t("Herbed yogurt", "Yogourt aux fines herbes")}
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="setting"
        className={css.setting}
        aria-labelledby="address-heading"
      >
        <div className={css.settingInner}>
          <div className={css.chapterHeader}>
            <div>
              <p className={css.eyebrow}>
                {t("1310 Sherbrooke Street West", "1310, rue Sherbrooke Ouest")}
              </p>
              <h2 id="address-heading">
                {t(
                  "Inside the Golden Square Mile",
                  "Au cœur du Mille carré doré",
                )}
              </h2>
            </div>
            <p>
              {t(
                "On Sherbrooke Street West, a red woven wall hanging catches the eye through a screen of pale brick. Along the banquette, softly lit niches brighten the wooden tables. Welcome your guests at the bar, then settle in for dinner.",
                "Rue Sherbrooke Ouest, une tenture rouge se découvre à travers une cloison de briques claires. Le long de la banquette, des niches éclairent doucement les tables en bois. Accueillez vos invités au bar, puis passez à table.",
              )}
            </p>
          </div>
          <div className={css.settingGallery}>
            <Image
              src="/img/group-events/bar-portrait.webp"
              width={1365}
              height={2048}
              sizes="(max-width: 680px) 90vw, (max-width: 1440px) 44vw, 34rem"
              alt={t(
                "The warmly lit bar and sculpted ceiling at BOUS",
                "Le bar de BOUS sous un plafond sculpté, dans une lumière dorée",
              )}
            />
            <div className={css.galleryDetails}>
              <section className={css.bar} aria-labelledby="bar-heading">
                <h3 id="bar-heading">
                  {t(
                    "One of Montréal’s most beautiful bars",
                    "L’un des plus beaux bars de Montréal",
                  )}
                </h3>
                <p>
                  {t(
                    "The sculpted ceiling draws on the architecture of ancient Iran. Take a seat at the bar and look up to see how the warm light traces each arch.",
                    "Le plafond sculpté s’inspire de l’architecture de l’Iran antique. Prenez place au bar et levez les yeux pour voir la lumière dorée dessiner la courbe de chaque arche.",
                  )}
                </p>
              </section>
              <div className={css.roomGallery}>
                <Image
                  className={css.loungePhoto}
                  width={1600}
                  height={1067}
                  sizes="(max-width: 680px) 90vw, (max-width: 1080px) 42vw, 28rem"
                  src="/img/group-events/dining-alcove.webp"
                  alt={t(
                    "Three pendant lights above an orchid and a wraparound banquette in the lounge",
                    "Trois suspensions éclairent une orchidée et une banquette en U dans le salon",
                  )}
                />
                <Image
                  width={760}
                  height={1139}
                  sizes="(max-width: 680px) 44vw, (max-width: 1080px) 21vw, 14rem"
                  src="/img/group-events/brickwork-and-tapestry.webp"
                  alt={t(
                    "A red wall hanging beside the open brick screen in the BOUS dining room",
                    "Une tenture rouge près de la cloison de briques ajourée dans la salle de BOUS",
                  )}
                />
                <Image
                  width={700}
                  height={1049}
                  sizes="(max-width: 680px) 44vw, (max-width: 1080px) 21vw, 14rem"
                  src="/img/group-events/set-tables.webp"
                  alt={t(
                    "Wooden tables set for dinner beneath two illuminated wall niches",
                    "Des tables en bois dressées pour le souper sous deux niches éclairées",
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="occasions"
        className={css.occasions}
        aria-labelledby="occasions-heading"
      >
        <h2 id="occasions-heading">
          {t("Make the space yours", "Un lieu pour votre occasion")}
        </h2>
        <Image
          className={css.dinnerPhoto}
          width={840}
          height={1258}
          sizes="(max-width: 480px) 90vw, (max-width: 720px) 27rem, (max-width: 1080px) 42vw, 27rem"
          src="/img/group-events/group-at-dinner.webp"
          alt={t(
            "Guests in conversation around a long dinner table, seen through the brick screen",
            "Des convives discutent autour d’une longue table, à travers la cloison de briques",
          )}
        />
        <div className={css.occasionText}>
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
          <button className={css.plan} type="button" onClick={onPlan}>
            {action} <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
    </div>
  );
}
