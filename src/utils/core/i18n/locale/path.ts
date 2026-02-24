import { type LocaleRoute, localesMap } from "@/utils/core/i18n/locale/definition.ts";
import { ensureLeadingSlash } from "@/utils/core/string/normalization.ts";
import { normalizePath } from "@/utils/core/path/normalization.ts";
import { assertLocaleRoute } from "@/utils/core/i18n/locale/guards.ts";

function findLocaleSegment(normalizedPath: string): string {
  const segments = normalizedPath.split("/");
  for (const segment of segments) {
    if (localesMap.has(segment as LocaleRoute)) {
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

export function localizePath(locale: LocaleRoute, path: string): string {
  assertLocaleRoute(locale);
  const localizedPath = String(locale) + ensureLeadingSlash(path);

  return normalizePath(localizedPath);
}

export function getLocaleRouteFromPath(path: string): string {
  const normalizedPath = normalizePath(path);
  return findLocaleSegment(normalizedPath);
}

export function getLocaleRouteFromPathStrict(path: string): LocaleRoute {
  const locale = findLocaleSegment(normalizePath(path));
  assertLocaleRoute(locale);
  return locale;
}
