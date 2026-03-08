import {
  collapseSlashes,
  ensureLeadingSlash,
  ensureTrailingSlash,
} from "&utils/core/string/normalization.ts";

export type TrailingSlashPolicy = "always" | "never" | "preserve";

export function normalizePath(path: string, trailingSlash: TrailingSlashPolicy): string {
  let normalizedPath = ensureLeadingSlash(path);
  normalizedPath = collapseSlashes(normalizedPath);

  if (trailingSlash === "always") {
    normalizedPath = ensureTrailingSlash(normalizedPath);
  }
  else if (trailingSlash === "never" && normalizedPath.endsWith("/")) {
    normalizedPath = normalizedPath.slice(0, -1);
  }

  normalizedPath = normalizedPath.normalize();

  return normalizedPath;
}
