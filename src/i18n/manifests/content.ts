import { getCollection } from "astro:content";
import { locales, type Locale, isLocale } from "../locales.ts";
import { trimSlashes, collapseSlashes } from "../utils/path.ts";
import { getLangFromId } from "../utils/locale.ts";

export type ContentManifest = Awaited<ReturnType<typeof buildContentManifest>>;
let cachedContentManifest: Promise<ContentManifest> | undefined;
export function getContentManifest(): Promise<ContentManifest> {
  return (cachedContentManifest ??= buildContentManifest());
}

export async function buildContentManifest() {
  const blogEntries = await getCollection("blog");

  const blogSlugsByLang = new Map<Locale, Set<string>>();
  (locales as readonly Locale[]).forEach((l) =>
    blogSlugsByLang.set(l, new Set()),
  );

  for (const entry of blogEntries) {
    const lang =
      entry.data.language && isLocale(entry.data.language as string)
        ? (entry.data.language as Locale)
        : getLangFromId(entry.id);

    const slug = entry.id.replace(/^[^/]+\//, "");
    blogSlugsByLang.get(lang)!.add(slug);
  }

  return {
    blogSlugsByLang,
    blogPostExists(lang: Locale, slug: string) {
      const normalized = trimSlashes(collapseSlashes(slug));
      return blogSlugsByLang.get(lang)?.has(normalized) ?? false;
    },
  } as const;
}
