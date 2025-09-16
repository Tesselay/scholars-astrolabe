import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;
const HOST = process.env.HOST || "localhost";
const PORT = Number(process.env.PORT || 4321);
const DEFAULT_URL = `http://${HOST}:${PORT}`;
const hasExternalServer = !!process.env.E2E_BASE_URL;

/**
 * If E2E_BASE_URL is provided (e.g., CI already serves dist),
 * Playwright will not start its own server.
 * Otherwise, it will run a production-like server via `astro preview`.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: process.env.E2E_BASE_URL || DEFAULT_URL,
    trace: isCI ? "retain-on-failure" : "on-first-retry",
    screenshot: "only-on-failure",
    video: isCI ? "retain-on-failure" : "off",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],

  // Start a server only when we don't have an external one (e.g., local runs).
  webServer: hasExternalServer
    ? undefined
    : {
        // Production-like: build once, then preview (serves dist/)
        command: `npx astro build && npx astro preview --host ${HOST} --port ${PORT}`,
        url: DEFAULT_URL,
        reuseExistingServer: !isCI,
        timeout: 180_000, // preview + first boot can take a bit on cold caches
      },
});
