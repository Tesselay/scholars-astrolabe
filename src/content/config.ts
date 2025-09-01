import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { BlogPostSchema } from "./schema";

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blog" }),
  schema: BlogPostSchema,
});

export const collections = { blog: postsCollection };
