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

export function normalizeFilePath(path: string): string {
  let normalizedPath = path.replace(/(\.astro|index\.astro|\.md|\.mdx|\.ts|\.js)(\/)?$/i, "$2");
  normalizedPath = normalizePath(normalizedPath);
  return normalizedPath;
}
