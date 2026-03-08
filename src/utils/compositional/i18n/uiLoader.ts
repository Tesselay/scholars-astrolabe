import modelUI from "@content/dictionaries/en/ui.json";

import { uiDictModules } from "@utils/adapter/vite/dicts.ts";
import { GenericDictLoader } from "@utils/core/i18n/dict/genericDictLoader.ts";
import { buildStrictSchema } from "@utils/core/i18n/dict/schemaBuilder.ts";

const UiSchema = buildStrictSchema(modelUI);
export const UiLoader = new GenericDictLoader("ui", UiSchema, uiDictModules);
