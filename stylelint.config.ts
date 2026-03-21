import type { Config } from "stylelint";

/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-html"],
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
    // Custom Properties currently can't be resolved
    "no-unknown-custom-media": null,
    // ESLint CSS already handles this
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
  },
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
} satisfies Config;
