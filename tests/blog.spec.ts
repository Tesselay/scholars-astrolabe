import { test, expect } from "@playwright/test";

test.describe("Blog page", () => {
  test("renders heading and post links (localized)", async ({
    page,
  }, testInfo) => {
    const base =
      testInfo.project.use.baseURL ||
      process.env.E2E_BASE_URL ||
      "http://127.0.0.1:4321";
    const url = new URL("/en/blog", base).toString();

    await page.goto(url);

    // URL should end with /en/blog
    await expect(page).toHaveURL(/\/en\/blog\/?$/);

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

    // Ensure items link to /en/blog/<slug>
    for (let i = 0; i < itemCount; i++) {
      const li = items.nth(i);
      const link = li.locator('a[href^="/en/blog/"]').first();
      await expect(
        link,
        "Each post item should link to /en/blog/<slug>",
      ).toBeVisible();
    }
  });
});
