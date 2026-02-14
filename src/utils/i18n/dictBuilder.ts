import modelUI from "@/utils/i18n/dictionaries/en/ui.json";
import modelMeta from "@/utils/i18n/dictionaries/en/meta.json";
import { buildStrictSchema, type StringLeaves } from "./schemaBuilder.ts";
import { GenericDictLoader } from "./genericDictLoader.ts";

export const UiSchema = buildStrictSchema(modelUI);
export const MetaSchema = buildStrictSchema(modelMeta);

export type Ui = StringLeaves<typeof modelUI>;
export type Meta = StringLeaves<typeof modelMeta>;

export const uiLoader = new GenericDictLoader<Ui>("ui", UiSchema, () =>
  import.meta.glob(`@/utils/i18n/dictionaries/*/ui.json`, { eager: true })
);
export const metaLoader = new GenericDictLoader<Meta>("meta", MetaSchema, () =>
  import.meta.glob(`@/utils/i18n/dictionaries/*/meta.json`, { eager: true })
);
