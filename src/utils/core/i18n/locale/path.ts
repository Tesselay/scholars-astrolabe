import { type LocaleRoute, localesMap } from "&utils/core/i18n/locale/definition.ts";
import { assertLocaleRoute } from "&utils/core/i18n/locale/guards.ts";

function findLocaleSegment(path: string): string {
  const segments = path.split("/");
  for (const segment of segments) {
    if (localesMap.has(segment as LocaleRoute)) {
      return segment;
    }
  }

  return "";
}

function getLocaleRouteFromPath(path: string): string {
  return findLocaleSegment(path);
}

function getLocaleRouteFromPathStrict(path: string): LocaleRoute {
  const locale = findLocaleSegment(path);
  assertLocaleRoute(locale);

  return locale;
}

export { findLocaleSegment, getLocaleRouteFromPath, getLocaleRouteFromPathStrict };
