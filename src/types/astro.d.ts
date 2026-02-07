import type { Locale } from "../utils/locales.ts";

declare module "astro" {
  interface AstroGlobal {
    currentLocale: Locale;
  }
}
