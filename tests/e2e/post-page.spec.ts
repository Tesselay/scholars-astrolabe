import { test, expect } from "../utils/fixtures.ts";

test.describe("Post page (dynamic route) and BlogPostLayout", () => {
  test.beforeEach(async ({ page, to }) => {
    await page.goto(to("blog/example"));
  });

  test("renders post and header content", async ({ page, defaultLang }) => {
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
    const n = await tagLinks.count();
    for (let i = 0; i < n; i++) {
      const href = await tagLinks.nth(i).getAttribute("href");
      expect(href).toBeTruthy();
      expect(href!).toMatch(tagPath);
    }
  });
});
