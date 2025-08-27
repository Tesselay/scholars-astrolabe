import { test, expect } from "./utils/fixtures.ts";

test.describe("Footer", () => {
  test.beforeEach(async ({ page, to }) => {
    await page.goto(to(""));
  });

  test("footer exists", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });
});
