import { test, expect } from "@playwright/test";

test.describe("Blog page", () => {
  test("renders heading, intro, and optional post links", async ({ page }) => {
    await page.goto("http://localhost:4321/blog");

    // URL should end with /blog
    await expect(page).toHaveURL(/\/blog\/?$/);

    // Heading is visible
    await expect(
      page.getByRole("heading", { level: 1, name: "My Astro Learning Blog" }),
    ).toBeVisible();

    // Intro paragraph is visible
    await expect(
      page.getByText(
        "This is where I will post about my journey learning Astro.",
      ),
    ).toBeVisible();

    // There should be a list element for posts (may be empty if no posts yet)
    const list = page.locator("ul");
    await expect(list.first()).toBeVisible();

    // If there are any post links in the list, ensure they point to /posts/...
    const postLinks = list.first().locator("a");
    const count = await postLinks.count();
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const href = await postLinks.nth(i).getAttribute("href");
        expect(href, "Blog post link should point to /posts/...").toMatch(
          /^\/posts\//,
        );
      }
    }
  });
});
