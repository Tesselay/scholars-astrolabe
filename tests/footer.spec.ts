import { test, expect } from "@playwright/test";

test.describe("Footer", () => {
  test("footer exists", async ({ page }) => {
    // Footer presence
    await expect(page.locator("footer")).toBeVisible();
  });
});
