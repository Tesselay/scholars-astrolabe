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

// Returns the content id without the leading language segment (e.g., "en/foo/bar" -> "foo/bar")
export function stripLangFromId(id: string): string {
  const parts = String(id).split("/");
  return parts.length > 1 ? parts.slice(1).join("/") : id;
}

// Builds a localized blog post path like "/en/blog/example" from a content id like "en/example"
export function buildBlogPostPath(
  lang: keyof typeof ui,
  idOrSlug: string,
): string {
  const slug = stripLangFromId(idOrSlug).replace(/^\/+|\/+$/g, "");
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
