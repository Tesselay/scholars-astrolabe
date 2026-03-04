import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import css from "@eslint/css";
import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base Presets
  js.configs.recommended,
  tseslint.configs.recommended,
  stylistic.configs.recommended,

  // Language Presets
  json.configs.recommended,
  css.configs.recommended,
  astro.configs.recommended,
  astro.configs["jsx-a11y-recommended"],

  {
    name: "Globals",
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      components: {
        Navigation: "ul",
        NavigationLink: "a",
        Header: "header",
        Button: "button",
        ButtonAnchor: "a",
      },
      attributes: {
        href: "href",
        variant: "class",
        size: "class",
        sizing: "class",
      },
    },
    rules: {
      "@typescript-eslint/no-import-type-side-effects": "error",
    },
  },

  {
    name: "Stylistic Overrides",
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/brace-style": ["error", "stroustrup"],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/arrow-spacing": ["error", { before: true, after: true }],
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 1 }],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/member-delimiter-style": ["error", { multiline: { delimiter: "semi" }, singleline: { delimiter: "semi" } }],
    },
  },

  {
    name: "Astro Overrides",
    files: ["**/*.astro"],
    rules: {
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "always" },
      ],
      "astro/no-unused-define-vars-in-style": "off",
      "@stylistic/jsx-one-expression-per-line": "off",
    },
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
      "tests/**",
    ],
  },
]);
