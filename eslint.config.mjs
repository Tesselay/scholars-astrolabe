import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import css from "@eslint/css";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

import { defineConfig } from "eslint/config";

export default defineConfig([
  // JavaScript
  js.configs.recommended,

  // TypeScript
  ...tseslint.configs.recommended,

  // Astro (+ jsx-a11y)
  ...astro.configs.recommended,
  ...astro.configs["jsx-a11y-recommended"],

  // JSON
  json.configs.recommended,

  // CSS
  css.configs.recommended,

  // Globals
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    settings: {
      components: {
        Navigation: "ul",
        NavigationLink: "a",
        Header: "header",
        Button: "button",
        ButtonAnchor: "a"
      },
      attributes: {
        href: "href",
        variant: "class",
        size: "class",
        sizing: "class"
      }
    }
  },

  // Prettier
  eslintConfigPrettier,

  // Ignores
  {
    ignores: [
      ".pnp.*",
      "*.yarn/**",
      "dist/",
      ".astro/",
      "node_modules/",
      ".coverage/",
      "coverage/",
      ".vite/",
      ".vscode/",
      ".idea/",
      ".git/",
      ".DS_Store",
      "*.log",
      "**/*.d.ts",
      ".github/",
      "tests/**"
    ]
  }
]);
