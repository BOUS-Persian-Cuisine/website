import Image from "next/image";

import { SiteLayout } from "@/components/SiteLayout";
import { useLanguage, type Language } from "@/context/LanguageContext";

type Translation = Record<Language, string>;
type Story = {
  outlet: string;
  date: string;
  title: string | Translation;
  url: string | Translation;
  summary: Translation;
  sourceLanguage?: Language;
};

const bestNew = {
  en: "https://tastet.ca/en/lists/best-new-restaurants-montreal-2026/",
  fr: "https://tastet.ca/listes/meilleurs-nouveaux-restos-montreal-2026/",
};

const stories: Story[] = [
  {
    outlet: "CJAD 800",
    date: "2026-10-24",
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
    title: "Inside BOUS, Montreal’s Buzzy New Persian Restaurant",
    url: "https://offshoretravelmagazine.com/bous-montreal-persian-restaurant-interview/",
    sourceLanguage: "en",
    summary: {
      en: "In conversation with Renee Morrison, Hamed and Saba explain taarof, tell the story of the wooden tables shipped from Iran and share their fesenjoon recipe.",
      fr: "Dans un entretien avec Renee Morrison, Hamed et Saba expliquent le taarof, racontent le voyage de leurs tables en bois depuis l’Iran et partagent leur recette de fesenjoon.",
    },
  },
  {
    outlet: "Le Journal de Montréal",
    date: "2026-06-25",
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
  const dateFormat = new Intl.DateTimeFormat(french ? "fr-CA" : "en-CA", {
    month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
  });

  return (
    <SiteLayout title={t.header.nav.press + " · BOUS"}>
      <main className="bg-[#fffdf9] text-bous-burgundy">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-9 sm:py-16 lg:px-12">
          <h1 className="font-operetta mb-8 text-5xl font-light sm:text-7xl">{t.header.nav.press}</h1>
          <article className="grid overflow-hidden bg-bous-burgundy text-white md:grid-cols-2">
            <div className="relative min-h-48 md:min-h-72">
              <Image src="/img/group-table.jpg" alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
              <p className="text-sm uppercase tracking-[.14em] text-bous-cream">Tastet</p>
              <h2 className="font-operetta mt-3 text-4xl font-light leading-tight">
                {french ? "Les meilleurs nouveaux restos de 2026" : "The Best New Restaurants of 2026"}
              </h2>
              <p className="mt-4 leading-relaxed text-bous-cream">
                {french ? "Tastet sélectionne BOUS parmi ses nouvelles tables préférées à Montréal." : "Tastet names BOUS among its favourite new restaurants in Montréal."}
              </p>
              <a href={bestNew[language]} className="mt-5 self-start underline underline-offset-4">
                {french ? "Voir la sélection de Tastet" : "See Tastet’s selection"}
              </a>
            </div>
          </article>
          <ul className="mt-10 divide-y divide-bous-gold/50 border-y border-bous-gold/50">
            {stories.map(story => (
              <li key={story.outlet} className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <div>
                  <p className="font-semibold">{story.outlet}</p>
                  <time dateTime={story.date} className="text-sm text-bous-burgundy/75">{dateFormat.format(new Date(story.date))}</time>
                </div>
                <article>
                  <h2 className="font-operetta text-2xl font-light sm:text-3xl">
                    <a href={local(story.url)} hrefLang={story.sourceLanguage ?? language} lang={story.sourceLanguage ?? language} className="underline decoration-bous-gold underline-offset-4 hover:text-bous-red">
                      {local(story.title)}
                    </a>
                  </h2>
                  <p className="mt-2 max-w-[65ch] leading-relaxed">{story.summary[language]}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </SiteLayout>
  );
}
