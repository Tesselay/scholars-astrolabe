import { findLocaleSegment } from "@/utils/core/i18n/locale/path.ts";
import { normalizePath } from "@/utils/core/path/normalization.ts";

export function neutralizeFsPath(path: string): string {
  const locale = findLocaleSegment(path);

  if (locale) {
    const segments = path.split("/").filter(Boolean);
    const localeIndex = segments.indexOf(locale);
    if (segments[localeIndex] === locale) {
      segments.splice(localeIndex, 1);
    }
    const neutralizedPath = segments.join("/");

    return normalizePath(neutralizedPath, "preserve");
  }

  return path;
}
