export const locales = [
  { path: "en", codes: ["en", "en-GB"], og: "en_GB" },
  { path: "de", codes: ["de", "de-DE"], og: "de_DE" }
] as const;
export const defaultLocale: LocaleCode = "en";
export const localesMap = new Map<LocalePath, ExtendedLocale>(
  locales.map((locale) => [locale.path, locale])
);

export type ExtendedLocale = (typeof locales)[number];
type LocaleCode = ExtendedLocale["codes"][number];
export type LocalePath = ExtendedLocale["path"];
