import type { Language } from "@/context/LanguageContext";

export const GIFT_CARD_URL =
  "https://mylightspeed.app/giftcard/v2/80c9144d-42cc-4e69-8e75-343e6506fe4f";

const OPENTABLE_RESERVATION_BASE_URL =
  "https://www.opentable.ca/r/bous-reservations-montreal";
const OPENTABLE_RESTAURANT_REF = "1478878";
const OPENTABLE_SOURCE = "Restaurant%20website";

export function getOpenTableReservationUrl(language: Language) {
  const openTableLanguage = language === "fr" ? "fr-CA" : "en-CA";

  return `${OPENTABLE_RESERVATION_BASE_URL}?restref=${OPENTABLE_RESTAURANT_REF}&lang=${openTableLanguage}&ot_source=${OPENTABLE_SOURCE}`;
}
