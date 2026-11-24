import Image from "next/image";

import { SiteLayout } from "@/components/SiteLayout";
import { useLanguage, type Language } from "@/context/LanguageContext";
import styles from "@/styles/press.module.css";

type Translation = Record<Language, string>;
type Story = {
  outlet: string;
  date: string;
  image: string;
  photoCredit?: string;
  linkText?: Translation;
  title: string | Translation;
  url: string | Translation;
  summary: Translation;
  sourceLanguage?: Language;
};

const stories: Story[] = [
  {
    outlet: "Tastet",
    date: "2026",
    image: "shared-table",
    title: { en: "The Best New Restaurants of 2026", fr: "Les meilleurs nouveaux restos de 2026" },
    url: {
      en: "https://tastet.ca/en/lists/best-new-restaurants-montreal-2026/",
      fr: "https://tastet.ca/listes/meilleurs-nouveaux-restos-montreal-2026/",
    },
    summary: {
      en: "Tastet names BOUS among its favourite new restaurants in Montréal.",
      fr: "Tastet sélectionne BOUS parmi ses nouvelles tables préférées à Montréal.",
    },
    linkText: { en: "See the list", fr: "Voir la sélection" },
  },
  {
    outlet: "CJAD 800",
    date: "2026-10-24",
    image: "founders",
    photoCredit: "Elizabeth Gartside",
    linkText: { en: "Listen to the interview", fr: "Écouter l’entrevue" },
    title: "Unwined with Mandi Robertson",
    url: "https://podcasts.apple.com/ca/podcast/unwined-were-discovering-bous-a-montreal-restaurant/id1733077961?i=1000797929077",
    sourceLanguage: "en",
    summary: {
      en: "Listen to Hamed Masoumi and Saba Heravi talk about the tastes they brought from Iran to Montréal. Sommelier Hadrien Lottiaux joins them to talk wine pairings.",
      fr: "Hamed Masoumi et Saba Heravi racontent les saveurs qui les ont accompagnés de l’Iran à Montréal. Le sommelier Hadrien Lottiaux se joint à eux pour parler des accords mets et vins.",
    },
  },
  {
    outlet: "Mixte Magazine",
    date: "2026-10-23",
    image: "ghormeh-sabzi",
    title: { en: "Gourmet Findings", fr: "Découvertes gastronomiques" },
    url: { en: "https://www.mixtemagazine.ca/en/restaurant/gourmet-findings/", fr: "https://www.mixtemagazine.ca/resto/decouvertes-gastronomiques/" },
    summary: {
      en: "Marie-Claude Di-Lillo highlights the crisp saffron tahchin, smoked eggplant and lamb ghormeh sabzi.",
      fr: "Marie-Claude Di-Lillo s’attarde au tahchin croustillant au safran, à l’aubergine fumée et au ghormeh sabzi à l’agneau.",
    },
  },
  {
    outlet: "Offshore Travel Magazine",
    date: "2026-09-14",
    image: "dining-room",
    title: "Inside BOUS, Montreal’s Buzzy New Persian Restaurant",
    url: "https://offshoretravelmagazine.com/bous-montreal-persian-restaurant-interview/",
    sourceLanguage: "en",
    summary: {
      en: "In conversation with Renee Morrison, Hamed and Saba explain taarof, tell the story of the wooden tables shipped from Iran and share their fesenjoon recipe.",
      fr: "Dans un entretien avec Renee Morrison, Hamed et Saba expliquent le taarof, racontent le voyage de leurs tables en bois depuis l’Iran et partagent leur recette de fesenjoon.",
    },
  },
  {
    outlet: "La Presse",
    date: "2026-08-08",
    image: "saffron-kabab",
    title: "Lumière sur des saveurs millénaires chez BOUS",
    url: "https://www.lapresse.ca/gourmand/multicolore/les-mille-et-une-couleurs-de-la-cuisine-persane/2026-08-08/cuisine-persane/lumiere-sur-des-saveurs-millenaires-chez-bous.php",
    sourceLanguage: "fr",
    summary: {
      en: "Ève Dumas meets Hamed Masoumi and explores the colours of his Persian table, from golden saffron rice to ruby-red barberries.",
      fr: "Ève Dumas rencontre Hamed Masoumi et découvre les couleurs de sa table persane, du riz doré au safran au rouge vif des épines-vinettes.",
    },
  },
  {
    outlet: "Le Journal de Montréal",
    date: "2026-06-25",
    image: "yogurt",
    title: "7 restaurants à visiter cet été",
    url: "https://www.journaldemontreal.com/2026/06/25/7-restaurants-a-visiter-cet-ete",
    sourceLanguage: "fr",
    summary: {
      en: "Tommy Dion picks BOUS for his summer shortlist, singling out the house-made yogurts and the depth of the slow-cooked stews.",
      fr: "Tommy Dion retient BOUS parmi ses adresses de l’été et souligne la qualité des yogourts maison et l’intensité des mijotés.",
    },
  },
  {
    outlet: "Tastet",
    date: "2026-06-18",
    image: "bar",
    title: { en: "BOUS: A Chic Persian Restaurant on Sherbrooke Street West", fr: "BOUS : Adresse chic et cuisine persane sur la rue Sherbrooke Ouest" },
    url: { en: "https://tastet.ca/en/reviews/bous-a-chic-persian-restaurant-on-sherbrooke-street-west/", fr: "https://tastet.ca/critiques/bous-adresse-chic-et-cuisine-persane-sur-la-rue-sherbrooke-ouest/" },
    summary: {
      en: "Tastet follows a meal from saffron rice to date cake, with a stop at the central bar for Persian-inspired mocktails.",
      fr: "Du riz au safran au gâteau aux dattes, Tastet raconte le repas et s’arrête au bar central pour ses cocktails sans alcool aux parfums persans.",
    },
  },
  {
    outlet: "La Métropole",
    date: "2026-05-24",
    image: "cocktail",
    title: "Restaurant BOUS, une cuisine persane authentique",
    url: "https://lametropole.com/2026/05/24/gastronomie-restaurant-bous-une-cuisine-persane-authentique/",
    sourceLanguage: "fr",
    summary: {
      en: "Myriam Lessard explores the sofreh tradition of gathering around a shared meal and the Persian aromatics in Tao Zrafi’s drinks.",
      fr: "Myriam Lessard explore la tradition du sofreh, autour duquel on prend le temps de partager un repas, et les aromates persans des cocktails de Tao Zrafi.",
    },
  },
  {
    outlet: "Eat Drink & Be Carrie",
    date: "2026-05-21",
    image: "dinner",
    title: { en: "BOUS Montreal: a NEW Persian Restaurant Redefining Elegant Cuisine", fr: "BOUS Montréal : un NOUVEAU restaurant perse qui redéfinit la cuisine raffinée" },
    url: { en: "https://eatdrinkbecarrie.com/bous-montreal-a-new-persian-restaurant-redefining-elegant-cuisine/", fr: "https://eatdrinkbecarrie.com/fr/bous-montreal-a-new-persian-restaurant-redefining-elegant-cuisine/" },
    summary: {
      en: "At an invited media dinner, Carrie MacPherson finds a favourite in the duck fesenjoon with walnuts and pomegranate.",
      fr: "Invitée à un souper de presse, Carrie MacPherson a un coup de cœur pour le fesenjoon de canard aux noix et à la grenade.",
    },
  },
];

export default function Press() {
  const { language, t } = useLanguage();
  const french = language === "fr";
  const local = (value: string | Translation) => typeof value === "string" ? value : value[language];
  const archiveLabels = french
    ? { date: "Date", title: "Titre", description: "Description", links: "Liens", read: "Lire l’article" }
    : { date: "Date", title: "Title", description: "Description", links: "Links", read: "Read article" };

  return (
    <SiteLayout title={t.header.nav.press + " · BOUS"}>
      <main className={styles.page}>
        <div className={styles.archive}>
          <h1 className={styles.pageTitle}>{t.header.nav.press}</h1>
          <div className={styles.columns} aria-hidden="true">
            <span>{archiveLabels.date}</span>
            <span>{archiveLabels.title}</span>
            <span>{archiveLabels.description}</span>
            <span>{archiveLabels.links}</span>
          </div>
          <ul className={styles.stories} role="list">
            {stories.map((story, index) => {
              const title = local(story.title);
              const action = story.linkText?.[language] ?? archiveLabels.read;
              const titleId = `press-title-${story.image}`;
              return (
                <li key={story.image}>
                  <article className={styles.row} aria-labelledby={titleId}>
                    <figure className={styles.photo}>
                      <Image
                        src={`/img/press/${story.image}.webp`}
                        alt=""
                        width={600}
                        height={450}
                        priority={index === 0}
                      />
                      {story.photoCredit && <figcaption>© {story.photoCredit}</figcaption>}
                    </figure>
                    <div className={styles.metadata}>
                      <time className={styles.date} dateTime={story.date}>
                        {story.date.split("-").reverse().join(".")}
                      </time>
                      <p className={styles.outlet}>{story.outlet}</p>
                    </div>
                    <h2 className={styles.heading} id={titleId} lang={story.sourceLanguage ?? language}>{title}</h2>
                    <p className={styles.summary}>{story.summary[language]}</p>
                    <a
                      className={styles.link}
                      href={local(story.url)}
                      hrefLang={story.sourceLanguage ?? language}
                      aria-label={`${action} · ${story.outlet} · ${title}`}
                    >
                      <span className={styles.arrow} aria-hidden="true" />
                      <span>{action}</span>
                    </a>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </SiteLayout>
  );
}
