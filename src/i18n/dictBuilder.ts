import modelUI from "./dictionaries/en/ui.json";
import modelMeta from "./dictionaries/en/meta.json";
import { buildStrictSchema, type StringLeaves } from "@/i18n/utils/schemaBuilder.ts";
import { GenericLoader } from "./utils/genericLoader.ts";

export const UiSchema = buildStrictSchema(modelUI);
export const MetaSchema = buildStrictSchema(modelMeta);

export type Ui = StringLeaves<typeof modelUI>;
export type Meta = StringLeaves<typeof modelMeta>;

export const uiLoader = new GenericLoader<Ui>("ui", UiSchema);
export const metaLoader = new GenericLoader<Meta>("meta", MetaSchema);
