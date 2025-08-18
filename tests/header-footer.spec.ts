import { test, expect } from "@playwright/test";

test.describe("Header, Navigation, Footer, and Layout", () => {
  test("header links exist with correct hrefs, footer is visible, and title is set", async ({
    page,
  }) => {
    await page.goto("http://localhost:4321/blog");

    // Document title provided by Layout
    await expect(page).toHaveTitle("Scholar's Blog");

    // Header navigation links
    await expect(page.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    await expect(page.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/blog",
    );
    await expect(page.getByRole("link", { name: "Tags" })).toHaveAttribute(
      "href",
      "/tags",
    );
    await expect(page.getByRole("link", { name: "Test" })).toHaveAttribute(
      "href",
      "/test",
    );

    // Footer presence
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("Footer");

    // Basic nav smoke: go to Tags via header link
    await page.getByRole("link", { name: "Tags" }).click();
    await expect(page).toHaveURL(/\/tags\/?$/);
  });
});
