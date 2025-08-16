import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tselint from "@typescript-eslint"
import astro from "eslint-plugin-astro"
import prettier from "eslint-config-prettier"

const tsParser = tselint.parser("typescript");
const astroParser = astro.parser("typescript");

export default defineConfig([
    // Global Configuration
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },

    // Base Configuration
    js.configs.recommended,
    tselint.configs.recommended,

    // Prettier Configuration
    {
        plugins: {
            prettier: prettier
        },
        rules: {
            "prettier/prettier": "off"
        }
    },

    // Astro Configuration
    astro.configs.recommended,
    astro.configs["jsx-a11y-recommended"],
    {
        files: ["**/*.astro"],
        languageOptions: {
            parser: astroParser,
            parserOptions: {
                parser: tsParser,
                extraFileExtensions: [".astro"],
                sourceType: "module",
                ecmaVersion: "latest",
                project: "./tsconfig.json"
            }
        },
        rules: {
            // "no-undef": "off",
            // "@typescript-eslint/no-explicit-any": "off"
        }
    },

    // Ignore Configuration
    {
        ignores: [
            "dist/", ".astro/", "node_modules/", ".coverage/", "coverage/", ".vite/", ".vscode/", ".idea/",  ".git/",
            ".DS_Store", "*.log",
            "**/*.d.ts", ".github/"
        ]
    }
])