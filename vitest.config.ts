import { defineConfig } from "vitest/config";
import { getViteConfig } from "astro/config";
import { mergeConfig, type InlineConfig } from "vite";

export default defineConfig(async () => {
  let base = getViteConfig({ mode: "development" });

  if (typeof base === "function") {
    // @ts-expect-error irrelevant type mismatch
    base = await base({ command: "serve", mode: "development" });
  }

  const astroVite = base as InlineConfig;

  const vitestOnly: InlineConfig = {
    root: process.cwd(),
    resolve: {
      preserveSymlinks: true,
    },
    ssr: {
      noExternal: ["astro", "@astrojs/*", "astro/loaders"],
    },
    test: {
      environment: "node",
      // Ensure no race condition trips up CI
      pool: "forks",
      maxWorkers: 1,
      isolate: false,
      setupFiles: ["./tests/setup/preload-astro-content.ts"],
      deps: {
        optimizer: {
          ssr: {
            include: [
              "astro",
              "astro/loaders",
              "@astrojs/check",
              "@astrojs/rss",
              "@astrojs/sitemap",
            ],
          },
        },
      },
    },
    define: {
      "import.meta.env.DEV": "true",
      "import.meta.env.PROD": "false",
      "import.meta.env.MODE": '"development"',
      "process.env.NODE_ENV": '"development"',
    },
  };

  return mergeConfig(astroVite, vitestOnly);
});
