import type { Locales } from "astro";

export const locales = [
  { path: "en", codes: ["en", "en-GB"], og: "en_GB" },
  { path: "de", codes: ["de", "de-DE"], og: "de_DE" }
] as const;

export const astroLocales = locales.map(({ path, codes }) => ({
  path,
  codes: [...codes]
})) satisfies Locales;
export const defaultLocale: LocaleCode = "en";

type ExtendedLocale = (typeof locales)[number];
type LocaleCode = ExtendedLocale["codes"][number];
export type LocalePath = ExtendedLocale["path"];
