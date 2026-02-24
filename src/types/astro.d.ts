import type { LocaleRoute } from "@/utils/core/i18n/locale/definition.ts";

declare module "astro" {
  interface AstroGlobal {
    currentLocale: LocaleRoute;
  }
}
