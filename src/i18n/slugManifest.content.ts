import { getCollection } from "astro:content";
import { ui, defaultLang } from "./ui";
import { trimSlashes } from "./utils";
export type Lang = keyof typeof ui;

function deriveLangFromPath(s: string): Lang {
  const first = s.split("/")[0];
  return first && first in ui ? (first as Lang) : defaultLang;
}

export async function buildContentManifest() {
  const blogEntries = await getCollection("blog");

  const blogSlugsByLang = new Map<Lang, Set<string>>();
  (Object.keys(ui) as Lang[]).forEach((l) => blogSlugsByLang.set(l, new Set()));

  for (const entry of blogEntries) {
    const lang =
      entry.data.language && entry.data.language in ui
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
