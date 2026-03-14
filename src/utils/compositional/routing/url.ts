import { normalizeAstroPath } from "&utils/adapter/astro/path.ts";
import type { LocaleRoute } from "&utils/core/i18n/locale/definition.ts";
import { assertLocaleRoute } from "&utils/core/i18n/locale/guards.ts";
import { findLocaleSegment } from "&utils/core/i18n/locale/path.ts";
import { urlPathLocaleIndex } from "&utils/core/routing/url.ts";

export function localizeUrlPath(locale: LocaleRoute, urlPath: string): string {
  const hasLocale = findLocaleSegment(urlPath);

  if (hasLocale) {
    console.warn(`[i18n] Path "${urlPath}" already contains locale "${locale}"`);

    return urlPath;
  }

  assertLocaleRoute(locale);
  const segments = urlPath.split("/").filter(Boolean);
  segments.splice(urlPathLocaleIndex, 0, locale);

  return normalizeAstroPath(segments.join("/"));
}

export function neutralizeUrlPath(urlPath: string): string {
  const locale = findLocaleSegment(urlPath);

  if (locale) {
    const segments = urlPath.split("/").filter(Boolean);
    if (segments[urlPathLocaleIndex] === locale) {
      segments.splice(urlPathLocaleIndex, 1);
    }
    const neutralizedPath = segments.join("/");

    return normalizeAstroPath(neutralizedPath);
  }

  return urlPath;
}
