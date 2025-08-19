import { test, expect } from "@playwright/test";

test.describe("Blog page", () => {
  test("renders heading, intro, and optional post links", async ({
    page,
  }, testInfo) => {
    const base =
      testInfo.project.use.baseURL ||
      process.env.E2E_BASE_URL ||
      "http://127.0.0.1:4321";
    const url = new URL("/blog", base).toString();

    await page.goto(url);

    // URL should end with /blog
    await expect(page).toHaveURL(/\/blog\/?$/);

    // Heading is visible
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Scope lists to main content to avoid matching nav lists
    const main = page.getByRole("main");
    const postsList = main.getByRole("list").first();
    await expect(postsList).toBeVisible();

    // Ensure there is at least one list item
    const items = postsList.getByRole("listitem");
    const itemCount = await items.count();
    expect(
      itemCount,
      "Blog posts list should have at least one item",
    ).toBeGreaterThan(0);

    // Optional: ensure items link to /posts/...
    for (let i = 0; i < itemCount; i++) {
      const li = items.nth(i);
      const link = li.locator('a[href^="/posts/"]').first();
      await expect(
        link,
        "Each post item should link to /posts/<slug>",
      ).toBeVisible();
    }
  });
});
