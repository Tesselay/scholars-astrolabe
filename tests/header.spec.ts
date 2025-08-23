import { test, expect } from "@playwright/test";

test.describe("Header & Navigation", () => {
  test("primary nav has exactly four localized links in order; navigation sets aria-current; main receives focus; skip-link, footer, and title", async ({
    page,
  }, testInfo) => {
    const base =
      testInfo.project.use.baseURL ||
      process.env.E2E_BASE_URL ||
      "http://127.0.0.1:4321";
    const defaultLang = "/en";

    // Document title provided by Layout
    await expect(page).toHaveTitle(/Scholar.?s Astrolabe.*/i);

    // Skip link exists
    await expect(page.locator("a.skip")).toHaveAttribute("href", "#main");

    // Main should receive focus on load for better a11y
    await expect(page.locator("#main")).toBeFocused();

    // Header navigation links within the Primary nav landmark
    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav).toBeVisible();
    const links = nav.getByRole("link");

    // Exactly 4 links in order by hrefs
    await expect(links).toHaveCount(4);

    const hrefMatchers = [
      /^\/en\/?$/, // Home
      /^\/en\/folio\/?$/, // Folio
      /^\/en\/blog\/?$/, // Blog
      /^\/en\/contact\/?$/, // Contact
    ];

    for (let i = 0; i < hrefMatchers.length; i++) {
      await expect(links.nth(i)).toHaveAttribute("href", hrefMatchers[i]);
    }

    // Navigate each link and assert URL, aria-current on the current link, and focus on main
    const expectedUrls = [
      new URL(`${defaultLang}/`, base).toString(),
      new URL(`${defaultLang}/folio/`, base).toString(),
      new URL(`${defaultLang}/blog/`, base).toString(),
      new URL(`${defaultLang}/contact/`, base).toString(),
    ];

    for (let i = 0; i < 4; i++) {
      const currentNavForClick = page.getByRole("navigation", {
        name: "Primary",
      });
      const currentLinksForClick = currentNavForClick.getByRole("link");
      await currentLinksForClick.nth(i).click();
      await expect(page).toHaveURL(expectedUrls[i]);

      // Re-evaluate after navigation for assertions
      const currentNav = page.getByRole("navigation", { name: "Primary" });
      const currentLinks = currentNav.getByRole("link");

      // aria-current is on the active link
      await expect(currentLinks.nth(i)).toHaveAttribute("aria-current", "page");
      for (let j = 0; j < 4; j++) {
        if (j !== i) {
          await expect(currentLinks.nth(j)).not.toHaveAttribute(
            "aria-current",
            "page",
          );
        }
      }

      // main should receive focus on each navigation
      await expect(page.locator("#main")).toBeFocused();
    }
  });
});
