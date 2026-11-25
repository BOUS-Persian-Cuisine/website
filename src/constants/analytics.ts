import type { Language } from "@/context/LanguageContext";

export function trackBooking(event: "reservation_click" | "group_request_submitted", language: Language) {
  if (!["bous.ca", "www.bous.ca"].includes(window.location.hostname)) return;
  const target = window as Window & { dataLayer?: object[] };
  try {
    (target.dataLayer ??= []).push({ event, page_language: language, page_path: window.location.pathname });
  } catch {
    // Booking must still work when a visitor disables analytics.
  }
}
