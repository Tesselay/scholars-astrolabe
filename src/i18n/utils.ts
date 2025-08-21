import { ui, defaultLang } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function pathWithLocale(lang: keyof typeof ui, path: string): string {
  const normalized = ("/" + path).replace(/\/+/g, "/");
  return ("/" + String(lang) + normalized).replace(/\/+/g, "/");
}

// Returns all supported locales as defined in the UI dictionary
export function getAllLocales(): (keyof typeof ui)[] {
  return Object.keys(ui) as (keyof typeof ui)[];
}

// Returns the content id without the leading language segment (e.g., "en/foo/bar" -> "foo/bar" or "/en/foo" -> "/foo")
export function stripLangFromUrlOrId(id: string): string {
  const s = String(id);
  const hasLeadingSlash = s.startsWith("/");
  const parts = s.split("/");
  const langIdx = hasLeadingSlash ? 1 : 0;
  const candidate = parts[langIdx] ?? "";

  // Only strip when the first segment is a supported language key
  if (candidate && candidate in ui) {
    const rest = hasLeadingSlash
      ? parts.slice(2).join("/")
      : parts.slice(1).join("/");

    // Normalize duplicate slashes and leading slash presence
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
export function buildBlogPostPath(
  lang: keyof typeof ui,
  idOrSlug: string,
): string {
  const slug = stripLangFromUrlOrId(idOrSlug).replace(/^\/+|\/+$/g, "");
  return pathWithLocale(lang, `/blog/${slug}`);
}

// Encodes each tag path segment for safe URLs while preserving hierarchy
export function encodeTagPath(tagPath: string): string {
  return String(tagPath)
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
}

// Builds a localized tag path like "/en/tags/programming/javascript" from a tag path
export function buildTagPath(lang: keyof typeof ui, tagPath: string): string {
  const encoded = encodeTagPath(tagPath);
  return pathWithLocale(lang, `/tags/${encoded}`);
}
