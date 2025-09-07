import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { BlogPostSchema } from "./schema";

const blogBase = new URL("./blog", import.meta.url);

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: blogBase }),
  schema: BlogPostSchema,
});

export const collections = { blog: postsCollection };
