import { defineConfig, envField } from "astro/config";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import compress from "astro-compress";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import wikiLinkPlugin from "remark-wiki-link";
import remarkToc from "remark-toc";
import remarkFrontmatter from "remark-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypeExternalLinks from "rehype-external-links";

import { loadEnv } from "vite";

import { defaultLocale, astroLocales } from "./src/utils/core/i18n/locale/locales.ts";
import callouts from "./src/markdown/callout/remark-callouts.js";

const mode = process.env.NODE_ENV ?? "development";
const env = loadEnv(mode, process.cwd(), ["SITE_URL", "DIAG_GRAPH"]);

export default defineConfig({
  site: env.SITE_URL,
  i18n: {
    locales: astroLocales,
    defaultLocale,
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
      fallbackType: "redirect"
    }
  },
  env: {
    schema: {
      PROTOCOL: envField.string({ context: "server", access: "public", default: "http" }),
      HOST: envField.string({ context: "server", access: "public", default: "localhost" }),
      PORT: envField.number({ context: "server", access: "public", default: 4321 }),
      SITE_URL: envField.string({
        context: "client",
        access: "public",
        default: "http://localhost:4321"
      }),
      DIAG_GRAPH: envField.boolean({ context: "server", access: "public", default: false })
    }
  },
  integrations: [
    expressiveCode(),
    sitemap({
      filter: (page) => !page.includes("/test")
    }),
    compress()
  ],
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
          aliasDivider: "|"
        }
      ],
      callouts
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: { class: "heading-link" }
        }
      ],
      rehypeKatex,
      [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }]
    ]
  }
});
