import pages from "./sitePages.json";
import type { Language } from "@/context/LanguageContext";

export const siteOrigin = "https://bous.ca";

export function pageForPath(path: string) {
  const clean = path.split(/[?#]/, 1)[0].replace(/\/?$/, "/");
  return pages.find(({ en, fr }) => en.path === clean || fr.path === clean);
}

export function localizedHref(href: string, language: Language) {
  const page = pageForPath(href);
  if (!page) return href;
  return page[language].path + href.slice(href.split(/[?#]/, 1)[0].length);
}

export function pageLanguage(path: string): Language {
  return path === "/fr" || path.startsWith("/fr/") ? "fr" : "en";
}
