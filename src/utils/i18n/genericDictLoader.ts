import { type LocalePath } from "@/utils/i18n/locales.ts";
import { z } from "zod";
import { localeByPath } from "@/utils";

export type DictGlob = Record<string, { default: unknown }>;

export class GenericDictLoader<Type> {
  private DICT: Readonly<Record<LocalePath, Type>> | null = null;
  private readonly schema: z.ZodType<Type>;
  private readonly dictName: string;
  private readonly dictModules: DictGlob = import.meta.glob("@/utils/i18n/dictionaries/*/*.json", {
    eager: true
  });

  constructor(dictName: string, schema: z.ZodType<Type>, dictModules?: DictGlob) {
    this.dictName = dictName;
    this.schema = schema;
    this.dictModules = dictModules ?? this.dictModules;
  }

  loadDictFiles(): DictGlob {
    const wanted = this.dictName.endsWith(".json") ? this.dictName : `${this.dictName}.json`;
    const out: DictGlob = {};
    for (const path in this.dictModules) {
      if (path.endsWith(`/${wanted}`)) {
        out[path] = this.dictModules[path];
      }
    }
    return out;
  }

  validate(locale: LocalePath, data: unknown): Type {
    const parsed = this.schema.safeParse(data);
    if (!parsed.success) {
      console.error(`[i18n:DICT] Invalid dictionary for ${locale}:`, parsed.error.format());
      throw new Error(`Invalid dictionary for ${locale}`);
    }
    return parsed.data;
  }

  async init(): Promise<void> {
    const files: DictGlob = this.loadDictFiles();
    const acc: Partial<Record<LocalePath, Type>> = {};
    for (const [path, mod] of Object.entries(files)) {
      const lang = path.split("/").at(-2) as LocalePath | undefined;
      if (!lang || !localeByPath[lang]) continue;
      acc[lang] = this.validate(lang, mod.default);
    }
    this.DICT = Object.freeze(acc as Record<LocalePath, Type>);
  }

  get(locale: LocalePath): Type {
    if (!this.DICT) {
      throw new Error(
        "[i18n:DICT] getDict() called before dictionaries were loaded. Use getDictAsync() or call initDict() in setup."
      );
    }
    const dict = this.DICT[locale];
    if (!dict) {
      throw new Error(`[i18n:${this.dictName}] Missing ${locale} dictionary`);
    }
    return dict;
  }

  async getAsync(locale: LocalePath): Promise<Type> {
    if (!this.DICT) await this.init();
    return this.get(locale);
  }

  __resetDICT() {
    this.DICT = null;
  }
}
