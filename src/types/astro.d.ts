import type { LocaleRoute } from "@/utils/core/i18n/locale/locales.ts";

declare module "astro" {
  interface AstroGlobal {
    currentLocale: LocaleRoute;
  }
}
