import type { LocalePath } from "@/utils/locales.ts";

declare module "astro" {
  interface AstroGlobal {
    currentLocale: LocalePath;
  }
}
