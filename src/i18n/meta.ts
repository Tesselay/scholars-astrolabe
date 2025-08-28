import { defaultLocale, type Locale } from "./locales";
import enJson from "./dictionaries/en/meta.json";
import deJson from "./dictionaries/de/meta.json";
import { z } from "zod";

export const pageIds = ["home", "folio", "blog", "contact", "tags"] as const;
export type PageId = (typeof pageIds)[number];

export type PageMeta = {
  title: string;
  description?: string;
};

type MetaDictionary = Record<PageId, PageMeta> & {
  site: {
    name: string;
  };
};

const PageMetaSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

const PagesSchema = z
  .object(
    Object.fromEntries(pageIds.map((k) => [k, PageMetaSchema])) as Record<
      PageId,
      typeof PageMetaSchema
    >,
  )
  .strict();

const MetaDictionarySchema = PagesSchema.extend({
  site: z.object({ name: z.string() }).strict(),
}).strict();

const en: MetaDictionary = MetaDictionarySchema.parse(enJson);
const de: MetaDictionary = MetaDictionarySchema.parse(deJson);

const META: Record<Locale, MetaDictionary> = { en, de } as const;

export function getPageMeta(
  lang: Locale,
  page: PageId,
): PageMeta & { siteName: string } {
  const dict = META[lang] ?? META[defaultLocale];
  const fallback = META[defaultLocale];
  const m = dict[page] ?? fallback[page];
  return { ...m, siteName: dict.site.name ?? fallback.site.name };
}
