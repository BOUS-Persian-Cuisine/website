import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

import { useRouter } from "next/router";
import { pageLanguage } from "@/constants/siteRoutes";

export type Language = "en" | "fr";

type Translations = {
  common: {
    siteTitle: string;
    giftCards: string;
  };
  header: {
    openMenu: string;
    closeMenu: string;
    homeLabel: string;
    logoAlt: string;
    menuLabel: string;
    infoLabel: string;
    nav: {
      reserve: string;
      menu: string;
      about: string;
      contact: string;
      press: string;
      groupEvent: string;
    };
    languageAriaLabels: Record<Language, string>;
  };
  home: {
    cuisine: string;
  };
  footer: {
    sections: {
      info: string;
      dine: string;
      contact: string;
    };
    addressLines: string[];
    openingHours: {
      title: string;
      services: { name: string; periods: { days: string; time: string }[] }[];
    };
    reserveTable: string;
    contactLinksLabel: string;
    links: {
      menu: string;
      drinksMenu: string;
      lunchMenu: string;
      wine: string;
      groupMenu: string;
      about: string;
      contact: string;
      email: string;
      instagram: string;
    };
  };
  about: {
    pageTitle: string;
    sectionLabel: string;
    body: string;
  };
  contact: {
    pageTitle: string;
    sectionLabel: string;
    bodyPrefix: string;
    email: string;
    bodyConnector: string;
    phone: string;
    bodySuffix: string;
  };
};

export const languageLabels: Record<Language, "EN" | "FR"> = {
  en: "EN",
  fr: "FR",
};

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      siteTitle: "BOUS - Persian Cuisine",
      giftCards: "Gift Cards",
    },
    header: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      homeLabel: "BOUS home",
      logoAlt: "BOUS Persian Cuisine",
      menuLabel: "Menu",
      infoLabel: "About BOUS",
      nav: {
        reserve: "Reserve",
        menu: "Menu",
        about: "About",
        contact: "Contact",
        press: "Press",
        groupEvent: "Group Event",
      },
      languageAriaLabels: {
        en: "Show site in English",
        fr: "Show site in French",
      },
    },
    home: {
      cuisine: "Persian Cuisine",
    },
    footer: {
      sections: {
        info: "Info",
        dine: "Dine",
        contact: "Contact",
      },
      addressLines: ["1310 Sherbrooke W", "Montréal, Québec", "H3G 1H9"],
      openingHours: {
        title: "Opening hours",
        services: [
          { name: "Lunch", periods: [{ days: "Mon–Fri", time: "11:30 am–2:30 pm" }] },
          {
            name: "Dinner",
            periods: [
              { days: "Sun–Thu", time: "5:30–10 pm" },
              { days: "Fri–Sat", time: "5:30–11 pm" },
            ],
          },
        ],
      },
      reserveTable: "Reserve a table",
      contactLinksLabel: "Contact links",
      links: {
        menu: "Dinner Menu",
        drinksMenu: "Drinks Menu",
        lunchMenu: "Lunch Menu",
        wine: "Wine",
        groupMenu: "Group Menus",
        about: "About",
        contact: "Contact",
        email: "Email",
        instagram: "Instagram",
      },
    },
    about: {
      pageTitle: "About BOUS - Persian Cuisine",
      sectionLabel: "About",
      body: "BOUS is a modern destination for Persian cuisine located in Montreal’s Golden Square Mile, where tradition is approached with care, refinement, and a contemporary perspective. Rooted in the richness of Iranian culinary culture, the restaurant offers an intimate dining experience shaped by thoughtful design, warmth, and attentive hospitality. Each dish is grounded in authenticity, inviting guests to discover the depth and elegance of Persian flavours in a setting that feels both elevated and welcoming.",
    },
    contact: {
      pageTitle: "Contact BOUS - Persian Cuisine",
      sectionLabel: "Contact",
      bodyPrefix:
        "Please email or call us. We’re happy to answer any questions you may have about our restaurant, menu, or reservations. You can reach us at",
      email: "info@bous.ca",
      bodyConnector: " or ",
      phone: "+1 438 900 1310",
      bodySuffix: ".",
    },
  },
  fr: {
    common: {
      siteTitle: "BOUS - Cuisine perse",
      giftCards: "Cartes-cadeaux",
    },
    header: {
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      homeLabel: "Accueil BOUS",
      logoAlt: "BOUS Cuisine perse",
      menuLabel: "Menu",
      infoLabel: "À propos de BOUS",
      nav: {
        reserve: "Réserver",
        menu: "Menu",
        about: "À propos",
        contact: "Contact",
        press: "Presse",
        groupEvent: "Événement de groupe",
      },
      languageAriaLabels: {
        en: "Afficher le site en anglais",
        fr: "Afficher le site en français",
      },
    },
    home: {
      cuisine: "Cuisine perse",
    },
    footer: {
      sections: {
        info: "Info",
        dine: "À table",
        contact: "Contact",
      },
      addressLines: [
        "1310, rue Sherbrooke Ouest",
        "Montréal, Québec",
        "H3G 1H9",
      ],
      openingHours: {
        title: "Heures d’ouverture",
        services: [
          { name: "Dîner", periods: [{ days: "Lun–ven", time: "11 h 30–14 h 30" }] },
          {
            name: "Souper",
            periods: [
              { days: "Dim–jeu", time: "17 h 30–22 h" },
              { days: "Ven–sam", time: "17 h 30–23 h" },
            ],
          },
        ],
      },
      reserveTable: "Réserver une table",
      contactLinksLabel: "Liens de contact",
      links: {
        menu: "Menu du soir",
        drinksMenu: "Carte des boissons",
        lunchMenu: "Menu midi",
        wine: "Vins",
        groupMenu: "Menus de groupe",
        about: "À propos",
        contact: "Contact",
        email: "Courriel",
        instagram: "Instagram",
      },
    },
    about: {
      pageTitle: "À propos de BOUS - Cuisine perse",
      sectionLabel: "À propos",
      body: "BOUS est une destination moderne de cuisine perse située dans le Mille carré doré de Montréal, où la tradition est abordée avec soin, raffinement et un regard contemporain. Enraciné dans la richesse de la culture culinaire iranienne, le restaurant propose une expérience intime, portée par un design réfléchi, une ambiance chaleureuse et un service attentionné. Chaque plat s’appuie sur l’authenticité et invite les convives à découvrir la profondeur et l’élégance des saveurs perses dans un cadre à la fois raffiné et accueillant.",
    },
    contact: {
      pageTitle: "Contact BOUS - Cuisine perse",
      sectionLabel: "Contact",
      bodyPrefix:
        "Écrivez-nous ou appelez-nous. Il nous fera plaisir de répondre à vos questions au sujet de notre restaurant, de notre menu ou des réservations. Vous pouvez nous joindre à",
      email: "info@bous.ca",
      bodyConnector: " ou ",
      phone: "+1 438 900 1310",
      bodySuffix: ".",
    },
  },
};

type LanguageContextValue = {
  language: Language;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = pageLanguage(useRouter().pathname);
  useEffect(() => {
    document.documentElement.lang = language === "fr" ? "fr-CA" : "en-CA";
  }, [language]);
  const value = useMemo(() => ({ language, t: translations[language] }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
