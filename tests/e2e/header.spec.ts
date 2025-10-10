import { test, expect } from "../utils/fixtures.ts";

test.describe("Header & NavigationLink", () => {
  test.beforeEach(async ({ page, to }) => {
    await page.goto(to(""));
  });

  test("document title, skip link and main focus", async ({ page }) => {
    await expect(page).toHaveTitle(/Scholar.?s Astrolabe.*/i);
    await expect(page.locator("a.skip")).toHaveAttribute("href", "#main");
    await expect(page.locator("#main")).toBeFocused();
  });

  test("primary nav is visible and has exactly 4 localized links in order", async ({
    page,
    defaultLang
  }) => {
    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav).toBeVisible();
    const links = nav.getByRole("link");
    await expect(links).toHaveCount(4);

    const hrefMatchers = [
      new RegExp(`^/${defaultLang}/?$`, "i"),
      new RegExp(`^/${defaultLang}/folio/?$`, "i"),
      new RegExp(`^/${defaultLang}/blog/?$`, "i"),
      new RegExp(`^/${defaultLang}/contact/?$`, "i")
    ];

    for (let i = 0; i < hrefMatchers.length; i++) {
      await expect(links.nth(i)).toHaveAttribute("href", hrefMatchers[i]);
    }
  });

  test("navigating each link updates URL and aria-current; main receives focus", async ({
    page,
    to
  }) => {
    const expected = [to(""), to("folio/"), to("blog/"), to("contact/")];

    for (let i = 0; i < 4; i++) {
      const nav = page.getByRole("navigation", { name: "Primary" });
      const links = nav.getByRole("link");
      await links.nth(i).click();
      await expect(page).toHaveURL(expected[i]);

      const currentNav = page.getByRole("navigation", { name: "Primary" });
      const currentLinks = currentNav.getByRole("link");
      await expect(currentLinks.nth(i)).toHaveAttribute("aria-current", "page");

      for (let j = 0; j < 4; j++) {
        if (j !== i) {
          await expect(currentLinks.nth(j)).not.toHaveAttribute("aria-current", "page");
        }
      }

      await expect(page.locator("#main")).toBeFocused();
    }
  });
});
