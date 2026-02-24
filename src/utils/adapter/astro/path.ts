import { getRelativeLocaleUrlList } from "astro:i18n";
import { getLangFromUrlPath } from "@/utils/core/i18n/locale/path.ts";
import type { LocalePath } from "@/utils/core/i18n/locale/locales.ts";

export function getAlternateRelativeLocaleUrlList(locale: string, pathname: string): LocalePath[] {
  return getRelativeLocaleUrlList(pathname).filter(
    (loc) => getLangFromUrlPath(loc) !== locale
  ) as LocalePath[];
}
