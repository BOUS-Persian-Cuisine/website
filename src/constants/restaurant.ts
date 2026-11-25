import { getOpenTableReservationUrl } from "./links";
import { localizedHref, siteOrigin } from "./siteRoutes";
import { translations, type Language } from "@/context/LanguageContext";

export function restaurantDetails(language: Language) {
  const { contact, footer } = translations[language];
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": siteOrigin + "/#restaurant",
    name: "BOUS Persian Cuisine",
    url: siteOrigin + localizedHref("/", language),
    telephone: contact.phone,
    email: contact.email,
    servesCuisine: "Persian",
    image: [siteOrigin + "/img/bous-shared-table.webp", siteOrigin + "/img/group-events/bar-portrait.webp"],
    address: {
      "@type": "PostalAddress",
      streetAddress: footer.addressLines[0],
      addressLocality: "Montréal",
      addressRegion: "QC",
      postalCode: footer.addressLines[2],
      addressCountry: "CA",
    },
    openingHoursSpecification: [
      { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "11:30", closes: "14:30" },
      { dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "17:30", closes: "22:00" },
      { dayOfWeek: ["Friday", "Saturday"], opens: "17:30", closes: "23:00" },
    ].map(period => ({ "@type": "OpeningHoursSpecification", ...period })),
    hasMenu: ["/menu/", "/lunch-menu/", "/group-menu/"].map(path => siteOrigin + localizedHref(path, language)),
    acceptsReservations: getOpenTableReservationUrl(language),
    sameAs: ["https://www.instagram.com/bousmontreal/", "https://www.opentable.ca/r/bous-montreal"],
  };
}
