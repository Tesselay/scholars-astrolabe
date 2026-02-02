import { test, expect } from "../utils/fixtures.ts";
import { parseLangAndSlugFromHref, escapeRegExp, tagPathFromUrl } from "../utils/url.ts";

test.describe("Tag detail page", () => {
  test.beforeEach(async ({ page, to }) => {
    await page.goto(to("tags"));
  });

  test("navigates from tag index and shows posts for a tag (hierarchy supported)", async ({
    page,
    defaultLang,
    manifest
  }) => {
    const indexPath = new RegExp(`/${defaultLang}/tags/?$`, "i");
    await expect(page).toHaveURL(indexPath);

    const tagNav = page.getByRole("navigation", { name: "Tags" });
    await expect(tagNav).toBeVisible();

    const tagLinks = tagNav.getByRole("link");
    const tagCount = await tagLinks.count();
    expect(tagCount, "Expected at least one tag on the tags index page").toBeGreaterThan(0);

    const firstLink = tagLinks.first();
    const href = await firstLink.getAttribute("href");
    expect(href, "Tag link should have an href").toBeTruthy();

    await firstLink.click();

    const tagPath = decodeURIComponent(tagPathFromUrl(page.url(), defaultLang));

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    const h1Text = (await h1.innerText()).trim();
    expect(h1Text).toMatch(new RegExp(`${escapeRegExp(tagPath.replace("/", ""))}`));

    const postsNav = page.getByRole("list", { name: "Tagged Posts" });
    await expect(postsNav).toBeVisible();

    const postLinks = postsNav.getByRole("link");
    const postCount = await postLinks.count();
    expect(postCount, "Expected at least one post listed for the tag").toBeGreaterThan(0);

    // Quick validation for all listed post links
    for (let i = 0; i < postCount; i++) {
      const link = postLinks.nth(i);
      await expect(link).toBeVisible();
      const postHref = await link.getAttribute("href");
      const text = (await link.innerText()).trim();
      expect(text.length, "Post link title should not be empty").toBeGreaterThan(0);
      expect(postHref, "Post link should have an href").toBeTruthy();

      const { lang, slug } = parseLangAndSlugFromHref(page.url(), postHref!);
      expect(lang.length).toBeGreaterThan(0);
      expect(slug.length).toBeGreaterThan(0);
    }

    // Deep-validate first few posts by navigating and checking manifest
    const deepCount = Math.min(3, postCount);
    for (let i = 0; i < deepCount; i++) {
      const link = postLinks.nth(i);
      const postHref = await link.getAttribute("href");
      const { lang, slug } = parseLangAndSlugFromHref(page.url(), postHref!);

      const target = new URL(postHref!, page.url());
      const expectedPath = target.pathname.replace(/\/+$/, "");
      await Promise.all([
        page.waitForURL(new RegExp(`${escapeRegExp(expectedPath)}\\/?$`)),
        link.click()
      ]);

      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      const knownSlugs = manifest.blogSlugsByLang[lang] ?? [];
      expect(knownSlugs.includes(slug), `Slug not found in manifest for ${lang}/${slug}`).toBe(
        true
      );

      // Go back to the tag page and ensure we are still on the same tag
      await page.goBack();
      const backTagPath = tagPathFromUrl(page.url(), defaultLang);
      expect(decodeURIComponent(backTagPath)).toBe(tagPath);
    }
  });
});
