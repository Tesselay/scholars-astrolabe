import type { Config } from "stylelint";

/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-html"],
  rules: {
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }],
    "declaration-no-important": true,
    "color-named": "never",
    "font-weight-notation": "numeric",
    "selector-max-compound-selectors": 3,
    "max-nesting-depth": 3,
  },
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
} satisfies Config;
