import { defineConfig, devices } from "@playwright/test";
import { loadEnv } from "vite";

console.log(loadEnv("development", process.cwd(), ""));

const isCI = Boolean(process.env.CI);
const hasWebServer = Boolean(process.env.CI_WEBSERVER);
const HOST = process.env.HOST || "localhost";
const PORT = Number(process.env.PORT || 4321);
const DEFAULT_URL = process.env.URL || `http://${HOST}:${PORT}`;

console.log(`CI ${process.env.CI}`);
console.log(`CI_WEBSERVER ${process.env.CI_WEBSERVER}`);
console.log(`HOST ${process.env.HOST}`);
console.log(`PORT ${process.env.PORT}`);
console.log(`URL ${process.env.URL}`);

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
