import { defaultLocale, isLocale, type Locale, locales } from "../locales.ts";

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  if (isLocale(lang)) return lang as Locale;
  return defaultLocale;
}

export function getLangFromId(id: string): Locale {
  const parts = ("/" + String(id)).split("/");
  const candidate = parts[1] ?? "";
  return isLocale(candidate) ? (candidate as Locale) : defaultLocale;
}

export function getAllLocales(): Locale[] {
  return [...locales] as Locale[];
}

export function getAlternateLocalesByURL(url: URL): Locale[] {
  const currentLocale = getLangFromUrl(url);
  return getAllLocales().filter((lang) => lang !== currentLocale);
}

export function getAlternateLocalesByLang(lang: Locale): Locale[] {
  return getAllLocales().filter((l) => l !== lang);
}
