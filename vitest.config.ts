import { defineConfig } from "vitest/config";
import { getViteConfig } from "astro/config";
import { mergeConfig, type InlineConfig } from "vite";

export default defineConfig(async () => {
  let base = getViteConfig({ mode: "test" });

  if (typeof base === "function") {
    // @ts-expect-error irrelevant type mismatch
    base = await base({ command: "serve", mode: "test" });
  }

  const astroVite = base as InlineConfig;

  const vitestOnly: InlineConfig = {
    test: {
      environment: "node",
      // Ensure no race condition trips up CI
      pool: "threads",
      maxWorkers: 1,
      setupFiles: ["./tests/setup/preload-astro-content.ts"],
    },
  };

  return mergeConfig(astroVite, vitestOnly);
});
