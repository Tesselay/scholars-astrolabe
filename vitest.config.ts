import { defineConfig } from "vitest/config";
import { getViteConfig } from "astro/config";
import { mergeConfig, type InlineConfig, type PluginOption } from "vite";

export default defineConfig(async () => {
  let base = getViteConfig({ mode: "test" });

  if (typeof base === "function") {
    // @ts-expect-error irrelevant type mismatch
    base = await base({ command: "serve", mode: "test" });
  }

  const astroVite = base as InlineConfig;

  const diagnosticGraph: PluginOption = {
    name: "diagnostic-graph",
    configResolved(cfg) {
      console.log("[diagnostic] root=", cfg.root);
      console.log("[diagnostic] ssr.noExternal=", cfg.ssr?.noExternal);
      console.log(
        "[diagnostic] optimizeDeps.ssr.include=",
        cfg.optimizeDeps?.include,
      );
    },
  };

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
      globalSetup: "./tests/setup/global.ts",
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
    plugins: [diagnosticGraph],
  };

  return mergeConfig(astroVite, vitestOnly);
});
