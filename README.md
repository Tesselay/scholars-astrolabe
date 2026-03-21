# Scholar's Astrolabe

## Introduction

An opinionated and likely overengineered Astro template with a whimsical touch and an eye for
accessibility and clean code.

## Features

- Dynamic Localization (i18n) with a custom dictionary loader
- Accessibility-first design
- Mobile-first design
- RSS
- SEO metadata
- OpenGraph metadata
- Extensive TypeScript Support
- Extensive Testing using Vitest & Playwright
- Configured ESLint & Prettier
- GitHub Actions CI support
- Diagnostics plugin for easy debugging
- Adapterized utils for easy library switching
- Aliased Imports

## Quick start

```shell
yarn install
yarn dev
```

## Customize

- Localization
  - [ ] Add new locale to `/src/utils/core/i18n/locales.ts`
  - [ ] Add new dictionary to `/src/content/dictionaries/[locale]/*.json`
  - [ ] Set default locale in `/src/utils/core/i18n/locales.ts`

## Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `yarn install`         | Installs dependencies                            |
| `yarn dev`             | Starts local dev server at `localhost:4321`      |
| `yarn build`           | Build your production site to `./dist/`          |
| `yarn preview`         | Preview your build locally, before deploying     |
| `yarn test`            | Run unit & integration tests                     |
| `yarn e2e`             | Run e2e tests                                    |
| `yarn lint`            | Run ESLint                                       |
| `yarn typecheck`       | Check for type issues                            |
| `yarn test:a11y`       | Runs accessibility check                         |
| `yarn astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `yarn astro -- --help` | Get help using the Astro CLI                     |

## TODO

- RSS
- Sitemap

### Current

#### Linting & Formatting

- [ ] Lint rule for CSS indentation
- [ ] Object Newlines
- [ ] Env Var for glob/file extensions
- [ ] `import-x/no-restricted-paths` to better control module domains
- [ ] ESLint Plugins:
  - [ ] Vitest
  - [ ] Playwright
  - [ ] Zod
  - [ ] Unicorn
  - [ ] Perfectionist
  - [ ] Markdown

#### Rework Testing

- [ ] Use programmatic API for test setup or remove dev server completely -> What do I need it for?
- [ ] Vitest & Playwright Linter
- [ ] Refactor test fake glob into adapter
- [ ] Add test for static dict import for dict loader
- [ ] Use `test` instead of `it` in vitest
- [ ] Rework test utils
- [ ] Prevent error printing in test output (invalid dictionary)

#### CSS Rework

- [ ] Readme for style architecture
- [ ] Rework color system https://www.youtube.com/watch?v=vGfTyHPWZLE
  - [ ] Restrict to one color system (e.g. Oklch)
- [ ] Flip reduced motion logic and introduce motion via `prefers-reduced-motion: no-preference` media query
- [ ] PostCSS + autoprefixer https://codelucky.com/css-autoprefixer/ (Set StyleLint vendorprefix rules accordingly)
- [ ] Be aware of CSS ESLint CSS custom property tracking: https://github.com/eslint/css/pull/377
- [ ] Use FontsAPI https://docs.astro.build/en/reference/font-provider-reference/
- [ ] font-variant-ligatures, font-kerning, and hyphenation
- [ ] Env vars https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/env
- [ ] Use logical properties
- [ ] Site is usable with >= 200% zoom
- [ ] https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/
- [ ] Replace CSS Reset https://www.joshwcomeau.com/css/custom-css-reset/
- [ ] Layers?
- [ ] BEM? https://github.com/MorevM/stylelint-plugin

### Issues

- [ ] Styling is not applied correctly in preview/build
- [ ] Dependabot Alerts
- [ ] Validate environment variables beyond Astro context https://catalins.tech/validate-environment-variables-with-zod/ | https://www.creatures.sh/blog/env-type-safety-and-validation/#extending-the-global-processenv

### Code

- [ ] noopener / noreferrer for anchor elements
- [ ] Replace `description` inside NavigationLink with aria-label akin to Button
- [ ] Apply hero placeholder
- [ ] Have blog and tag links use ButtonAnchor/NavigationLink component
- [ ] Add read time
- [ ] Use `ReturnType` for dict loader return type

### Components

- [ ] 404 Page
  - [ ] Redirect or add button to redirect to default lang current or parent page on 404
- [ ] Theme Switcher
- [ ] Language Switcher
- [ ] Accessible Scrollbar
- [ ] Favicon
- [ ] Refactor Diagnostics Plugin (Vite DevTools?)
- [ ] Refactor Tags
- [ ] Improve security txt
- [ ] Improve robots txt
- [ ] Improve humans txt
- [ ] Scrollbar

### Architectural

- [ ] Localize existing data
- [ ] Always trailing slashes (current) or trailing -> directories/collections & no-trailing ->
      resources/documents?
- [ ] Can I break/inject code into the application via markdown frontmatter props?
- [ ] Add a "cheatsheet" page?
- [ ] Align locale codes to web standard
- [ ] Split out head metadata into separate component?
- [ ] Markdown frontmatter schema?
- [ ] Use URL for paths? (can work with file paths too)
- [ ] Refine TypeScript Configuration https://www.typescript-training.com/course/enterprise-v2/03-tsconfig-strictness/
- [ ] Completely customized ESLint/TypeScript setup -> separate repo

### Considerations

- Astro Actions
- Astro Fonts API
- JSON Schema
- ICU MessageFormat
- OpenTelemetry / Logging System
- @astrojs/rss
- @astrojs/prefetch
- Plausible or Umami Analytics
- Pagefind
- Partytown
- vite-bundle-visualizer

---
