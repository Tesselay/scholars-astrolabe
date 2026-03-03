import { type ExtendedLocale, localesMap } from "@utils/core/i18n/locale/definition.ts";
import { assertLocaleRoute } from "@utils/core/i18n/locale/guards.ts";

export function getLocaleObjectByLocaleRoute(path: string): ExtendedLocale {
  assertLocaleRoute(path);

  return localesMap.get(path)!;
}
