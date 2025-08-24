import { test, expect } from "./utils/fixtures.ts";

test.describe("Post page (dynamic route) and BlogPostLayout", () => {
  test.beforeEach(async ({ page, defaultLang }) => {
    await page.goto(`/${defaultLang}/blog`);
    const nav = page.getByRole("list", { name: "Blog Posts" });
    await expect(nav).toBeVisible();

    const postLinks = nav.getByRole("link");
    await expect(postLinks.first()).toBeVisible();

    const count = await postLinks.count();
    test.fail(count === 0, "No posts available to test blog page.");

    const postLinkName = await postLinks.first().innerText();
    const postLinkNameRegex = new RegExp(
      `/${defaultLang}/blog/${postLinkName}/?$`,
      "i",
    );
    await postLinks.first().click();
    await expect(page).toHaveURL(postLinkNameRegex);
  });

  test("Check post header content", async ({ page, defaultLang }) => {
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    const text = (await h1.innerText()).trim();
    expect(text.length).toBeGreaterThan(0);

    await expect(page.getByText(/Published\b/i)).toBeVisible();
    await expect(page.getByText(/Updated\b/i)).toBeVisible();
    await expect(page.locator("time[datetime]")).toHaveCount(2);

    const tagPath = new RegExp(`^/${defaultLang}/tags/.+$`, "i");
    const tagNav = page.getByRole("navigation", { name: "Tags" });
    await expect(tagNav).toBeVisible();
    const tagLinks = tagNav.getByRole("link");
    for (let i = 0, n = await tagLinks.count(); i < n; i++) {
      const href = await tagLinks.nth(i).getAttribute("href");
      expect(href).toBeTruthy();
      expect(href!).toMatch(tagPath);
    }
  });
});
