import type { Language } from "@/context/LanguageContext";

const OPENTABLE_RESERVATION_BASE_URL =
  "https://www.opentable.ca/r/bous-reservations-montreal";
const OPENTABLE_RESTAURANT_REF = "1478878";
const OPENTABLE_SOURCE = "Restaurant%20website";

export function getOpenTableReservationUrl(language: Language) {
  const openTableLanguage = language === "fr" ? "fr-CA" : "en-CA";

  return `${OPENTABLE_RESERVATION_BASE_URL}?restref=${OPENTABLE_RESTAURANT_REF}&lang=${openTableLanguage}&ot_source=${OPENTABLE_SOURCE}`;
}
