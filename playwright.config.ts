import { defineConfig, devices } from "@playwright/test";
import { loadEnv } from "vite";

const mode = process.env.NODE_ENV ?? "staging";
const env = loadEnv(mode, process.cwd(), ["CI", "HOST", "PORT", "SITE_URL"]);
const isCI = Boolean(env.CI);

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./tests/output",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: env.SITE_URL,
    trace: isCI ? "retain-on-failure" : "on-first-retry",
    screenshot: "only-on-failure",
    video: isCI ? "retain-on-failure" : "off"
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } }
  ],

  webServer: {
    command: `npx astro build && npx astro preview --host ${env.HOST} --port ${env.PORT}`,
    url: env.SITE_URL,
    reuseExistingServer: !isCI,
    timeout: 180_000 // preview + first boot can take a bit on cold caches
  }
});
