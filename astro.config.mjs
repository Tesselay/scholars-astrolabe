import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import wikiLinkPlugin from "remark-wiki-link";
import remarkToc from "remark-toc";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeExternalLinks from "rehype-external-links";
import compress from "astro-compress";

import callouts from "./src/markdown/remark-callouts.js";
import remarkFrontmatter from "remark-frontmatter";
import { createRequire } from "node:module";

// Load TypeScript shared locales in an ESM .mjs file using jiti
const require = createRequire(import.meta.url);
const jiti = require("jiti")(import.meta.url);
const { locales, defaultLocale } = jiti("./src/i18n/locales.ts");

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const mainDomain = env.MAIN_DOMAIN;
  const site =
    mode === "production" ? `https://${mainDomain}` : `http://${mainDomain}`;

  return {
    site,
    markdown: {
      remarkPlugins: [
        remarkGfm,
        remarkMath,
        remarkDirective,
        remarkFrontmatter,
        remarkToc,
        [
          wikiLinkPlugin,
          {
            aliasDivider: "|",
            pageResolver: (name) => [slugify(name)],
            hrefTemplate: (permalink) => `/${permalink}`,
          },
        ],
        callouts,
      ],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
            properties: { class: "heading-link" },
          },
        ],
        rehypeKatex,
        [
          rehypeExternalLinks,
          { target: "_blank", rel: ["noopener", "noreferrer"] },
        ],
      ],
    },
    integrations: [
      expressiveCode(),
      sitemap({
        filter: (page) => !page.includes("/test"),
      }),
      compress(),
    ],
    i18n: {
      locales,
      defaultLocale,
    },
    alias: {
      "@": "./src",
      "@/i18n": "./src/i18n",
    },
  };
});
