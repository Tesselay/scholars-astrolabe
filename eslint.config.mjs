import css from "@eslint/css";
import js from "@eslint/js";
import json from "@eslint/json";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";
import astro from "eslint-plugin-astro";
import importx from "eslint-plugin-import-x";
import globals from "globals";
import tseslint from "typescript-eslint";

const fileGlobScript = ["**/*.{js,ts,jsx,tsx,cjs,cts,mjs,mts}"];
const fileGlobAstro = ["**/*.astro"];
const fileGlobCss = ["**/*.css"];
const fileGlobJson = ["**/*.{json,jsonc}"];
const fileGlobGlobal = [...fileGlobScript, ...fileGlobAstro];

export default defineConfig([
  {
    name: "Script Global",
    files: fileGlobGlobal,
    extends: [
      js.configs.recommended,
      tseslint.configs.eslintRecommended,
      tseslint.configs.strictTypeChecked,
    ],
    rules: {
      "@typescript-eslint/no-import-type-side-effects": "error",
      "sort-vars": "error",
      "prefer-arrow-callback": "error",
      "curly": "error",
      "complexity": ["error", 10],
      "max-lines-per-function": ["warn", { max: 100, skipBlankLines: true, skipComments: true }],
      "max-depth": ["error", 4],
      "max-nested-callbacks": ["error", 4],
      "max-params": ["warn", 4],
      "no-console": [
        "warn",
        {
          allow: [
            "warn",
            "error",
            "debug",
          ],
        },
      ],
      "no-else-return": ["error", { allowElseIf: false }],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-bitwise": "warn",
    },
  },

  {
    name: "Astro",
    files: fileGlobAstro,
    extends: [astro.configs.recommended, astro.configs["jsx-a11y-recommended"]],
    rules: {
      "astro/no-exports-from-components": "error",
      "astro/no-set-html-directive": "error",
      "astro/no-unsafe-inline-scripts": "error",
      "astro/no-set-text-directive": "error",
      "astro/no-unused-css-selector": "warn",
      "astro/prefer-class-list-directive": "error",
      "astro/prefer-object-class-list": "error",
      "astro/prefer-split-class-list": "error",
      "astro/sort-attributes": "error",
      "astro/jsx-a11y/anchor-ambiguous-text": "error",
      "astro/jsx-a11y/control-has-associated-label": "error",
      "astro/jsx-a11y/lang": "error",
      "astro/jsx-a11y/no-aria-hidden-on-focusable": "error",
      "astro/jsx-a11y/prefer-tag-over-role": "warn",
      // Issues
      "astro/no-unused-define-vars-in-style": "warn",
      "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "always" }],
      "@stylistic/jsx-one-expression-per-line": "off",
      "import-x/exports-last": "off",
    },
  },

  {
    name: "Import",
    files: fileGlobGlobal,
    extends: [importx.flatConfigs.recommended, importx.flatConfigs.typescript],
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
      "import-x/extensions": ["warn", "ignorePackages"],
      "import-x/exports-last": "error",
      "import-x/group-exports": "error",
      "import-x/first": "error",
      "import-x/newline-after-import": "error",
      "import-x/no-anonymous-default-export": "error",
      "import-x/no-default-export": "error",
      "import-x/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
          ],
          "newlines-between": "always",
          "alphabetize": { order: "asc", caseInsensitive: true },
          "named": { enabled: true, types: "types-first" },
          "warnOnUnassignedImports": true,
          "pathGroups": [
            { pattern: "&ui/**", group: "internal", position: "before" },
            { pattern: "&content/**", group: "internal", position: "before" },
            { pattern: "&utils/**", group: "internal", position: "before" },
            { pattern: "&types/**", group: "internal", position: "before" },
            { pattern: "&styles/**", group: "internal", position: "before" },
          ],
        },
      ],
      // Already checked via TypeScript
      "import-x/named": "off",
      "import-x/namespace": "off",
      "import-x/default": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/no-unresolved": "off",
    },
  },

  {
    name: "Stylistic",
    files: fileGlobGlobal,
    extends: [stylistic.configs.recommended],
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/quote-props": ["error", "consistent-as-needed"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/semi-style": ["error", "last"],
      "@stylistic/no-extra-semi": "error",
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/brace-style": ["error", "stroustrup"],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/arrow-spacing": ["error", { before: true, after: true }],
      "@stylistic/no-confusing-arrow": "error",
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 1 }],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/member-delimiter-style": [
        "error",
        {
          multiline: { delimiter: "semi" },
          singleline: { delimiter: "semi" },
        },
      ],
      "@stylistic/implicit-arrow-linebreak": ["error", "beside"],
      "@stylistic/function-paren-newline": ["error", "consistent"],
      "@stylistic/max-len": [
        "error",
        {
          code: 120,
          ignoreUrls: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
          ignoreRegExpLiterals: true,
        },
      ],
      "@stylistic/function-call-spacing": ["error", "never"],
      "@stylistic/function-call-argument-newline": ["error", "consistent"],
      "@stylistic/curly-newline": ["error", { consistent: true, multiline: true }],
      "@stylistic/object-curly-newline": ["error", { consistent: true, multiline: true }],
      "@stylistic/array-element-newline": ["error", { minItems: 3, multiline: true }],
      "@stylistic/array-bracket-newline": ["error", { multiline: true, minItems: 3 }],
      "@stylistic/wrap-regex": "error",
      "@stylistic/switch-colon-spacing": ["error", { after: true, before: false }],
      "@stylistic/padding-line-between-statements": ["error", { blankLine: "always", prev: "*", next: "return" }],
      "@stylistic/one-var-declaration-per-line": ["error", "initializations"],
      "@stylistic/object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
      "@stylistic/newline-per-chained-call": ["error", { ignoreChainWithDepth: 3 }],
      "@stylistic/multiline-comment-style": ["warn", "starred-block"],
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/jsx-self-closing-comp": "error",
      "@stylistic/jsx-max-props-per-line": ["error", { maximum: 1, when: "multiline" }],
      "@stylistic/jsx-pascal-case": ["error", { allowAllCaps: true }],
      "@stylistic/jsx-child-element-spacing": "error",
    },
  },

  {
    name: "JSON",
    files: fileGlobJson,
    plugins: { json },
    language: "json/jsonc",
    extends: ["json/recommended"],
  },

  {
    name: "CSS",
    files: [...fileGlobCss],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
    rules: {
      "css/use-baseline": [
        "error",
        {
          available: "newly",
          allowSelectors: ["selection"],
          allowProperties: ["scrollbar-color"],
        },
      ],
      "css/no-invalid-properties": ["error", { allowUnknownVariables: true }],
      "css/prefer-logical-properties": "error",
      "css/relative-font-units": ["error", { allowUnits: ["em", "rem"] }],
    },
  },

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
      "max-lines": [
        "warn",
        {
          max: 300, skipBlankLines: true, skipComments: true,
        },
      ],
    },
  },

  {
    name: "TypeScript Type Checking Configuration",
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["src/pages/.well-known/security.txt.ts"],
        },
      },
    },
    ignores: ["astro.config.ts", "**/*.js"],
  },

  {
    name: "Astro Overrides",
    files: fileGlobAstro,
    rules: {
      "astro/no-unused-define-vars-in-style": "warn",
      "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "always" }],
      "@stylistic/jsx-one-expression-per-line": "off",
      "import-x/exports-last": "off",
    },
  },

  {
    name: "Type Checked Linting Overrides",
    files: [
      "astro.config.ts",
      "**/*.js",
      "**/*.astro",
    ],
    extends: [tseslint.configs.disableTypeChecked],
  },

  {
    name: "External Overrides",
    files: ["**/*.config.*"],
    rules: {
      "import-x/no-default-export": "off",
      "import-x/no-anonymous-default-export": "off",
      "import-x/extensions": "off",
    },
  },

  {
    name: "Ignore Files",
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
      "package-lock.json",
      "yarn.lock",
      "LICENSE",
    ],
  },
]);
