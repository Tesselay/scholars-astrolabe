import {
  type ExtendedLocale,
  type LocalePath,
  localesMap
} from "@/utils/core/i18n/locale/locales.ts";
import { ensureLeadingSlash } from "@/utils/core/string/normalization.ts";
import { normalizePath } from "@/utils/core/path/normalization.ts";
import { assertLocalePath } from "@/utils/core/i18n/locale/guards.ts";

function findLocaleSegment(normalizedPath: string): string {
  const segments = normalizedPath.split("/");
  for (const segment of segments) {
    if (localesMap.has(segment as LocalePath)) {
      return segment;
    }
  }
  return "";
}

export function neutralizePath(path: string): string {
  const normalizedPath = normalizePath(path);
  const locale = findLocaleSegment(normalizedPath);

  if (locale) {
    const segments = normalizedPath.split("/");
    const neutralizedPath = segments.slice(2).join("/");

    return normalizePath(neutralizedPath);
  }

  return normalizedPath;
}
export function getLocaleObjectByLocalePath(path: string): ExtendedLocale {
  assertLocalePath(path);

  return localesMap.get(path)!;
}
export function localizePath(locale: LocalePath, path: string): string {
  assertLocalePath(locale);
  const localizedPath = String(locale) + ensureLeadingSlash(path);

  return normalizePath(localizedPath);
}

export function getLocalePathFromPath(path: string): string {
  const normalizedPath = normalizePath(path);
  return findLocaleSegment(normalizedPath);
}

export function getLocalePathFromPathStrict(path: string): LocalePath {
  const locale = findLocaleSegment(normalizePath(path));
  assertLocalePath(locale);
  return locale;
}
