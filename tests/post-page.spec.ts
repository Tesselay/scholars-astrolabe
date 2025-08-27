import { test, expect } from "./utils/fixtures.ts";

function parseLangAndSlugFromHref(baseUrl: string, href: string) {
  const url = new URL(href, baseUrl);
  const parts = url.pathname.replace(/^\/+|\/+$/g, "").split("/");
  if (parts.length < 3 || parts[1] !== "blog") {
    throw new Error(`Unexpected blog URL structure: ${url.pathname}`);
  }
  return { lang: parts[0], slug: parts.slice(2).join("/") };
}

function normalize(s: string) {
  return s.replace(/\s+/g, " ").trim().toLowerCase();
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

test.describe("Post page (dynamic route) and BlogPostLayout", () => {
  test.beforeEach(async ({ page, defaultLang }) => {
    await page.goto(`/${defaultLang}/blog`);
    const nav = page.getByRole("list", { name: "Blog Posts" });
    await expect(nav).toBeVisible();

    const postLinks = nav.getByRole("link");
    await expect(postLinks.first()).toBeVisible();

    const count = await postLinks.count();
    test.fail(count === 0, "No posts available to test blog page.");

    const link = postLinks.first();
    await expect(link).toBeVisible();

    const href = await link.getAttribute("href");
    const text = (await link.innerText()).trim();

    expect(text.length, "Post link title should not be empty").toBeGreaterThan(
      0,
    );
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

    await page.goto(absolute);
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    const h1Text = (await h1.innerText()).trim();
    expect(normalize(h1Text)).toBe(normalize(text));
  });

  test("Check post header content", async ({ page, defaultLang }) => {
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
    for (let i = 0, n = await tagLinks.count(); i < n; i++) {
      const href = await tagLinks.nth(i).getAttribute("href");
      expect(href).toBeTruthy();
      expect(href!).toMatch(tagPath);
    }
  });
});
