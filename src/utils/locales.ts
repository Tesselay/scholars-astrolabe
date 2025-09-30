export type Locale = (typeof locales)[number];

export const locales = ["en", "de"] as const;
export const defaultLocale: Locale = "en";

export function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}
