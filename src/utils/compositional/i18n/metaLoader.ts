import { buildStrictSchema } from "../../core/i18n/dict/schemaBuilder.ts";
import { GenericDictLoader } from "../../core/i18n/dict/genericDictLoader.ts";
import { metaDictModules } from "@/utils/adapter/vite/dicts.ts";
import modelMeta from "@/utils/core/i18n/dict/dictionaries/en/meta.json";

export const MetaSchema = buildStrictSchema(modelMeta);
export const metaLoader = new GenericDictLoader("meta", MetaSchema, metaDictModules);
