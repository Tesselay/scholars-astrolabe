import type { LocalePath } from "@/utils/core/i18n/locale/locales.ts";

declare module "astro" {
  interface AstroGlobal {
    currentLocale: LocalePath;
  }
}
