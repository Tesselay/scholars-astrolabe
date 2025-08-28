import { ui, defaultLang } from "./ui";
import { locales, type Locale } from "./locales";

// --- Path normalization helpers ---
export function collapseSlashes(s: string): string {
  return String(s).replace(/\/+/g, "/");
}

export function trimSlashes(s: string): string {
  return String(s).replace(/^\/+|\/+$/g, "");
}

export function ensureLeadingSlash(s: string): string {
  const collapsed = collapseSlashes(String(s));
  return collapsed.startsWith("/")
    ? collapsed
    : "/" + collapsed.replace(/^\/+/, "");
}

export function ensureTrailingSlash(s: string): string {
  return s.endsWith("/") ? s : s + "/";
}

export function normalizeNeutralPath(p: string): string {
  let n = stripLangFromUrlOrId(String(p)).trim();
  n = ensureLeadingSlash(n);
  n = collapseSlashes(n)
    .replace(/index\.astro$/, "")
    .replace(/\.astro$/, "");
  n = collapseSlashes(n);
  n = ensureTrailingSlash(n);
  return collapseSlashes(n);
}

// --- Path helpers ---
export function pathsForAllLocales(): { params: { lang: Locale } }[] {
  return (locales as readonly Locale[]).map((lang) => ({ params: { lang } }));
}

export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  if ((locales as readonly string[]).includes(lang)) return lang as Locale;
  return defaultLang;
}

export function useTranslations(lang: Locale) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function pathWithLocale(lang: Locale, path: string): string {
  const normalized = ensureLeadingSlash(path);
  return collapseSlashes("/" + String(lang) + normalized);
}

export function getAllLocales(): Locale[] {
  return [...locales] as Locale[];
}

export function getAlternateLocales(url: URL): Locale[] {
  const currentLocale = getLangFromUrl(url);
  return getAllLocales().filter((lang) => lang !== currentLocale);
}

export function stripLangFromUrlOrId(id: string): string {
  const s = collapseSlashes(String(id));
  const hasLeadingSlash = s.startsWith("/");
  const parts = s.split("/");
  const langIdx = hasLeadingSlash ? 1 : 0;
  const candidate = parts[langIdx] ?? "";

  // Only strip when the first segment is a supported language key
  if (candidate && (locales as readonly string[]).includes(candidate)) {
    const rest = hasLeadingSlash
      ? parts.slice(2).join("/")
      : parts.slice(1).join("/");

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

// Builds a localized blog post path like "/en/blog/example" from a content id like "en/example"
export function buildBlogPostPath(lang: Locale, idOrSlug: string): string {
  const slug = trimSlashes(stripLangFromUrlOrId(idOrSlug));
  return pathWithLocale(lang, `/blog/${slug}`);
}

// Encodes each tag path segment for safe URLs while preserving hierarchy
export function encodeTagPath(tagPath: string): string {
  return trimSlashes(String(tagPath))
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
}

// Builds a localized tag path like "/en/tags/programming/javascript" from a tag path
export function buildTagPath(lang: Locale, tagPath: string): string {
  const encoded = encodeTagPath(tagPath);
  return pathWithLocale(lang, `/tags/${encoded}`);
}
