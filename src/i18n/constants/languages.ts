import { locales, type Locale } from "../locales.ts";

function assertCompleteMap<T extends Record<Locale, unknown>>(map: T): T {
  for (const l of locales as readonly Locale[]) {
    if (!(l in map)) {
      throw new Error(`Missing locale key: ${l}`);
    }
  }
  return map;
}

export const languages = assertCompleteMap({
  en: "English",
  de: "Deutsch",
} as const satisfies Record<Locale, string>);

export const ogLocales = assertCompleteMap({
  en: "en_GB",
  de: "de_DE",
} as const satisfies Record<
  Locale,
  `${Lowercase<Locale>}_${Uppercase<string>}`
>);
