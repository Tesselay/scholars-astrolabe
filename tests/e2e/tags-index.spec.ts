import { test, expect } from "../utils/fixtures.ts";

test.describe("Tags index page", () => {
  test.beforeEach(async ({ page, to }) => {
    await page.goto(to("tags"));
  });

  test("renders tag container and localized tag links (supports hierarchy)", async ({
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

    for (let i = 0; i < count; i++) {
      const link = tagLinks.nth(i);
      await expect(link).toBeVisible();

      const href = await link.getAttribute("href");
      const text = (await link.innerText()).trim();

      expect(text.length, "Tag link text should not be empty").toBeGreaterThan(
        0,
      );
      expect(href, "Tag link should have an href").toBeTruthy();

      const encoded = text
        .replace(/^\/+|\/+$/g, "")
        .split("/")
        .map((seg) => encodeURIComponent(seg))
        .join("/");

      const tagPageRegex = new RegExp(
        `^/${defaultLang}/tags/${encoded}/?$`,
        "i",
      );
      expect(href!, "Tag link should point to /en/tags/<path>").toMatch(
        tagPageRegex,
      );
    }
  });
});
