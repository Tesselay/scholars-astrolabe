import { localeByPath, type LocalePath, locales } from "../locales.ts";

export function getLangFromUrl(url: URL): LocalePath {
  const parts = url.pathname.split("/");
  const lang = parts[1];
  return localeByPath[lang].path;
}

export function getLangFromId(id: string): LocalePath {
  const parts = ("/" + String(id)).split("/");
  const lang = parts[1] ?? "";
  return localeByPath[lang].path;
}

export function getAlternateLocalesByURL(url: URL) {
  const currentLocale = getLangFromUrl(url);
  return locales.filter((locale) => locale.path !== currentLocale);
}

export function getAlternateLocalesByLang(lang: LocalePath) {
  return locales.filter((locale) => locale.path !== lang);
}
