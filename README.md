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
| `yarn format`          | Run Prettier                                     |
| `yarn typecheck`       | Check for type issues                            |
| `yarn test:a11y`       | Runs accessibility check                         |
| `yarn astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `yarn astro -- --help` | Get help using the Astro CLI                     |

## TODO

- RSS
- Sitemap

### Current

#### Linting & Formatting

- [ ] Lint rule for astro jsx indentation (e.g. in style tag)
- [ ] Typed Lint rules (ESLint & TSESLint)
- [ ] Set ESLint and TypeScript to strict
- [ ] CSS Lint
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

### Issues

- [ ] Styling is not applied correctly in preview/build
- [ ] Dependabot Alerts

### Code

- [ ] noopener / noreferrer for anchor elements
- [ ] Replace `description` inside NavigationLink with aria-label akin to Button
- [ ] Apply hero placeholder
- [ ] Have blog and tag links use ButtonAnchor/NavigationLink component
- [ ] Add read time

### Components

- [ ] 404 Page
  - [ ] Redirect or add button to redirect to default lang current or parent page on 404
- [ ] Theme Switcher
- [ ] Language Switcher
- [ ] Accessible Scrollbar
- [ ] Favicon
- [ ] Rework Diagnostics Plugin (Vite DevTools?)
- [ ] Rework Tags
- [ ] Improve security txt
- [ ] Improve robots txt
- [ ] Improve humans txt

### Architectural

- [ ] font-variant-ligatures, font-kerning, and hyphenation
- [ ] Localize existing data
- [ ] Always trailing slashes (current) or trailing -> directories/collections & no-trailing ->
      resources/documents?
- [ ] Can I break/inject code into the application via markdown frontmatter props?
- [ ] Add a "cheatsheet" page?
- [ ] Align locale codes to web standard
- [ ] Split out head metadata into separate component?
- [ ] Rework color system https://www.youtube.com/watch?v=vGfTyHPWZLE
- [ ] Markdown frontmatter schema?
- [ ] Use URL for paths? (can work with file paths too)
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
