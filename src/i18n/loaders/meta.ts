import { defaultLocale, type Locale, locales } from "../locales";
import {
  MetaDictionarySchema,
  type MetaDictionary,
  type PageId,
  type PageMeta,
} from "../schemas/meta";

export type MetaGlob = Record<string, { default: unknown }>;

// factory kept separate so tests can stub it
export function loadMetaFiles(): MetaGlob {
  return import.meta.glob("@/i18n/dictionaries/*/meta.json", { eager: true });
}

let META: Readonly<Record<Locale, MetaDictionary>> | null = null;

export async function initMeta(files: MetaGlob = loadMetaFiles()) {
  const parsed: Partial<Record<Locale, MetaDictionary>> = {};
  for (const [path, mod] of Object.entries(files)) {
    const lang = path.split("/").at(-2) as Locale | undefined;
    if (!lang || !locales.includes(lang)) continue;
    parsed[lang] = MetaDictionarySchema.parse(mod.default);
  }
  META = Object.freeze(parsed) as Readonly<Record<Locale, MetaDictionary>>;
}

export function getPageMeta(
  lang: Locale,
  page: PageId,
): PageMeta & { siteName: string } {
  if (!META) {
    throw new Error(
      "[i18n:meta] getPageMeta() called before dictionaries were loaded. Use getPageMetaAsync() or call initMeta() in setup.",
    );
  }
  const dict: MetaDictionary = META[lang] ?? META[defaultLocale];
  const fallback: MetaDictionary = META[defaultLocale];
  const m = dict[page] ?? fallback[page];
  if (!m) {
    throw new Error(
      `[i18n:meta] Page id "${page}" missing for ${lang} and default locale.`,
    );
  }
  return { ...m, siteName: dict?.site.name ?? fallback!.site.name };
}

export async function getPageMetaAsync(lang: Locale, page: PageId) {
  if (!META) await initMeta(); // lazy-init in prod/tests unless setup ran
  return getPageMeta(lang, page);
}

export function __resetMeta() {
  META = null;
}
