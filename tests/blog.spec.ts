import { test, expect } from "./utils/fixtures.ts";

test.describe("Blog page", () => {
  test.beforeEach(async ({ page, defaultLang }) => {
    await page.goto(`/${defaultLang}/blog`);
  });

  test("renders heading and post links (localized)", async ({
    page,
    defaultLang,
  }) => {
    const path = new RegExp(`/${defaultLang}/blog/?$`, "i");
    await expect(page).toHaveURL(path);

    await expect(page).toHaveTitle(/Scholar.?s Astrolabe.*/i);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const nav = page.getByRole("list", { name: "Blog Posts" });
    await expect(nav).toBeVisible();

    const postLinks = nav.getByRole("link");
    await expect(postLinks.first()).toBeVisible();

    const count = await postLinks.count();
    test.fail(count === 0, "No posts available to test blog page.");

    for (let i = 0; i < count; i++) {
      const link = postLinks.nth(i);
      await expect(link).toBeVisible();

      const href = await link.getAttribute("href");
      const text = (await link.innerText()).trim();

      expect(
        text.length,
        "Post link title should not be empty",
      ).toBeGreaterThan(0);
      expect(href, "Post link should have an href").toBeTruthy();

      const postNameRegex = new RegExp(`^/${defaultLang}/blog/${text}/?$`, "i");
      expect(
        href!,
        `Post link should point to /${defaultLang}/blog/<path>`,
      ).toMatch(postNameRegex);
    }
  });
});
