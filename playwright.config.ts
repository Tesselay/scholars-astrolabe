import { defineConfig, devices } from "@playwright/test";

const isCI = Boolean(process.env.CI);
const hasWebServer = Boolean(process.env.CI_WEBSERVER);
const HOST = process.env.HOST || "localhost";
const PORT = Number(process.env.PORT || 4321);
const DEFAULT_URL = process.env.URL || `http://${HOST}:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./tests/output",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: process.env.URL || DEFAULT_URL,
    trace: isCI ? "retain-on-failure" : "on-first-retry",
    screenshot: "only-on-failure",
    video: isCI ? "retain-on-failure" : "off"
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } }
  ],

  webServer: hasWebServer
    ? undefined
    : {
        command: `npx astro build && npx astro preview --host ${HOST} --port ${PORT}`,
        url: DEFAULT_URL,
        reuseExistingServer: !isCI,
        timeout: 180_000 // preview + first boot can take a bit on cold caches
      }
});
