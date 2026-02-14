import { type LocalePath } from "@/utils/i18n/locales.ts";
import { z } from "zod";
import { localeByPath } from "@/utils/i18n/path.ts";

export type DictGlob = Record<string, { default: unknown }>;
export type DictModuleProvider = (dictName: string) => DictGlob;

export class GenericDictLoader<Type> {
  private DICT: Readonly<Record<LocalePath, Type>> | null = null;
  private dictModules: DictGlob | null = null;
  private readonly dictModulesProvider: DictModuleProvider;
  private readonly dictSchema: z.ZodType<Type>;
  private readonly dictName: string;

  constructor(dictName: string, schema: z.ZodType<Type>, dictModulesProvider: DictModuleProvider) {
    this.dictName = dictName;
    this.dictSchema = schema;
    this.dictModulesProvider = dictModulesProvider;
  }

  loadModules(): DictGlob {
    if (!this.dictModules) this.dictModules = this.dictModulesProvider(this.dictName);
    return this.dictModules;
  }

  validate(locale: LocalePath, data: unknown): Type {
    const parsed = this.dictSchema.safeParse(data);
    if (!parsed.success) {
      console.error(`[i18n:DICT] Invalid dictionary for ${locale}:`, parsed.error.format());
      throw new Error(`Invalid dictionary for ${locale}`);
    }
    return parsed.data;
  }

  async init(): Promise<void> {
    const files: DictGlob = this.loadModules();
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
