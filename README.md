# Scholar's Astrolabe

This repository is a minimal, publishable Astro starter you can clone or use as a template. It
avoids project-specific branding and uses neutral placeholders so you can customize it for your own
site.

## Quick start

```shell
yarn install
yarn dev
```

## Customize

- Site title and metadata
  - src/pages/index.astro: change `pageTitle` (currently "Site Title").
  - src/pages/rss.xml.js: update `title` and `description`.
  - astro.config.mjs: set `site` to your deployed URL.
- Hero/background imagery
  - The CSS variable `--hero-bg` in src/styles/tokens.css uses a neutral gradient in both dark and
    light modes. Replace these gradients with your own images or design if desired.
- Navigation & layout
  - src/components/Header.astro: adjust links and structure.
  - src/layouts/Layout.astro: customize `<head>` metadata, favicon, and overall layout.
- Content
  - Example blog posts are included under src/content/blog. Replace with your own content or remove
    them.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `yarn install`         | Installs dependencies                            |
| `yarn dev`             | Starts local dev server at `localhost:4321`      |
| `yarn build`           | Build your production site to `./dist/`          |
| `yarn preview`         | Preview your build locally, before deploying     |
| `yarn astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `yarn astro -- --help` | Get help using the Astro CLI                     |

## Optional libraries

- @astrojs/rss
- @astrojs/prefetch
- Plausible or Umami analytics
- Pagefind (search)
- Partytown
- vite-bundle-visualizer

## TODO

### Architectural

- [ ] Add dark/white toggle
- [ ] Add language toggle
- [ ] font-variant-ligatures, font-kerning, and hyphenation
- [ ] scrollbar (accessible!)
- [ ] tweak robots.txt (sitemap) / astrojs/sitemap
- [ ] ICU?
- [ ] OpenTelemetry / Logging System
- [ ] Localize existing data
- [ ] Read time
- [ ] Unify import system (alias vs. no alias)
- [ ] Always trailing slashes (current) or trailing -> directories/collections & no-trailing ->
      resources/documents?
- [ ] Can I break/inject code into the application via markdown frontmatter props?
- [ ] URL vs. path normalization
  - [ ] What path utils actually should have normalized paths?
- [ ] Astro actions?
- [ ] Fonts API?
- [ ] Add a "cheatsheet" page?
- [ ] Align locale codes to web standard
- [ ] Refine tests
  - [ ] Use `test` instead of `it` in vitest
- [ ] Generic manifest builder

### Code

- [ ] noopener / noreferrer for anchor elements
- [ ] Replace `description` inside NavigationLink with aria-label akin to Button
- [ ] Apply hero placeholder
- [ ] Use routePattern in blog collection helpers
- [ ] Styling not applied in preview/build
- [ ] Set `trailingSlash` config and use in utils
- [ ] Have tests read in trailing slash config
- [ ] Have blog and tag links use ButtonAnchor/NavigationLink component
- [ ] Add 404 page
  - [ ] Redirect or add button to redirect to default lang current or parent page on 404

### Current

- [ ] Rework utils -> Where can I use Astro's functionality, where do I need build-time/file-system
      aware helpers?
  - [ ] content manifest
  - [ ] What should the blog/tag path matcher actually solve? Should paths be neutral?
  - [ ] Replace utils in Layout with Astro's functionality

---
