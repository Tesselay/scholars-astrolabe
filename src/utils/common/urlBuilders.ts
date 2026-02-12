import type { CollectionEntry } from "astro:content";
import { localeByPath, type LocalePath, locales } from "../locales.ts";
import { localizePath, stripLangFromUrlOrId, trimSlashes, collapseSlashes } from "./path.ts";
import { filterEntriesByLang } from "./content.ts";

// Builds a localized blog post path like "/en/blog/example" from a content id like "en/example"
export function buildBlogPostPath(lang: LocalePath, idOrSlug: string): string {
  const slug = trimSlashes(stripLangFromUrlOrId(idOrSlug));
  return localizePath(lang, `/blog/${slug}`);
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
export function buildTagPath(lang: LocalePath, tagPath: string): string {
  const encoded = encodeTagPath(tagPath);
  return localizePath(lang, `/tags/${encoded}`);
}

export interface PathResult {
  params: { lang: LocalePath; slug: string };
  props: { posts: CollectionEntry<"blog">[]; tag: string };
}

export function buildTagPaths(allPosts: CollectionEntry<"blog">[]): PathResult[] {
  const tagsByLang = new Map<LocalePath, Set<string>>();
  locales.forEach((locale) => tagsByLang.set(locale.path, new Set()));

  for (const post of allPosts) {
    const [candidate] = post.id.split("/");
    if (!localeByPath[candidate]) continue;
    const lang = candidate as LocalePath;

    const tags = Array.isArray(post.data.tags) ? post.data.tags : [];
    for (const t of tags) tagsByLang.get(lang)!.add(t);
  }

  const paths: PathResult[] = [];

  for (const lang of locales) {
    const langPosts = filterEntriesByLang(allPosts, lang.path);
    const tags = tagsByLang.get(lang.path);
    if (!tags) continue;

    for (const tag of tags) {
      const filteredPosts = langPosts.filter(
        (p) => Array.isArray(p.data.tags) && p.data.tags.includes(tag)
      );
      if (filteredPosts.length === 0) continue;

      paths.push({
        params: { lang: lang.path, slug: encodeTagPath(tag) },
        props: { posts: filteredPosts, tag }
      });
    }
  }

  return paths;
}
