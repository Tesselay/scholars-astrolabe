import { getCollection } from "astro:content";
import { trimSlashes } from "./utils";
import { locales, defaultLocale, type Locale } from "./locales";
export type Lang = Locale;

function deriveLangFromPath(s: string): Lang {
  const first = s.split("/")[0];
  return first && (locales as readonly string[]).includes(first)
    ? (first as Lang)
    : defaultLocale;
}

export async function buildContentManifest() {
  const blogEntries = await getCollection("blog");

  const blogSlugsByLang = new Map<Lang, Set<string>>();
  (locales as readonly Lang[]).forEach((l) =>
    blogSlugsByLang.set(l, new Set()),
  );

  for (const entry of blogEntries) {
    const lang =
      entry.data.language &&
      (locales as readonly string[]).includes(entry.data.language as string)
        ? (entry.data.language as Lang)
        : deriveLangFromPath(entry.id);

    const slug = entry.id.replace(/^[^/]+\//, "");
    blogSlugsByLang.get(lang)!.add(slug);
  }

  return {
    blogSlugsByLang,
    blogPostExists(lang: Lang, slug: string) {
      const normalized = trimSlashes(slug);
      return blogSlugsByLang.get(lang)?.has(normalized) ?? false;
    },
  } as const;
}
