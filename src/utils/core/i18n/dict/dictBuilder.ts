import { buildStrictSchema } from "./schemaBuilder.ts";
import { GenericDictLoader } from "./genericDictLoader.ts";
import { metaDictModules, uiDictModules } from "@/utils/adapter/vite/dicts.ts";
import modelUI from "@/utils/core/i18n/dict/dictionaries/en/ui.json";
import modelMeta from "@/utils/core/i18n/dict/dictionaries/en/meta.json";

export const UiSchema = buildStrictSchema(modelUI);
export const MetaSchema = buildStrictSchema(modelMeta);

export const uiLoader = new GenericDictLoader("ui", UiSchema, uiDictModules);
export const metaLoader = new GenericDictLoader("meta", MetaSchema, metaDictModules);
