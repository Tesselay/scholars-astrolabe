import { test, expect } from "@playwright/test";

test.describe("Tags index page", () => {
  test("renders tag container and tag links (if any)", async ({ page }) => {
    await page.goto("http://localhost:4321/tags");

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
        expect(href, "Tag link should point to /tags/<tag>").toMatch(
          /^\/tags\/[^/]+$/,
        );

        // Optional: text of the link equals the slug part of the href
        const text = (await link.innerText()).trim();
        const slug = href!.split("/").pop();
        expect(text).toBe(slug);
      }
    }
  });
});
