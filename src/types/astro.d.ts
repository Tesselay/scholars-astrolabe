import type { LocalePath } from "@/utils/i18n/locales.ts";

declare module "astro" {
  interface AstroGlobal {
    currentLocale: LocalePath;
  }
}
