import { type LocalePath, locales } from "../locales.ts";
import { pathHasLocale } from "astro:i18n";

export function collapseSlashes(str: string): string {
  return String(str).replace(/\/+/g, "/");
}

export function trimSlashes(str: string): string {
  return String(str).replace(/^\/+|\/+$/g, "");
}

export function ensureLeadingSlash(str: string): string {
  const collapsed = collapseSlashes(String(str));
  return collapsed.startsWith("/") ? collapsed : "/" + collapsed.replace(/^\/+/, "");
}

export function ensureTrailingSlash(str: string): string {
  return str.endsWith("/") ? str : str + "/";
}

export function pathsForAllLocales(): { params: { lang: LocalePath } }[] {
  return locales.map((locale) => ({ params: { lang: locale.path } }));
}

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

export function normalizePath(path: string): string {
  let normalizedPath = ensureLeadingSlash(path);
  normalizedPath = ensureTrailingSlash(normalizedPath);
  normalizedPath = collapseSlashes(normalizedPath);
  normalizedPath = normalizedPath.normalize();

  return normalizedPath;
}
