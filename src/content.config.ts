import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { BlogPostSchema } from "./content/schema.ts";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import fs from "node:fs";

const blogBase = pathToFileURL(resolve(process.cwd(), "src/content/blog"));

console.log(
  "[content.config] blogBase:",
  blogBase.href,
  "exists?",
  fs.existsSync(blogBase),
);

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: blogBase }),
  schema: BlogPostSchema,
});

export const collections = { blog: postsCollection };
