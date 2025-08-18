import { test, expect } from "@playwright/test";

test.describe("Tag detail page", () => {
  test("navigates from tag index and shows posts for a tag (if any)", async ({
    page,
  }) => {
    // Discover available tags first
    await page.goto("http://localhost:4321/tags");
    const tagLinks = page.locator(".tags a");
    const count = await tagLinks.count();

    if (count === 0) {
      test.skip(true, "No tags available to test tag detail page.");
    }

    // Go to the first tag page
    const firstLink = tagLinks.first();
    const href = await firstLink.getAttribute("href");
    expect(href, "Tag link should have an href").toBeTruthy();
    await firstLink.click();

    // URL should match /tags/<tag>
    await expect(page).toHaveURL(/\/tags\/[^/]+\/?$/);

    // Extract tag slug from the URL to validate content
    const url = page.url();
    const tagSlug = decodeURIComponent(
      url.replace(/\/+$/, "").split("/").pop()!,
    );

    // Page shows "Posts tagged with {tag}"
    await expect(
      page.getByText(new RegExp(`^\\s*Posts tagged with\\s+${tagSlug}\\s*$`)),
    ).toBeVisible();

    // There should be a list for posts (may be empty)
    const list = page.locator("ul");
    await expect(list.first()).toBeVisible();

    // If there are any post links, ensure they point to /posts/...
    const postLinks = list.first().locator("a");
    const postCount = await postLinks.count();
    if (postCount > 0) {
      for (let i = 0; i < postCount; i++) {
        const postHref = await postLinks.nth(i).getAttribute("href");
        expect(postHref, "Post link should point to /posts/...").toMatch(
          /^\/posts\/[^/]+$/,
        );
      }
    }
  });
});
