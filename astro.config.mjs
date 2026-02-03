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

import callouts from "./src/markdown/callout/remark-callouts.js";
import diagnosticGraph from "./diagnostic-graph.js";

export default defineConfig({
  site: process.env.URL,
  vite: {
    plugins: [process.env.DIAG_GRAPH && diagnosticGraph()]
  },
  env: {
    schema: {
      URL: envField.string({
        context: "client",
        access: "public",
        default: "http://localhost:4321"
      }),
      ROOT_REDIRECT_PAGE: envField.boolean({ context: "server", access: "public", default: true }),
      TEST_PAGE: envField.boolean({ context: "server", access: "public", default: true }),
      DIAG_GRAPH: envField.boolean({ context: "server", access: "public", default: true })
    }
  },
  alias: {
    "@": "./src"
  },
  integrations: [
    expressiveCode(),
    sitemap({
      filter: (page) => !page.includes("/test")
    }),
    compress()
  ],
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en"
  },
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
