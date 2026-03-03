import { metaDictModules } from "@utils/adapter/vite/dicts.ts";
import { buildStrictSchema } from "@utils/core/i18n/dict/schemaBuilder.ts";
import { GenericDictLoader } from "@utils/core/i18n/dict/genericDictLoader.ts";
import modelMeta from "@content/dictionaries/en/meta.json";

const MetaSchema = buildStrictSchema(modelMeta);
export const MetaLoader = new GenericDictLoader("meta", MetaSchema, metaDictModules);
