import { test, expect } from "./utils/fixtures.ts";

function parseLangAndSlugFromHref(baseUrl: string, href: string) {
  const url = new URL(href, baseUrl);
  const parts = url.pathname.replace(/^\/+|\/+$/g, "").split("/");
  if (parts.length < 3 || parts[1] !== "blog") {
    throw new Error(`Unexpected blog URL structure: ${url.pathname}`);
  }
  return { lang: parts[0], slug: parts.slice(2).join("/") };
}

type ContentManifest = {
  blogSlugsByLang: Record<string, string[]>;
};

let manifest: ContentManifest;

test.beforeAll(async ({ request }) => {
  const resp = await request.get("/api/content-manifest.json");
  expect(resp.ok()).toBeTruthy();
  manifest = await resp.json();
});

test.describe("Blog page", () => {
  test.beforeEach(async ({ page, defaultLang }) => {
    await page.goto(`/${defaultLang}/blog`);
  });

  test("renders heading and post links (localized)", async ({
    page,
    defaultLang,
  }) => {
    const path = new RegExp(`/${defaultLang}/blog/?$`, "i");
    await expect(page).toHaveURL(path);

    await expect(page).toHaveTitle(/Scholar.?s Astrolabe.*/i);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const nav = page.getByRole("list", { name: "Blog Posts" });
    await expect(nav).toBeVisible();

    const postLinks = nav.getByRole("link");
    await expect(postLinks.first()).toBeVisible();

    const count = await postLinks.count();
    test.fail(count === 0, "No posts available to test blog page.");

    for (let i = 0; i < count; i++) {
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
