import { type Locale } from "../locales.ts";
import {
  pathWithLocale,
  stripLangFromUrlOrId,
  trimSlashes,
  collapseSlashes,
} from "./path.ts";

// Builds a localized blog post path like "/en/blog/example" from a content id like "en/example"
export function buildBlogPostPath(lang: Locale, idOrSlug: string): string {
  const slug = trimSlashes(stripLangFromUrlOrId(idOrSlug));
  return pathWithLocale(lang, `/blog/${slug}`);
}

// Encodes each tag path segment for safe URLs while preserving hierarchy
export function encodeTagPath(tagPath: string): string {
  const cleaned = trimSlashes(collapseSlashes("/" + String(tagPath)));
  return cleaned
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
}

// Builds a localized tag path like "/en/tags/programming/javascript" from a tag path
export function buildTagPath(lang: Locale, tagPath: string): string {
  const encoded = encodeTagPath(tagPath);
  return pathWithLocale(lang, `/tags/${encoded}`);
}
