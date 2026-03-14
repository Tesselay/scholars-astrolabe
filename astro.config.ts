import sitemap from "@astrojs/sitemap";
import { defineConfig, envField } from "astro/config";
import compress from "astro-compress";
import expressiveCode from "astro-expressive-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkToc from "remark-toc";
import wikiLinkPlugin from "remark-wiki-link";
import { loadEnv } from "vite";

import { astroLocales } from "./src/utils/adapter/astro/locales.ts";
import { defaultLocale } from "./src/utils/core/i18n/locale/definition.ts";

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
      fallbackType: "redirect",
    },
  },
  env: {
    schema: {
      PROTOCOL: envField.string({ context: "server", access: "public", default: "http" }),
      HOST: envField.string({ context: "server", access: "public", default: "localhost" }),
      PORT: envField.number({ context: "server", access: "public", default: 4321 }),
      SITE_URL: envField.string({
        context: "client",
        access: "public",
        default: "http://localhost:4321",
      }),
      DIAG_GRAPH: envField.boolean({ context: "server", access: "public", default: false }),
    },
  },
  integrations: [
    expressiveCode(),
    sitemap({ filter: (page) => !page.includes("/test") }),
    compress(),
  ],
  markdown: {
    remarkPlugins: [
      remarkGfm,
      remarkMath,
      remarkDirective,
      remarkFrontmatter,
      remarkToc,
      [wikiLinkPlugin, { aliasDivider: "|" }],
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap", properties: { class: "heading-link" } }],
      rehypeKatex,
      [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
    ],
  },
});
