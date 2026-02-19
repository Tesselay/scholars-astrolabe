import modelUI from "@/utils/core/i18n/dict/dictionaries/en/ui.json";
import modelMeta from "@/utils/core/i18n/dict/dictionaries/en/meta.json";
import { buildStrictSchema } from "./schemaBuilder.ts";
import { GenericDictLoader } from "./genericDictLoader.ts";
import { metaDictModules, uiDictModules } from "@/utils/adapter/vite/dicts.ts";
import { z } from "zod";

export const UiSchema = buildStrictSchema(modelUI);
export const MetaSchema = buildStrictSchema(modelMeta);

export type Ui = z.infer<typeof UiSchema>;
export type Meta = z.infer<typeof MetaSchema>;

export const uiLoader = new GenericDictLoader<Ui>("ui", UiSchema, uiDictModules);
export const metaLoader = new GenericDictLoader<Meta>("meta", MetaSchema, metaDictModules);
