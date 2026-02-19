import { z } from "zod";
import { type LocalePath } from "@/utils/core/i18n/locale/locales.ts";
import { localeByPath } from "@/utils/core/i18n/locale/path.ts";

export type DictGlob<Type> = Record<string, Type>;
export type DictModulesProvider<Type> = (dictName?: string) => DictGlob<Type>;

export class GenericDictLoader<Type extends z.Schema> {
  private DICT: Readonly<Record<LocalePath, z.infer<Type>>> | null = null;
  private dictModules: DictGlob<z.infer<Type>> | null = null;
  private readonly dictModulesProvider: DictModulesProvider<z.infer<Type>>;
  private readonly dictSchema: Type;
  private readonly dictName: string;

  constructor(dictName: string, schema: Type, dictModulesProvider: DictModulesProvider<unknown>) {
    this.dictName = dictName;
    this.dictSchema = schema;
    this.dictModulesProvider = dictModulesProvider;
  }

  loadModules(): DictGlob<z.infer<Type>> {
    if (!this.dictModules) this.dictModules = this.dictModulesProvider(this.dictName);
    return this.dictModules;
  }

  validate(locale: LocalePath, data: unknown): z.infer<Type> {
    const parsed = this.dictSchema.safeParse(data);
    if (!parsed.success) {
      console.error(`[i18n:DICT] Invalid dictionary for ${locale}:`, parsed.error.format());
      throw new Error(`Invalid dictionary for ${locale}`);
    }
    return parsed.data;
  }

  async init(): Promise<void> {
    const files = this.loadModules();
    const acc: Partial<Record<LocalePath, z.infer<Type>>> = {};
    for (const [path, mod] of Object.entries(files)) {
      const lang = path.split("/").at(-2) as LocalePath | undefined;
      if (!lang || !localeByPath[lang]) continue;
      acc[lang] = this.validate(lang, mod);
    }
    this.DICT = Object.freeze(acc as Record<LocalePath, z.infer<Type>>);
  }

  get(locale: LocalePath): z.infer<Type> {
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

  async getAsync(locale: LocalePath): Promise<z.infer<Type>> {
    if (!this.DICT) await this.init();
    return this.get(locale);
  }

  __resetDICT() {
    this.DICT = null;
  }
}
