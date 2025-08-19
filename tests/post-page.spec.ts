import { test, expect } from "@playwright/test";

test.describe("Post page (dynamic route) and BlogPostLayout", () => {
  test("navigates to first post and shows title, dates, and optional tag links", async ({
    page,
  }, testInfo) => {
    const base =
      testInfo.project.use.baseURL ||
      process.env.E2E_BASE_URL ||
      "http://127.0.0.1:4321";
    const url = new URL("/blog", base).toString();

    await page.goto(url);
    const postLink = page.locator('ul a[href^="/posts/"]').first();
    const hasPost = await postLink.count();

    if (hasPost === 0) {
      test.skip(true, "No posts available to test dynamic post page.");
    }

    const postTitle = (await postLink.innerText()).trim();

    await Promise.all([
      page.waitForURL(/\/posts\/[^/]+\/?$/),
      postLink.click(),
    ]);

    await expect(
      page.getByRole("heading", { level: 1, name: postTitle }),
    ).toBeVisible();

    await expect(page.getByText(/Published on/i)).toBeVisible();
    await expect(page.getByText(/Updated on/i)).toBeVisible();

    const tagLinks = page.locator(".tags a");
    const tagCount = await tagLinks.count();
    if (tagCount > 0) {
      for (let i = 0; i < tagCount; i++) {
        const href = await tagLinks.nth(i).getAttribute("href");
        expect(href, "Tag link should have an href").toBeTruthy();
        expect(href!, "Tag link should point to /tags/<tag>").toMatch(
          /^\/tags\/[^/]+$/,
        );
      }
    }
  });
});
