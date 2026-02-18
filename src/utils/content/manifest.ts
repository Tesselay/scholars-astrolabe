import { getCollection as realGetCollection } from "astro:content";
import { locales, type LocalePath } from "../core/i18n/locale/locales.ts";
import { encodeTagPath } from "@/utils/core/routing/urlBuilders.ts";
import { collapseSlashes, trimSlashes } from "@/utils/core/string/normalization.ts";
import { getLangFromId, localeByPath } from "@/utils/core/i18n/locale/path.ts";

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
  const blogSlugsByLang = new Map<LocalePath, Set<string>>();
  const tagsByLang = new Map<LocalePath, Set<string>>();

  locales.forEach((locale) => {
    blogSlugsByLang.set(locale.path, new Set());
    tagsByLang.set(locale.path, new Set());
  });

  for (const entry of blogEntries) {
    const lang =
      entry.data.language && localeByPath[entry.data.language]
        ? (entry.data.language as LocalePath)
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
    blogPostExists(lang: LocalePath, slug: string) {
      const normalized = trimSlashes(collapseSlashes(slug));
      return blogSlugsByLang.get(lang)?.has(normalized) ?? false;
    },
    tagExists(lang: LocalePath, tagSlug: string) {
      const normalized = trimSlashes(collapseSlashes(tagSlug));
      return tagsByLang.get(lang)?.has(normalized) ?? false;
    }
  } as const;
}
