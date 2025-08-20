import { test, expect } from "@playwright/test";

test.describe("Header, Navigation, Footer, and Layout", () => {
  test("header links (localized), aria-current, skip-link, footer, and title", async ({
    page,
  }, testInfo) => {
    const base =
      testInfo.project.use.baseURL ||
      process.env.E2E_BASE_URL ||
      "http://127.0.0.1:4321";
    const url = new URL("/en/blog", base).toString();

    await page.goto(url);

    // Document title provided by Layout
    await expect(page).toHaveTitle(/Scholar.?s Blog/i);

    // Skip link exists (may be visually hidden)
    await expect(page.locator("a.skip-link")).toHaveAttribute("href", "#main");

    // Header navigation links (localized)
    const home = page.getByRole("link", { name: "Home" });
    const blog = page.getByRole("link", { name: "Blog" });

    await expect(home).toHaveAttribute("href", /^\/en\/?$/);
    await expect(blog).toHaveAttribute("href", /^\/en\/blog\/?$/);

    // aria-current on current page link
    await expect(blog).toHaveAttribute("aria-current", "page");
    await expect(home).not.toHaveAttribute("aria-current", "page");

    // Footer presence
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText(/Footer/i);

    // Navigate Home and verify URL
    await home.click();
    await expect(page).toHaveURL(/\/en\/?$/);
  });
});
