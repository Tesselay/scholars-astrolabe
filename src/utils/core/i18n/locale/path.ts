import { type LocaleRoute, localesMap } from "&utils/core/i18n/locale/definition.ts";
import { assertLocaleRoute } from "&utils/core/i18n/locale/guards.ts";

function findLocaleSegment(path: string): string | undefined {
  const segments = path.split("/");
  for (const segment of segments) {
    if (localesMap.has(segment as LocaleRoute)) {
      return segment;
    }
  }

  return undefined;
}

function getLocaleRouteFromPathStrict(path: string): LocaleRoute {
  const locale = findLocaleSegment(path);
  if (locale === undefined) {
    throw new Error(`[i18n] No locale segment found in path: "${path}"`);
  }
  assertLocaleRoute(locale);

  return locale;
}

export { findLocaleSegment, getLocaleRouteFromPathStrict };
