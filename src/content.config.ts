import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { BlogPostSchema } from "./content/schema.ts";

const postsCollection = defineCollection({
  loader: glob({ pattern: "src/content/blog/**/[^_]*.md" }),
  schema: BlogPostSchema,
});

export const collections = { blog: postsCollection };
