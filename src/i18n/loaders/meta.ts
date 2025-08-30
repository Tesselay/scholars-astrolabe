import { defaultLocale, type Locale } from "../locales.ts";
import {
  type MetaDictionary,
  MetaDictionarySchema,
  type PageId,
  type PageMeta,
} from "../schemas/meta.ts";
import deJson from "@/i18n/dictionaries/de/meta.json";
import enJson from "@/i18n/dictionaries/en/meta.json";

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
