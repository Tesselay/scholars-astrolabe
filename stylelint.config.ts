import type { Config } from "stylelint";

/** @type {import("stylelint").Config} */
export default {
  plugins: ["stylelint-plugin-defensive-css"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-html",
    "stylelint-plugin-defensive-css/configs/recommended",
    "stylelint-config-recess-order",
    "@stylistic/stylelint-config",
  ],
  rules: {
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }],
    "color-named": "never",
    "font-weight-notation": "numeric",
    "selector-max-compound-selectors": 3,
    "max-nesting-depth": 3,
    "comment-empty-line-before": [
      "always",
      {
        ignoreComments: ["/^stylelint/", "/^eslint/"],
        except: ["first-nested"],
      },
    ],
    "selector-id-pattern": null,
    // Disable until PostCSS Autoprefixer is enabled
    "property-no-vendor-prefix": null,
    // Custom Properties currently can't be resolved
    "no-unknown-custom-media": null,
    // Naming grid lines is not always a semantic win
    "defensive-css/require-named-grid-lines": [true, { severity: "warning" }],
    "defensive-css/require-pure-selectors": [
      true,
      {
        ignoreElements: ["html", "*"],
        severity: "error",
      },
    ],
    "defensive-css/require-overscroll-behavior": [true, { severity: "error" }],
    "defensive-css/require-scrollbar-gutter": true,
    "@stylistic/max-line-length": [120, { ignore: ["comments"] }],
    "@stylistic/indentation": [2, { baseIndentLevel: 1 }],
    // ESLint CSS already handles these
    "declaration-no-important": null,
    "keyframe-declaration-no-important": null,
    "font-family-no-missing-generic-family-keyword": null,
    "no-duplicate-at-import-rules": null,
    "keyframe-block-no-duplicate-selectors": null,
    "block-no-empty": null,
    "no-invalid-position-at-import-rule": null,
    "at-rule-prelude-no-invalid": null,
    "at-rule-descriptor-no-unknown": null,
    "at-rule-descriptor-value-no-unknown": null,
    "at-rule-no-unknown": null,
    "at-rule-no-deprecated": null,
    "named-grid-areas-no-invalid": null,
    "property-no-unknown": null,
    "declaration-property-value-no-unknown": null,
    "unit-no-unknown": null,
    "media-feature-name-value-no-unknown": null,
    "media-feature-name-no-unknown": null,
    "media-query-no-invalid": null,
    "selector-anb-no-unmatchable": null,
    "defensive-css/no-fixed-sizes": null,
    "defensive-css/require-at-layer": null,
  },
  overrides: [
    {
      files: ["**/ui/**/*.css", "**/*.astro"],
      rules: {
        // Might be useful for compounding selectors but otherwise ill-advised in a component architecture
        "defensive-css/require-pure-selectors": null,
      },
    },
  ],
  reportDescriptionlessDisables: true,
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
} satisfies Config;
