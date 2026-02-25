import { normalizePath } from "@/utils/core/path/normalization.ts";
import { findLocaleSegment } from "@/utils/core/i18n/locale/path.ts";

export function neutralizeFsPath(path: string): string {
  const locale = findLocaleSegment(path);

  if (locale) {
    const segments = path.split("/").filter(Boolean);
    const localeIndex = segments.indexOf(locale);
    if (segments[localeIndex] === locale) {
      segments.splice(localeIndex, 1);
    }
    const neutralizedPath = segments.join("/");

    return normalizePath(neutralizedPath);
  }

  return path;
}
