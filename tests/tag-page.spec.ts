import { test, expect } from "./utils/fixtures.ts";

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

test.describe("Tag detail page", () => {
  test.beforeEach(async ({ page, defaultLang }) => {
    await page.goto(`/${defaultLang}/tags`);
  });

  test("navigates from tag index and shows posts for a tag (hierarchy supported)", async ({
    page,
    defaultLang,
  }) => {
    const path = new RegExp(`/${defaultLang}/tags/?$`, "i");
    await expect(page).toHaveURL(path);

    const tagNav = page.getByRole("navigation", { name: "Tags" });
    await expect(tagNav).toBeVisible();

    const tagLinks = tagNav.getByRole("link");
    await expect(tagLinks.first()).toBeVisible();

    const count = await tagLinks.count();
    test.fail(count === 0, "No tags available on the tags index page.");

    const firstLink = tagLinks.first();
    const href = await firstLink.getAttribute("href");
    expect(href, "Tag link should have an href").toBeTruthy();
    await firstLink.click();

    const urlTagPage = page.url().replace(/\/+$/, "");
    const after = urlTagPage.split(path)[1] || "";
    const tagPath = decodeURIComponent(after);

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    const text = (await h1.innerText()).trim();
    expect(text).toMatch(new RegExp(`${escapeRegExp(tagPath)}`));

    const postsNav = page.getByRole("list", { name: "Tagged Posts" });
    await expect(postsNav).toBeVisible();

    const postLinks = postsNav.getByRole("link");
    const postCount = await postLinks.count();
    test.fail(postCount === 0, "No tags available on the tags index page.");

    for (let i = 0; i < postCount; i++) {
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
