import css from "@eslint/css";
import js from "@eslint/js";
import json from "@eslint/json";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";
import astro from "eslint-plugin-astro";
import importx from "eslint-plugin-import-x";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  // Base Presets
  js.configs.recommended,
  tseslint.configs.recommended,
  stylistic.configs.recommended,
  importx.flatConfigs.recommended,
  importx.flatConfigs.typescript,

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
      "@stylistic/quote-props": ["error", "consistent-as-needed"],
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
    name: "Import Overrides",
    rules: {
      "import-x/no-deprecated": "error",
      "import-x/no-empty-named-blocks": "error",
      "import-x/no-extraneous-dependencies": "error",
      "import-x/no-named-as-default": "off",
      "import-x/no-rename-default": "off",
      "import-x/no-amd": "error",
      "import-x/no-commonjs": "error",
      "import-x/no-import-module-exports": "error",
      "import-x/no-absolute-path": "warn",
      "import-x/no-cycle": ["warn", { ignoreExternal: true }],
      "import-x/no-relative-packages": "error",
      "import-x/no-self-import": "error",
      "import-x/no-useless-path-segments": "error",
      // Stylistic
      // "import-x/exports-last": "error",
      "import-x/extensions": ["warn", "ignorePackages"],
      "import-x/first": "error",
      // "import-x/group-exports": "error",
      "import-x/newline-after-import": "error",
      "import-x/no-anonymous-default-export": "error",
      "import-x/no-default-export": "error",
      "import-x/order": ["error", {
        "groups": ["builtin", "external", "internal", "parent", "sibling"],
        "pathGroups": [
          { pattern: "&ui/**", group: "internal", position: "before" },
          { pattern: "&content/**", group: "internal", position: "before" },
          { pattern: "&utils/**", group: "internal", position: "before" },
          { pattern: "&types/**", group: "internal", position: "before" },
          { pattern: "&styles/**", group: "internal", position: "before" },
        ],
        "newlines-between": "always", "alphabetize": { order: "asc", caseInsensitive: true }, "named": { enabled: true, types: "types-first" }, "warnOnUnassignedImports": true }],
      // Already checked via TypeScript
      "import-x/named": "off",
      "import-x/namespace": "off",
      "import-x/default": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/no-unresolved": "off",
    },
  },

  {
    name: "Astro Overrides",
    files: ["**/*.astro"],
    rules: {
      "astro/no-unused-define-vars-in-style": "warn",
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "always" },
      ],
      "@stylistic/jsx-one-expression-per-line": "off",
      "import-x/exports-last": "off",
    },
  },

  {
    name: "External Overrides",
    files: ["**/*.config.*"],
    rules: {
      "import-x/no-default-export": "off",
      "import-x/extensions": "off",
    },
  },

  // Ignores
  {
    ignores: [
      ".pnp.*",
      "*.yarn/**",
      "dist/",
      ".astro/",
      ".coverage/",
      "coverage/",
      ".vite/",
      ".vscode/",
      ".idea/",
      ".DS_Store",
      "*.log",
      "**/*.d.ts",
      ".github/",
      "tests/**",
    ],
  },
]);
