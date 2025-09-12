import { defaultLocale, type Locale, locales } from "../locales.ts";
import {
  type MetaDictionary,
  MetaDictionarySchema,
  type PageId,
  type PageMeta,
} from "../schemas/meta.ts";

const files = import.meta.glob("@/i18n/dictionaries/*/meta.json", {
  eager: true,
});

console.log("[i18n:meta] Loaded", files);

const parsed: Partial<Record<Locale, MetaDictionary>> = {};

for (const [path, mod] of Object.entries(files) as Array<
  [string, { default: unknown }]
>) {
  const lang = path.split("/").at(-2) as Locale | undefined;
  if (!lang || !locales.includes(lang)) continue;

  try {
    parsed[lang] = MetaDictionarySchema.parse(mod.default);
  } catch (err) {
    const hint = err instanceof Error ? err.message : String(err);
    throw new Error(
      `[i18n:meta] Invalid dictionary for "${lang}" (${path}): ${hint}`,
    );
  }
}

const META = Object.freeze(parsed) as Readonly<Record<Locale, MetaDictionary>>;

if (!META[defaultLocale]) {
  throw new Error(
    `[i18n:meta] Default locale "${defaultLocale}" dictionary failed to load or is missing.`,
  );
}

export function getPageMeta(
  lang: Locale,
  page: PageId,
): PageMeta & { siteName: string } {
  const dict = META[lang] ?? META[defaultLocale];
  const fallback = META[defaultLocale];

  if (!dict && !fallback) {
    throw new Error("[i18n:meta] No valid dictionaries were loaded.");
  }

  const m = dict?.[page] ?? fallback?.[page];
  if (!m) {
    throw new Error(
      `[i18n:meta] Page id "${page}" missing for "${lang}" and default locale "${defaultLocale}".`,
    );
  }
  return { ...m, siteName: dict?.site.name ?? fallback!.site.name };
}
