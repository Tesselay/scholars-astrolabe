import { type Locale, locales } from "../locales";
import { MetaSchema, type Meta } from "../schemas/meta";
import { type DictGlob, loadDictFiles } from "../utils/internals.ts";

let META: Readonly<Record<Locale, Meta>> | null = null;

function validate(locale: Locale, data: unknown): Meta {
  const parsed = MetaSchema.safeParse(data);
  if (!parsed.success) {
    console.error(
      `[i18n:UI] Invalid META dictionary for ${locale}:`,
      parsed.error.format(),
    );
    throw new Error(`Invalid META dictionary for ${locale}`);
  }
  return parsed.data;
}

export async function initMeta(
  files: DictGlob = loadDictFiles("meta"),
): Promise<void> {
  const acc: Partial<Record<Locale, Meta>> = {};
  for (const [path, mod] of Object.entries(files)) {
    const lang = path.split("/").at(-2) as Locale | undefined;
    if (!lang || !locales.includes(lang)) continue;
    acc[lang] = validate(lang, mod.default);
  }
  META = Object.freeze(acc) as Readonly<Record<Locale, Meta>>;
}

export function getMeta(locale: Locale): Meta {
  if (!META) {
    throw new Error(
      "[i18n:meta] getMeta() called before dictionaries were loaded. Use getMetaAsync() or call initMeta() in setup.",
    );
  }
  return META[locale];
}

export async function getMetaAsync(locale: Locale) {
  if (!META) await initMeta();
  return getMeta(locale);
}

export function __resetMeta() {
  META = null;
}
