import type { CollectionEntry } from "astro:content";
import { isLocale, locales, type Locale } from "../locales.ts";
import {
  pathWithLocale,
  stripLangFromUrlOrId,
  trimSlashes,
  collapseSlashes,
} from "./path.ts";
import { filterEntriesByLang } from "./content.ts";

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

export interface PathResult {
  params: { lang: Locale; slug: string };
  props: { posts: CollectionEntry<"blog">[]; tag: string };
}

export function buildTagPaths(
  allPosts: CollectionEntry<"blog">[],
): PathResult[] {
  const tagsByLang = new Map<Locale, Set<string>>();
  (locales as readonly Locale[]).forEach((l) => tagsByLang.set(l, new Set()));

  for (const post of allPosts) {
    const [candidate] = post.id.split("/");
    if (!isLocale(candidate)) continue;
    const lang = candidate as Locale;

    const tags = Array.isArray(post.data.tags) ? post.data.tags : [];
    for (const t of tags) tagsByLang.get(lang)!.add(t);
  }

  const paths: PathResult[] = [];

  for (const lang of locales as readonly Locale[]) {
    const langPosts = filterEntriesByLang(allPosts, lang);
    const tags = tagsByLang.get(lang);
    if (!tags) continue;

    for (const tag of tags) {
      const filteredPosts = langPosts.filter(
        (p) => Array.isArray(p.data.tags) && p.data.tags.includes(tag),
      );
      if (filteredPosts.length === 0) continue;

      paths.push({
        params: { lang, slug: encodeTagPath(tag) },
        props: { posts: filteredPosts, tag },
      });
    }
  }

  return paths;
}
