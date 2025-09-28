import { getViteConfig } from "astro/config";

export default getViteConfig({
  // @ts-expect-error: TS complains wrongly about test not existing for UserConfig
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: { label: "unit", color: "cyan" },
          environment: "node",
          dir: "tests/unit",
          include: ["**/*.{test,spec}.{ts,tsx,js,jsx,mts,mjs,cjs}"]
        }
      },
      {
        extends: true,
        test: {
          name: { label: "integration", color: "magenta" },
          environment: "node",
          dir: "tests/integration",
          include: ["**/*.{test,spec}.{ts,tsx,js,jsx,mts,mjs,cjs}"],
          globalSetup: ["tests/setup/astro-content-server.ts"],
          // Ensure no race condition trips up CI
          pool: "forks",
          maxWorkers: 1,
          isolate: false
        }
      }
    ]
  }
});
