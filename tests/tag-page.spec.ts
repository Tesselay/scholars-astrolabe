import { test, expect } from "./utils/fixtures.ts";

function parseLangAndSlugFromHref(baseUrl: string, href: string) {
  const url = new URL(href, baseUrl);
  const parts = url.pathname.replace(/^\/+|\/+$/g, "").split("/");
  if (parts.length < 3 || parts[1] !== "blog") {
    throw new Error(`Unexpected blog URL structure: ${url.pathname}`);
  }
  return { lang: parts[0], slug: parts.slice(2).join("/") };
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

type ContentManifest = {
  blogSlugsByLang: Record<string, string[]>;
};

let manifest: ContentManifest;

test.beforeAll(async ({ request }) => {
  const resp = await request.get("/api/content-manifest.json");
  expect(resp.ok()).toBeTruthy();
  manifest = await resp.json();
});

test.describe("Tag detail page", () => {
  test.beforeEach(async ({ page, defaultLang }) => {
    await page.goto(`/${defaultLang}/tags`);
  });

  test("navigates from tag index and shows posts for a tag (hierarchy supported)", async ({
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

    const firstLink = tagLinks.first();
    const href = await firstLink.getAttribute("href");
    expect(href, "Tag link should have an href").toBeTruthy();
    await firstLink.click();

    const urlTagPage = page.url().replace(/\/+$/, "");
    const after = urlTagPage.split(path)[1] || "";
    const tagPath = decodeURIComponent(after);

    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    const text = (await h1.innerText()).trim();
    expect(text).toMatch(new RegExp(`${escapeRegExp(tagPath)}`));

    const postsNav = page.getByRole("list", { name: "Tagged Posts" });
    await expect(postsNav).toBeVisible();

    const postLinks = postsNav.getByRole("link");
    const postCount = await postLinks.count();
    test.fail(postCount === 0, "No tags available on the tags index page.");

    for (let i = 0; i < postCount; i++) {
      const link = postLinks.nth(i);
      await expect(link).toBeVisible();

      const href = await link.getAttribute("href");
      const text = (await link.innerText()).trim();

      expect(
        text.length,
        "Post link title should not be empty",
      ).toBeGreaterThan(0);
      expect(href, "Post link should have an href").toBeTruthy();

      const absolute = new URL(href!, page.url()).toString();
      let resp = await page.request.head(absolute);
      if (resp.status() === 405) resp = await page.request.get(absolute);
      expect(resp.ok(), `Link ${href} should resolve with 2xx`).toBeTruthy();

      const { lang, slug } = parseLangAndSlugFromHref(page.url(), href!);
      const knownSlugs = manifest.blogSlugsByLang[lang] ?? [];
      expect(
        knownSlugs.includes(slug),
        `Slug not found in manifest for ${lang}/${slug}`,
      ).toBe(true);
    }
  });
});
