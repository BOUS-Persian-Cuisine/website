import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "fr";

type Translations = {
  common: {
    siteTitle: string;
  };
  header: {
    openMenu: string;
    closeMenu: string;
    homeLabel: string;
    logoAlt: string;
    menuLabel: string;
    nav: {
      reserve: string;
      menu: string;
      about: string;
      contact: string;
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
    reserveTable: string;
    contactLinksLabel: string;
    links: {
      menu: string;
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
    bodySuffix: string;
  };
};

const storageKey = "bous-language";

export const languageLabels: Record<Language, "EN" | "FR"> = {
  en: "EN",
  fr: "FR",
};

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      siteTitle: "BOUS - Persian Cuisine",
    },
    header: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      homeLabel: "BOUS home",
      logoAlt: "BOUS Persian Cuisine",
      menuLabel: "Menu",
      nav: {
        reserve: "Reserve",
        menu: "Menu",
        about: "About",
        contact: "Contact",
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
      reserveTable: "Reserve a table",
      contactLinksLabel: "Contact links",
      links: {
        menu: "Menu",
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
        "Please email us. We’re happy to answer any questions you may have about our restaurant, menu, or reservations. You can reach us at",
      email: "info@bous.ca",
      bodySuffix: ".",
    },
  },
  fr: {
    common: {
      siteTitle: "BOUS - Cuisine perse",
    },
    header: {
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      homeLabel: "Accueil BOUS",
      logoAlt: "BOUS Cuisine perse",
      menuLabel: "Menu",
      nav: {
        reserve: "Réserver",
        menu: "Menu",
        about: "À propos",
        contact: "Contact",
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
      reserveTable: "Réserver une table",
      contactLinksLabel: "Liens de contact",
      links: {
        menu: "Menu",
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
        "Écrivez-nous par courriel. Il nous fera plaisir de répondre à vos questions au sujet de notre restaurant, de notre menu ou des réservations. Vous pouvez nous joindre à",
      email: "info@bous.ca",
      bodySuffix: ".",
    },
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

function parseLanguage(value: string | null): Language | null {
  const normalized = value?.toLowerCase();

  if (normalized === "en" || normalized === "fr") {
    return normalized;
  }

  return null;
}

function getHtmlLang(language: Language) {
  return language === "fr" ? "fr-CA" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [hasLoadedLanguage, setHasLoadedLanguage] = useState(false);

  useEffect(() => {
    try {
      const storedLanguage = parseLanguage(
        window.localStorage.getItem(storageKey),
      );

      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    } catch {
      // Local storage can be blocked in private browsing or strict settings.
    } finally {
      setHasLoadedLanguage(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = getHtmlLang(language);

    if (!hasLoadedLanguage) return;

    try {
      window.localStorage.setItem(storageKey, language);
    } catch {
      // Persistence is best-effort; the in-memory selection still works.
    }
  }, [hasLoadedLanguage, language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === "en" ? "fr" : "en"));
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: translations[language],
    }),
    [language, toggleLanguage],
  );

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
