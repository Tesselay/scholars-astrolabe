const locales = [{ path: "en", codes: ["en", "en-GB"], og: "en_GB" }, { path: "de", codes: ["de", "de-DE"], og: "de_DE" }] as const;
const defaultLocale: LocaleLanguageCode = "en";
const localesMap = new Map<LocaleRoute, ExtendedLocale>(locales.map((locale) => [locale.path, locale]));

type ExtendedLocale = (typeof locales)[number];
type LocaleLanguageCode = ExtendedLocale["codes"][number];
type LocaleRoute = ExtendedLocale["path"];

export { type ExtendedLocale, type LocaleRoute, defaultLocale, locales, localesMap };
