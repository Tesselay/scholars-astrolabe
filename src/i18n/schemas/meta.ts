import { z } from "zod";

export const pageIds = [
  "home",
  "folio",
  "blog:index",
  "blog:page",
  "contact",
  "tags:index",
  "tags:page",
] as const;
export type PageId = (typeof pageIds)[number];
export type PageMeta = {
  title: string;
  description?: string;
};
export type MetaDictionary = Record<PageId, PageMeta> & {
  site: {
    name: string;
  };
};
const PageMetaSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});
const PagesSchema = z
  .object(
    Object.fromEntries(pageIds.map((k) => [k, PageMetaSchema])) as Record<
      PageId,
      typeof PageMetaSchema
    >,
  )
  .strict();
export const MetaDictionarySchema = PagesSchema.extend({
  site: z.object({ name: z.string() }).strict(),
}).strict();
