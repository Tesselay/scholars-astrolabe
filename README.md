# Scholar's Astrolabe

This repository is a minimal, publishable Astro starter you can clone or use as a template. It avoids project-specific branding and uses neutral placeholders so you can customize it for your own site.

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
  - The CSS variable `--hero-bg` in src/styles/tokens.css uses a neutral gradient in both dark and light modes. Replace these gradients with your own images or design if desired.
- Navigation & layout
  - src/components/Header.astro: adjust links and structure.
  - src/layouts/Layout.astro: customize `<head>` metadata, favicon, and overall layout.
- Content
  - Example blog posts are included under src/content/blog. Replace with your own content or remove them.

## Commands

All commands are run from the root of the project, from a terminal:

| Command            | Action                                           |
| :----------------- | :----------------------------------------------- |
| `yarn install`     | Installs dependencies                            |
| `yarn dev`         | Starts local dev server at `localhost:4321`      |
| `yarn build`       | Build your production site to `./dist/`          |
| `yarn preview`     | Preview your build locally, before deploying     |
| `yarn astro ...`   | Run CLI commands like `astro add`, `astro check` |
| `yarn astro -- --help` | Get help using the Astro CLI                 |

## Optional libraries
- @astrojs/rss
- @astrojs/prefetch
- Plausible or Umami analytics
- Pagefind (search)
- Partytown
- vite-bundle-visualizer

## TODO
- [ ] Add dark/white toggle
- [ ] Add translation layer
- [ ] Build with accessibility in mind
- [ ] Add test page
- [ ] Define stylesheets
- [ ] Add MDX Obsidian Flavor
  - remark-gfm
  - remark-wiki-link
  - remark-directive
  - remark-math + rehype-katex
  - rehype-slug + rehype-autolink-heading
- [ ] Add robots.txt (sitemap)
- [ ] Tweak prettier/eslint
