import { defaultLocale, type Locale } from "./locales";

type TranslationKeys = keyof typeof enUI;
type Translations = Record<TranslationKeys, string>;

export const languages: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
} as const;

export const ogLocales: Record<Locale, string> = {
  en: "en_GB",
  de: "de_DE",
} as const;

export const defaultLang: Locale = defaultLocale;

const enUI = {
  "nav.home": "Home",
  "nav.portfolio": "Folio",
  "nav.blog": "Blog",
  "nav.contact": "Contact",
} as const;

const deUI = {
  "nav.home": "Startseite",
  "nav.portfolio": "Portfolio",
  "nav.blog": "Blog",
  "nav.contact": "Kontakt",
} as const;

export const ui: Record<Locale, Translations> = {
  en: enUI,
  de: deUI,
} as const;
