import { describe, it, expect } from "vitest";
import {
  type Locale,
  pathWithLocale,
  stripLangFromUrlOrId,
  altLocalesFor,
  getContentManifest,
} from "@/i18n";
import { getCollection } from "astro:content";

const base = "https://example.com";

describe("Layout SEO links: canonical edge cases", () => {
  it("debug: show blog entries", async () => {
    const posts = await getCollection("blog");
    console.log(
      "blog count:",
      posts.length,
      "ids:",
      posts.map((p) => p.id),
    );
    expect(posts.length).toBeGreaterThan(0);
  });

  it("builds canonical from lang + normalized neutralPath (trailing slash kept)", async () => {
    const lang: Locale = "en";
    const messy = "///en////blog//example";
    const neutralPath = stripLangFromUrlOrId(messy);
    const canonicalUrl = new URL(
      pathWithLocale(lang, String(neutralPath)),
      base,
    ).href;

    expect(canonicalUrl).toBe("https://example.com/en/blog/example");
  });
});

describe("Layout SEO links: alternates edge cases", () => {
  it("includes only locales that actually have the blog post", async () => {
    const manifest = await getContentManifest();
    const current: Locale = "en";
    const neutralPath = stripLangFromUrlOrId("/blog/example");

    const alternates = altLocalesFor(current, String(neutralPath), manifest);
    const hrefs = alternates.map((l) => ({
      hreflang: l,
      href: base + pathWithLocale(l, String(neutralPath)),
    }));

    expect(alternates).toStrictEqual(["de"]);
    expect(hrefs).toStrictEqual([
      { hreflang: "de", href: "https://example.com/de/blog/example" },
    ]);
  });

  it("offers all other locales for dynamic pages (non content-driven)", async () => {
    const manifest = await getContentManifest();
    const current: Locale = "de";
    const neutralPath = stripLangFromUrlOrId("blog"); // dynamic page (/blog)

    const alternates = altLocalesFor(current, String(neutralPath), manifest);
    const hrefs = alternates.map((l) => ({
      hreflang: l,
      href: base + pathWithLocale(l, String(neutralPath)),
    }));

    expect(alternates).toStrictEqual(["en"]);
    expect(hrefs).toStrictEqual([
      { hreflang: "en", href: "https://example.com/en/blog" },
    ]);
  });
});
