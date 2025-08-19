import { test, expect } from "@playwright/test";

test.describe("Header, Navigation, Footer, and Layout", () => {
  test("header links exist with correct hrefs, footer is visible, and title is set", async ({
    page,
  }, testInfo) => {
    const base =
      testInfo.project.use.baseURL ||
      process.env.E2E_BASE_URL ||
      "http://127.0.0.1:4321";
    const url = new URL("/blog", base).toString();

    await page.goto(url);

    // Document title provided by Layout
    await expect(page).toHaveTitle(/Scholar.?s Blog/i);

    // Header navigation links
    await expect(page.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      /^\/$/,
    );
    await expect(page.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      /^\/blog\/?$/,
    );
    await expect(page.getByRole("link", { name: "Tags" })).toHaveAttribute(
      "href",
      /^\/tags\/?$/,
    );
    await expect(page.getByRole("link", { name: "Test" })).toHaveAttribute(
      "href",
      /^\/test\/?$/,
    );

    // Footer presence
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText(/Footer/i);

    // Basic nav smoke: go to Tags via header link
    await page.getByRole("link", { name: "Tags" }).click();
    await expect(page).toHaveURL(/\/tags\/?$/);
  });
});
