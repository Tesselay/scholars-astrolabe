import { type LocaleRoute, localesMap } from "&utils/core/i18n/locale/definition.ts";
import { assertLocaleRoute } from "&utils/core/i18n/locale/guards.ts";

export function findLocaleSegment(path: string): string {
  const segments = path.split("/");
  for (const segment of segments) {
    if (localesMap.has(segment as LocaleRoute)) {
      return segment;
    }
  }

  return "";
}

export function getLocaleRouteFromPath(path: string): string {
  return findLocaleSegment(path);
}

export function getLocaleRouteFromPathStrict(path: string): LocaleRoute {
  const locale = findLocaleSegment(path);
  assertLocaleRoute(locale);

  return locale;
}
