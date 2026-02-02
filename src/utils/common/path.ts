import { type Locale, locales } from "../locales.ts";

export function collapseSlashes(s: string): string {
  return String(s).replace(/\/+/g, "/");
}

export function trimSlashes(s: string): string {
  return String(s).replace(/^\/+|\/+$/g, "");
}

export function ensureLeadingSlash(s: string): string {
  const collapsed = collapseSlashes(String(s));
  return collapsed.startsWith("/") ? collapsed : "/" + collapsed.replace(/^\/+/, "");
}

export function ensureTrailingSlash(s: string): string {
  return s.endsWith("/") ? s : s + "/";
}

export function stripLangFromUrlOrId(id: string): string {
  const s = collapseSlashes(String(id));
  const hasLeadingSlash = s.startsWith("/");
  const parts = s.split("/");
  const langIdx = hasLeadingSlash ? 1 : 0;
  const candidate = parts[langIdx] ?? "";

  // Only strip when the first segment is a supported language key
  if (candidate && (locales as readonly string[]).includes(candidate)) {
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

  return id;
}

export function pathsForAllLocales(): { params: { lang: Locale } }[] {
  return (locales as readonly Locale[]).map((lang) => ({ params: { lang } }));
}

export function localizePath(lang: Locale, path: string): string {
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
