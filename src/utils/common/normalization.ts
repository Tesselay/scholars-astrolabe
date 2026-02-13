export function collapseSlashes(str: string): string {
  return String(str).replace(/\/+/g, "/");
}

export function trimSlashes(str: string): string {
  return String(str).replace(/^\/+|\/+$/g, "");
}

export function ensureLeadingSlash(str: string): string {
  const collapsed = collapseSlashes(String(str));
  return collapsed.startsWith("/") ? collapsed : "/" + collapsed.replace(/^\/+/, "");
}

export function ensureTrailingSlash(str: string): string {
  return str.endsWith("/") ? str : str + "/";
}

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

export function convertLocalPathToSlug(p: string): string {
  const slug = normalizeFilePath(p)
    .replace(/^\/src\/pages/, "")
    .replace(/\/\[lang\]/, "")
    .replace(/\[(?:\.\.\.)?slug\]/, "");

  return ensureTrailingSlash(collapseSlashes(slug));
}
