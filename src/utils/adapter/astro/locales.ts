import type { Locales } from "astro";
import { locales } from "../../core/i18n/locale/definition.ts";

export const astroLocales = locales.map(({ path, codes }) => ({
  path,
  codes: [...codes]
})) satisfies Locales;
