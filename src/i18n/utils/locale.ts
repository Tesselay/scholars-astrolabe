import { defaultLocale, type Locale, locales } from "../locales.ts";

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  if ((locales as readonly string[]).includes(lang)) return lang as Locale;
  return defaultLocale;
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
