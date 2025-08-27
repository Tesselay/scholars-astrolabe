import { test, expect } from "../utils/fixtures.ts";
import { parseLangAndSlugFromHref, escapeRegExp } from "../utils/url.ts";

test.describe("Blog page", () => {
  test.beforeEach(async ({ page, to }) => {
    await page.goto(to("blog"));
  });

  test("renders heading and post links (localized)", async ({
    page,
    defaultLang,
    manifest,
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
    expect(
      count,
      "Expected at least one post on the blog page",
    ).toBeGreaterThan(0);

    // Quick validation for all links
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

      // Ensure href parses as a blog post URL
      const { lang, slug } = parseLangAndSlugFromHref(page.url(), href!);
      expect(lang.length).toBeGreaterThan(0);
      expect(slug.length).toBeGreaterThan(0);
    }

    // Deep-validate first few links by actual navigation and manifest check
    const deepCount = Math.min(3, count);
    for (let i = 0; i < deepCount; i++) {
      const link = postLinks.nth(i);
      const href = await link.getAttribute("href");
      const { lang, slug } = parseLangAndSlugFromHref(page.url(), href!);

      const target = new URL(href!, page.url());
      const expectedPath = target.pathname.replace(/\/+$/, "");
      await Promise.all([
        page.waitForURL(new RegExp(`${escapeRegExp(expectedPath)}\\/?$`)),
        link.click(),
      ]);

      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      const knownSlugs = manifest.blogSlugsByLang[lang] ?? [];
      expect(
        knownSlugs.includes(slug),
        `Slug not found in manifest for ${lang}/${slug}`,
      ).toBe(true);

      // go back to the blog index
      await page.goBack();
      await expect(page).toHaveURL(path);
    }
  });
});
