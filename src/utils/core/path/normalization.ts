import {
  collapseSlashes,
  ensureLeadingSlash,
  ensureTrailingSlash
} from "@/utils/core/string/normalization.ts";

export function normalizePath(path: string): string {
  let normalizedPath = ensureLeadingSlash(path);
  normalizedPath = ensureTrailingSlash(normalizedPath);
  normalizedPath = collapseSlashes(normalizedPath);
  normalizedPath = normalizedPath.normalize();

  return normalizedPath;
}
