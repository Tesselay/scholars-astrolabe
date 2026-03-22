/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    reporters: ["json", "default"],
    outputFile: "./tests/_output/vitest/test-output.json",
    projects: [
      {
        extends: true,
        test: {
          name: { label: "unit", color: "cyan" },
          environment: "node",
          dir: "./tests/unit",
          include: ["**/*.{test,spec}.{ts,tsx,js,jsx,mts,mjs,cjs}"],
        },
      },
      {
        extends: true,
        test: {
          name: { label: "integration", color: "magenta" },
          environment: "node",
          dir: "./tests/integration",
          include: ["**/*.{test,spec}.{ts,tsx,js,jsx,mts,mjs,cjs}"],
          globalSetup: ["tests/setup/astro-content-server.ts"],
        },
      },
    ],
  },
});
