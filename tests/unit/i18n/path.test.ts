import { describe, it, expect } from "vitest";
import {
  collapseSlashes,
  trimSlashes,
  ensureLeadingSlash,
  ensureTrailingSlash,
  stripLangFromUrlOrId,
  pathsForAllLocales,
  pathWithLocale,
  normalizeNeutralPath,
  locales,
  type Locale
} from "@/utils";

describe("path common", () => {
  it("collapseSlashes", () => {
    expect(collapseSlashes("")).toBe("");
    expect(collapseSlashes("/a//b///c")).toBe("/a/b/c");
    expect(collapseSlashes("//")).toBe("/");
    expect(collapseSlashes("///a////")).toBe("/a/");
    expect(collapseSlashes("///b")).toBe("/b");
  });

  it("trimSlashes", () => {
    expect(trimSlashes("/a/b/")).toBe("a/b");
    expect(trimSlashes("///a//b///")).toBe("a//b");
    expect(trimSlashes("a/b")).toBe("a/b");
    expect(trimSlashes("///a///")).toBe("a");
  });

  it("ensureLeadingSlash", () => {
    expect(ensureLeadingSlash("a/b")).toBe("/a/b");
    expect(ensureLeadingSlash("/a/b")).toBe("/a/b");
    expect(ensureLeadingSlash("///a/b")).toBe("/a/b");
    expect(ensureLeadingSlash("///a//b")).toBe("/a/b");
  });

  it("ensureTrailingSlash", () => {
    expect(ensureTrailingSlash("/a/b")).toBe("/a/b/");
    expect(ensureTrailingSlash("/a/b/")).toBe("/a/b/");
  });

  describe("stripLangFromUrlOrId", () => {
    it("strips known locale at start", () => {
      expect(stripLangFromUrlOrId("en/about")).toBe("about");
      expect(stripLangFromUrlOrId("de/about/me")).toBe("about/me");
      expect(stripLangFromUrlOrId("/en/about")).toBe("/about");
    });

    it("returns '/' if only locale present", () => {
      expect(stripLangFromUrlOrId("en")).toBe("/");
      expect(stripLangFromUrlOrId("/en")).toBe("/");
      expect(stripLangFromUrlOrId("/en/")).toBe("/");
    });

    it("does not strip when first segment is not a locale", () => {
      expect(stripLangFromUrlOrId("xx/about")).toBe("xx/about");
      expect(stripLangFromUrlOrId("/xx/about")).toBe("/xx/about");
    });

    it("normalizes repeated slashes", () => {
      expect(stripLangFromUrlOrId("///en////about///me")).toBe("/about/me");
      expect(stripLangFromUrlOrId("//en//about")).toBe("/about");
      expect(stripLangFromUrlOrId("/en//about//")).toBe("/about/");
      expect(stripLangFromUrlOrId("de/////about//")).toBe("about/");
      expect(stripLangFromUrlOrId("about")).toBe("about");
    });
  });

  it("pathsForAllLocales produces param list for all locales", () => {
    const res = pathsForAllLocales();
    expect(res).toHaveLength(locales.length);
    const langs = res.map((r) => r.params.lang);
    for (const l of locales as readonly Locale[]) {
      expect(langs).toContain(l);
    }
  });

  it("pathWithLocale prefixes locale and normalizes slashes", () => {
    expect(pathWithLocale("en", "about")).toBe("/en/about");
    expect(pathWithLocale("en", "/about")).toBe("/en/about");
    expect(pathWithLocale("de", "///about///me")).toBe("/de/about/me");
  });

  describe("normalizeNeutralPath", () => {
    it("strips locale and ensures leading and trailing slash", () => {
      expect(normalizeNeutralPath("/en/about")).toBe("/about/");
      expect(normalizeNeutralPath("en/about/")).toBe("/about/");
    });

    it("removes Astro extensions", () => {
      expect(normalizeNeutralPath("/en/about/index.astro")).toBe("/about/");
      expect(normalizeNeutralPath("/de/blog/index.astro")).toBe("/blog/");
      expect(normalizeNeutralPath("/de/blog/post.astro")).toBe("/blog/post/");
    });

    it("collapses repeated slashes", () => {
      expect(normalizeNeutralPath("///en////about//index.astro")).toBe("/about/");
    });
  });
});
