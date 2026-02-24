import { type LocaleRoute, localesMap } from "@/utils/core/i18n/locale/locales.ts";

export function assertLocaleRoute(value: string): asserts value is LocaleRoute {
  if (!localesMap.has(value as LocaleRoute)) {
    throw new Error(`[i18n] Invalid locale path: "${value}"`);
  }
}
