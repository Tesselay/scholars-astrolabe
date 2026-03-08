import { z } from "zod";

import type { LocaleRoute } from "&utils/core/i18n/locale/definition.ts";
import { getLocaleRouteFromPathStrict } from "&utils/core/i18n/locale/path.ts";

type DictGlob<Type> = Record<string, Type>;
type DictModulesProvider<Type> = (dictName?: string) => DictGlob<Type>;
type Dict<Type> = Record<LocaleRoute, Type>;

export class GenericDictLoader<Type extends z.ZodType> {
  private DICT: Readonly<Dict<z.infer<Type>>> | null = null;
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

  validate(locale: LocaleRoute, data: unknown): z.infer<Type> {
    const parsed = this.dictSchema.safeParse(data);
    if (!parsed.success) {
      console.error(
        `[i18n:${this.dictName}] Invalid dictionary for ${locale}:`,
        parsed.error.format(),
      );
      throw new Error(`[i18n:${this.dictName}]Invalid dictionary for ${locale}`);
    }
    return parsed.data;
  }

  async init(): Promise<void> {
    const modules = this.loadModules();
    const dictSkeleton: Partial<Dict<z.infer<Type>>> = {};

    for (const filePath in modules) {
      const locale = getLocaleRouteFromPathStrict(filePath);
      dictSkeleton[locale] = this.validate(locale, modules[filePath]);
    }
    this.DICT = Object.freeze(dictSkeleton as Dict<z.infer<Type>>);
  }

  get(locale: LocaleRoute): z.infer<Type> {
    if (!this.DICT) {
      throw new Error(
        `[i18n:${this.dictName}] getDict() called before dictionaries were loaded. Use getDictAsync() or call initDict() in setup.`,
      );
    }
    const dict = this.DICT[locale];
    if (!dict) {
      throw new Error(`[i18n:${this.dictName}] Missing ${locale} dictionary`);
    }
    return dict;
  }

  async getAsync(locale: LocaleRoute): Promise<z.infer<Type>> {
    if (!this.DICT) await this.init();
    return this.get(locale);
  }

  __resetDICT() {
    this.DICT = null;
  }
}
