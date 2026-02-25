import { getRelativeLocaleUrlList } from "astro:i18n";
import { getLocaleRouteFromPathStrict } from "@/utils/core/i18n/locale/path.ts";

export function getAlternateRelativeLocaleUrlList(locale: string, pathname: string): string[] {
  return getRelativeLocaleUrlList(pathname).filter(
    (loc) => getLocaleRouteFromPathStrict(loc) !== locale
  );
}
