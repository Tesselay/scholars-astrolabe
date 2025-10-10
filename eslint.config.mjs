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

  // Astro
  ...astro.configs.recommended,
  ...astro.configs["jsx-a11y-recommended"],

  // JSON
  json.configs.recommended,

  // CSS
  css.configs.recommended,

  // Prettier
  eslintConfigPrettier,

  // Globals
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },

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
