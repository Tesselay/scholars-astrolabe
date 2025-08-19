import { test, expect } from "@playwright/test";

test.describe("Tags index page", () => {
  test("renders tag container and tag links (if any)", async ({
    page,
  }, testInfo) => {
    const base =
      testInfo.project.use.baseURL ||
      process.env.E2E_BASE_URL ||
      "http://127.0.0.1:4321";
    const url = new URL("/tags", base).toString();

    await page.goto(url);

    // URL should end with /tags
    await expect(page).toHaveURL(/\/tags\/?$/);

    // Tag container is visible
    const container = page.locator(".tags");
    await expect(container).toBeVisible();

    // Links inside the tag container (may be empty if no tags yet)
    const tagLinks = container.locator("a");
    const count = await tagLinks.count();

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const link = tagLinks.nth(i);
        const href = await link.getAttribute("href");

        // Be null-safe before matching
        expect(href, "Tag link should have an href").toBeTruthy();
        expect(href!, "Tag link should point to /tags/<tag>").toMatch(
          /^\/tags\/[^/]+$/,
        );

        // Keep the visual name flexible (avoid enforcing exact slug equality)
        const text = (await link.innerText()).trim();
        expect(
          text.length,
          "Tag link text should not be empty",
        ).toBeGreaterThan(0);
      }
    }
  });
});
