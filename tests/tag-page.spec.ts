import { test, expect } from "@playwright/test";

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

test.describe("Tag detail page", () => {
  test("navigates from tag index and shows posts for a tag (if any)", async ({
    page,
  }, testInfo) => {
    const base =
      testInfo.project.use.baseURL ||
      process.env.E2E_BASE_URL ||
      "http://127.0.0.1:4321";
    const url = new URL("/tags", base).toString();

    // Discover available tags first
    await page.goto(url);
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
    const urlTagPage = page.url();
    const tagSlug = decodeURIComponent(
      urlTagPage.replace(/\/+$/, "").split("/").pop()!,
    );

    // Page shows "Posts tagged with {tag}" (case-insensitive, escape tag)
    await expect(
      page.getByText(
        new RegExp(`Posts\\s+tagged\\s+with\\s+${escapeRegExp(tagSlug)}`, "i"),
      ),
    ).toBeVisible();

    // There should be a list for posts (may be empty)
    const list = page.locator("main ul").first();
    await expect(list).toBeVisible();

    // If there are any post links, ensure they point to /posts/...
    const postLinks = list.locator('a[href^="/posts/"]');
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
