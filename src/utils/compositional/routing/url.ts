import { normalizeAstroPath } from "&utils/adapter/astro/path.ts";
import type { LocaleRoute } from "&utils/core/i18n/locale/definition.ts";
import { assertLocaleRoute } from "&utils/core/i18n/locale/guards.ts";
import { findLocaleSegment } from "&utils/core/i18n/locale/path.ts";
import { urlPathLocaleIndex } from "&utils/core/routing/url.ts";

function localizeUrlPath(locale: LocaleRoute, urlPath: string): string {
  const hasLocale = findLocaleSegment(urlPath);

  if (hasLocale) {
    console.warn(`[i18n] Path "${urlPath}" already contains locale "${locale}"`);

    return urlPath;
  }

  assertLocaleRoute(locale);
  const segments = urlPath.split("/").filter(Boolean);
  segments.splice(urlPathLocaleIndex, 0, locale);

  const localizedPath = urlPath.endsWith("/") ? segments.join("/") + "/" : segments.join("/");

  return normalizeAstroPath(localizedPath);
}

function neutralizeUrlPath(urlPath: string): string {
  const locale = findLocaleSegment(urlPath);

  if (locale) {
    const segments = urlPath.split("/").filter(Boolean);
    if (segments[urlPathLocaleIndex] === locale) {
      segments.splice(urlPathLocaleIndex, 1);
    }
    let neutralizedPath = segments.join("/");
    neutralizedPath = urlPath.endsWith("/") ? neutralizedPath + "/" : neutralizedPath;

    return normalizeAstroPath(neutralizedPath);
  }

  return urlPath;
}

export { localizeUrlPath, neutralizeUrlPath };
