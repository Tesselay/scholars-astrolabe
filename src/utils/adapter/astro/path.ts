import { getRelativeLocaleUrlList } from "astro:i18n";
import { getLangFromUrlPath } from "@/utils/core/i18n/locale/path.ts";
import type { LocaleRoute } from "@/utils/core/i18n/locale/definition.ts";

export function getAlternateRelativeLocaleUrlList(locale: string, pathname: string): LocaleRoute[] {
  return getRelativeLocaleUrlList(pathname).filter(
    (loc) => getLangFromUrlPath(loc) !== locale
  ) as LocaleRoute[];
}
