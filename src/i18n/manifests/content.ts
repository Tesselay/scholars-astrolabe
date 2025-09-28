import { getCollection as realGetCollection } from "astro:content";
import { locales, type Locale, isLocale } from "../locales.ts";
import { trimSlashes, collapseSlashes } from "../utils/path.ts";
import { getLangFromId } from "../utils/locale.ts";
import { encodeTagPath } from "../utils/urlBuilders.ts";

export type GetCollection = typeof realGetCollection;
export type ContentManifest = Awaited<ReturnType<typeof buildContentManifest>>;

let cachedContentManifest: Promise<ContentManifest> | undefined;

export function getContentManifest(getCollection?: GetCollection) {
  return (cachedContentManifest ??= buildContentManifest(getCollection));
}

export function __resetContentManifest() {
  cachedContentManifest = undefined;
}

export async function buildContentManifest(getCollection: GetCollection = realGetCollection) {
  const blogEntries = await getCollection("blog");
  const blogSlugsByLang = new Map<Locale, Set<string>>();
  const tagsByLang = new Map<Locale, Set<string>>();

  (locales as readonly Locale[]).forEach((l) => {
    blogSlugsByLang.set(l, new Set());
    tagsByLang.set(l, new Set());
  });

  for (const entry of blogEntries) {
    const lang =
      entry.data.language && isLocale(entry.data.language as string)
        ? (entry.data.language as Locale)
        : getLangFromId(entry.id);

    const slug = entry.id.replace(/^[^/]+\//, "");
    blogSlugsByLang.get(lang)!.add(slug);

    // Collect encoded tag slugs for this locale (preserve original case in paths)
    const tags = Array.isArray(entry.data.tags) ? entry.data.tags : [];
    const set = tagsByLang.get(lang)!;
    for (const t of tags) set.add(trimSlashes(encodeTagPath(t)));
  }

  return {
    blogSlugsByLang,
    tagsByLang,
    blogPostExists(lang: Locale, slug: string) {
      const normalized = trimSlashes(collapseSlashes(slug));
      return blogSlugsByLang.get(lang)?.has(normalized) ?? false;
    },
    tagExists(lang: Locale, tagSlug: string) {
      const normalized = trimSlashes(collapseSlashes(tagSlug));
      return tagsByLang.get(lang)?.has(normalized) ?? false;
    }
  } as const;
}
