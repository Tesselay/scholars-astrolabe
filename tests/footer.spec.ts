import { test, expect } from "./utils/fixtures.ts";

test.describe("Footer", () => {
  test.beforeEach(async ({ page, defaultLang }) => {
    await page.goto(`/${defaultLang}`);
  });

  test("footer exists", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });
});
