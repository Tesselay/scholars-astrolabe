import { trailingSlash } from "astro:config/client";
import { getRelativeLocaleUrlList } from "astro:i18n";

import { getLocaleRouteFromPathStrict } from "&utils/core/i18n/locale/path.ts";
import { normalizePath } from "&utils/core/path/normalization.ts";

function getAlternateRelativeLocaleUrlList(locale: string, pathname: string): string[] {
  return getRelativeLocaleUrlList(pathname)
    .filter((loc) => getLocaleRouteFromPathStrict(loc) !== locale);
}

function normalizeAstroPath(path: string): string {
  return normalizePath(
    path,
    trailingSlash === "always" ? "always" : trailingSlash === "never" ? "never" : "preserve",
  );
}

export { getAlternateRelativeLocaleUrlList, normalizeAstroPath };
