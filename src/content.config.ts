import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { BlogPostSchema } from "./content/schema.ts";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";

const blogBaseUrl = new URL(
  "./src/content/blog/",
  new URL(`file://${process.cwd()}/`),
);
const blogBasePath = fileURLToPath(blogBaseUrl);

console.log(
  "[content.config] blogBaseUrl=",
  blogBaseUrl.href,
  "exists?",
  existsSync(blogBasePath),
);

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: blogBaseUrl }),
  schema: BlogPostSchema,
});

export const collections = { blog: postsCollection };
