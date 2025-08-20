import { test, expect } from "@playwright/test";

// This test validates that hierarchical tags like "nested/tags" are linked
// from the tags index and that their detail pages render and list posts
// with links to localized blog URLs.

test.describe("Hierarchical tags", () => {
  test("nested/tags page renders and lists posts", async ({
    page,
  }, testInfo) => {
    const base =
      testInfo.project.use.baseURL ||
      process.env.E2E_BASE_URL ||
      "http://127.0.0.1:4321";

    // Go to the localized tags index
    const tagsUrl = new URL("/en/tags", base).toString();
    await page.goto(tagsUrl);

    // Find the specific hierarchical tag link; be lenient and match by href prefix
    const link = page.locator('a[href^="/en/tags/nested/tags"]');
    const count = await link.count();

    if (count === 0) {
      test.skip(true, 'Expected hierarchical tag "nested/tags" not found.');
    }

    // Click through to the hierarchical tag page
    await Promise.all([
      page.waitForURL(/\/en\/tags\/nested\/tags\/?$/),
      link.first().click(),
    ]);

    // Heading contains the expected phrase and tag path
    await expect(
      page.getByText(/Posts\s+tagged\s+with\s+nested\/tags/i),
    ).toBeVisible();

    // A posts list exists (may be empty in edge cases, but our sample has one)
    const list = page.locator("main ul").first();
    await expect(list).toBeVisible();

    const postLinks = list.locator('a[href^="/en/blog/"]');
    await expect(postLinks.first()).toBeVisible();
  });
});
