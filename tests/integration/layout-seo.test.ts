import { describe, it, expect } from "vitest";
import {
  localizePath,
  neutralizePath,
  altLocalesFor,
  getContentManifest,
  type LocalePath
} from "@/utils";

const base = "https://example.com";

describe("Layout SEO links: canonical edge cases", () => {
  it("builds canonical from lang + normalized neutralPath (trailing slash kept)", async () => {
    const lang: LocalePath = "en";
    const messy = "///en////blog//example";
    const neutralPath = neutralizePath(messy);
    const canonicalUrl = new URL(localizePath(lang, String(neutralPath)), base).href;

    expect(canonicalUrl).toBe("https://example.com/en/blog/example/");
  });
});

describe("Layout SEO links: alternates edge cases", () => {
  it("includes only locales that actually have the blog post", async () => {
    const manifest = await getContentManifest();
    const current: LocalePath = "en";
    const neutralPath = neutralizePath("/blog/example2");

    const alternates = altLocalesFor(current, String(neutralPath), manifest);
    const hrefs = alternates.map((l) => ({
      hreflang: l,
      href: base + localizePath(l, String(neutralPath))
    }));

    expect(alternates).toStrictEqual([]);
    expect(hrefs).toStrictEqual([]);
  });

  it("offers all other locales for dynamic pages (non content-driven)", async () => {
    const manifest = await getContentManifest();
    const current: LocalePath = "de";
    const neutralPath = neutralizePath("blog");

    const alternates = altLocalesFor(current, neutralPath, manifest);

    const hrefs = alternates.map((l) => ({
      hreflang: l,
      href: base + localizePath(l, String(neutralPath))
    }));

    expect(alternates).toStrictEqual(["en"]);
    expect(hrefs).toStrictEqual([{ hreflang: "en", href: "https://example.com/en/blog/" }]);
  });
});
