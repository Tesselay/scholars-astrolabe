import { test, expect } from "@playwright/test";

test.describe("Post page (dynamic route) and BlogPostLayout", () => {
  test("navigates to first post and shows title, dates, and optional tag links", async ({
    page,
  }) => {
    // Go to blog and find first post link
    await page.goto("http://localhost:4321/blog");
    const postLink = page.locator('ul a[href^="/posts/"]').first();
    const hasPost = await postLink.count();

    if (hasPost === 0) {
      test.skip(true, "No posts available to test dynamic post page.");
    }

    // Capture the post title from the link (used to target the correct h1 later)
    const postTitle = (await postLink.innerText()).trim();

    await Promise.all([
      page.waitForURL(/\/posts\/[^/]+\/?$/),
      postLink.click(),
    ]);

    // Assert the specific post title h1 (disambiguates from the empty layout h1)
    await expect(
      page.getByRole("heading", { level: 1, name: postTitle }),
    ).toBeVisible();

    // Published/Updated lines (dates are locale-dependent; check labels only)
    await expect(page.getByText(/Published on/i)).toBeVisible();
    await expect(page.getByText(/Updated on/i)).toBeVisible();

    // Optional tags for the post
    const tagLinks = page.locator(".tags a");
    const tagCount = await tagLinks.count();
    if (tagCount > 0) {
      for (let i = 0; i < tagCount; i++) {
        const href = await tagLinks.nth(i).getAttribute("href");
        expect(href, "Tag link should point to /tags/<tag>").toMatch(
          /^\/tags\/[^/]+$/,
        );
      }
    }
  });
});
