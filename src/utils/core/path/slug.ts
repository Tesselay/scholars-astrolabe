import { normalizeFilePath } from "@/utils/core/path/normalization.ts";
import { collapseSlashes, ensureTrailingSlash } from "@/utils/core/string/normalization.ts";

export function convertLocalPathToSlug(p: string): string {
  const slug = normalizeFilePath(p)
    .replace(/^\/src\/pages/, "")
    .replace(/\/\[lang\]/, "")
    .replace(/\[(?:\.\.\.)?slug\]/, "");

  return ensureTrailingSlash(collapseSlashes(slug));
}
