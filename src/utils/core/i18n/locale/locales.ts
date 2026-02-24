export const locales = [
  { path: "en", codes: ["en", "en-GB"], og: "en_GB" },
  { path: "de", codes: ["de", "de-DE"], og: "de_DE" }
] as const;
export const defaultLocale: LocaleLanguageCode = "en";
export const localesMap = new Map<LocaleRoute, ExtendedLocale>(
  locales.map((locale) => [locale.path, locale])
);

export type ExtendedLocale = (typeof locales)[number];
type LocaleLanguageCode = ExtendedLocale["codes"][number];
export type LocaleRoute = ExtendedLocale["path"];
