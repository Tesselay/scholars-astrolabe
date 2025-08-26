import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { ui } from "../i18n/ui";

const langs = z.enum(Object.keys(ui) as [keyof typeof ui, ...string[]]);

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    summary: z.string(),
    sources: z.array(z.string()),
    language: langs.optional(),
    "date-created": z.date(),
    "date-modified": z.date(),
  }),
});

export const collections = { blog: postsCollection };
