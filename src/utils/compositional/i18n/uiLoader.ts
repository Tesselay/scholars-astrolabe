import { GenericDictLoader } from "@/utils/core/i18n/dict/genericDictLoader.ts";
import { uiDictModules } from "@/utils/adapter/vite/dicts.ts";
import { buildStrictSchema } from "@/utils/core/i18n/dict/schemaBuilder.ts";
import modelUI from "@/utils/core/i18n/dict/dictionaries/en/ui.json";

export const UiSchema = buildStrictSchema(modelUI);
export const uiLoader = new GenericDictLoader("ui", UiSchema, uiDictModules);
