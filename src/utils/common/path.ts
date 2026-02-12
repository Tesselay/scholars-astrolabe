import { localeByPath, type LocalePath, locales } from "../locales.ts";

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

export function stripLangFromUrlOrId(path: string): string {
  const str = normalizePath(path);
  const hasLeadingSlash = str.startsWith("/");
  const parts = str.split("/");
  const langIdx = hasLeadingSlash ? 1 : 0;
  const candidate = parts[langIdx] ?? undefined;

  if (candidate && localeByPath[candidate]) {
    const rest = hasLeadingSlash ? parts.slice(2).join("/") : parts.slice(1).join("/");

    if (!rest) return "/";

    let normalized = rest.replace(/\/+/g, "/");
    if (hasLeadingSlash) {
      normalized = "/" + normalized.replace(/^\/+/, "");
      if (normalized === "//") normalized = "/";
    } else {
      normalized = normalized.replace(/^\/+/, "");
    }
    return normalized;
  }

  return path;
}

export function pathsForAllLocales(): { params: { lang: LocalePath } }[] {
  return locales.map((locale) => ({ params: { lang: locale.path } }));
}

export function pathHasLocale(path: string): boolean {
  return stripLangFromUrlOrId(path) !== path;
}

export function localizePath(lang: LocalePath, path: string): string {
  let localizedPath = String(lang) + ensureLeadingSlash(path);
  localizedPath = normalizePath(localizedPath);
  return localizedPath;
}

export function neutralizePath(path: string): string {
  let neutralizedPath = stripLangFromUrlOrId(path);
  neutralizedPath = normalizePath(neutralizedPath);
  return neutralizedPath;
}

export function normalizePath(path: string): string {
  let normalizedPath = ensureLeadingSlash(path);
  normalizedPath = ensureTrailingSlash(normalizedPath);
  normalizedPath = collapseSlashes(normalizedPath);
  normalizedPath = normalizedPath.normalize();
  return normalizedPath;
}
