import { pathHasLocale } from "astro:i18n";
import { type LocalePath, locales } from "@/utils/i18n/locales.ts";
import { ensureLeadingSlash } from "@/utils/core/string/normalization.ts";
import { normalizePath } from "@/utils/core/path/normalization.ts";

export function localizePath(lang: LocalePath, path: string): string {
  let localizedPath = String(lang) + ensureLeadingSlash(path);
  localizedPath = normalizePath(localizedPath);

  return localizedPath;
}

export function neutralizePath(path: string): string {
  if (pathHasLocale(path)) {
    let neutralizedPath = ensureLeadingSlash(path);
    const parts = neutralizedPath.split("/");
    neutralizedPath = parts.slice(2).join("/");
    neutralizedPath = normalizePath(neutralizedPath);

    return neutralizedPath;
  }

  console.warn(`Path "${path}" does not contain a supported locale`);
  return path;
}

export function pathsForAllLocales(): { params: { lang: LocalePath } }[] {
  return locales.map((locale) => ({ params: { lang: locale.path } }));
}

export const localeByPath = Object.fromEntries(locales.map((locale) => [locale.path, locale]));

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
