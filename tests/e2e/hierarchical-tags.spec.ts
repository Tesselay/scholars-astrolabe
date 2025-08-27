import { test, expect } from "../utils/fixtures.ts";

test.describe("Hierarchical tags", () => {
  test.beforeEach(async ({ page, to }) => {
    await page.goto(to("tags"));
  });

  test("nested/tags page renders and lists posts", async ({
    page,
    defaultLang,
  }) => {
    const tagNav = page.getByRole("navigation", { name: "Tags" });
    const tagLinks = tagNav.getByRole("link");

    const hierarchicalText =
      /(^|[#\s])[A-Za-z0-9][A-Za-z0-9-]*\/[A-Za-z0-9][A-Za-z0-9-]*(?:\/[A-Za-z0-9][A-Za-z0-9-]*)*/i;
    const nestedTag = tagLinks.filter({ hasText: hierarchicalText });

    const count = await nestedTag.count();
    expect(
      count,
      "Expected at least one hierarchical tag link on the tags index",
    ).toBeGreaterThan(0);

    const firstTag = nestedTag.first();
    const tagText = (await firstTag.innerText()).trim();
    const plainTag = tagText.replace(/^#\s*/, "");

    await firstTag.click();

    const urlSuffix = new RegExp(
      `/${defaultLang}/tags/${plainTag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:$|[?#])`,
      "i",
    );
    await expect(page).toHaveURL(urlSuffix);

    await expect(
      page.getByText(
        new RegExp(
          `\\b${plainTag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
          "i",
        ),
      ),
    ).toBeVisible();

    const postsNav = page.getByRole("list", { name: "Tagged Posts" });
    await expect(postsNav).toBeVisible();

    const postLinks = postsNav.locator(`a[href^="/${defaultLang}/blog/"]`);
    await expect(postLinks.first()).toBeVisible();
  });
});
