import { pathHasLocale } from "astro:i18n";
import {
  type ExtendedLocale,
  type LocalePath,
  localesMap
} from "@/utils/core/i18n/locale/locales.ts";
import { ensureLeadingSlash } from "@/utils/core/string/normalization.ts";
import { normalizePath } from "@/utils/core/path/normalization.ts";
import { assertLocalePath } from "@/utils/core/i18n/locale/guards.ts";

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

export function getLocaleByLocalePath(path: string): ExtendedLocale {
  assertLocalePath(path);
  return localesMap.get(path)!;
}

// Assumes URL path like "/[lang]/[...slug]"
export function getLangFromUrlPath(path: string): LocalePath {
  const segments = normalizePath(path).split("/");
  const localeSegment = segments[1];
  return getLocaleByLocalePath(localeSegment).path;
}

export function getLangFromPath(path: string): LocalePath {
  const normalizedPath = normalizePath(path);
  const segments = normalizedPath.split("/");
  let localeSegment = "";
  for (const segment of segments) {
    if (localesMap.has(segment as LocalePath)) {
      localeSegment = segment;
    }
  }
  return getLocaleByLocalePath(localeSegment).path;
}
