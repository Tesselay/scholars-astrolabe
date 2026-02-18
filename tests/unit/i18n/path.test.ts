import { describe, it, expect } from "vitest";

import "@/utils/routing/routes.ts";
import {
  collapseSlashes,
  ensureLeadingSlash,
  ensureTrailingSlash,
  trimSlashes
} from "@/utils/core/string/normalization.ts";
import { localizePath, neutralizePath, pathsForAllLocales } from "@/utils/i18n/path";
import { locales } from "@/utils/i18n/locales";
import { normalizeFilePath } from "@/utils/core/path/normalization.ts";

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

  describe("neutralizePath", () => {
    it("strips known locale at start", () => {
      expect(neutralizePath("en/about")).toBe("/about/");
      expect(neutralizePath("de/about/me")).toBe("/about/me/");
      expect(neutralizePath("/en/about")).toBe("/about/");
    });

    it("returns '/' if only locale present", () => {
      expect(neutralizePath("en")).toBe("/");
      expect(neutralizePath("/en")).toBe("/");
      expect(neutralizePath("/en/")).toBe("/");
    });

    it("does not strip when first segment is not a locale", () => {
      expect(neutralizePath("xx/about")).toBe("xx/about");
      expect(neutralizePath("/xx/about")).toBe("/xx/about");
    });

    it("normalizes repeated slashes", () => {
      expect(neutralizePath("///en////about///me")).toBe("/about/me/");
      expect(neutralizePath("//en//about")).toBe("/about/");
      expect(neutralizePath("/en//about//")).toBe("/about/");
      expect(neutralizePath("de/////about//")).toBe("/about/");
      expect(neutralizePath("about")).toBe("about");
    });
  });

  it("pathsForAllLocales produces param list for all locales", () => {
    const paths = pathsForAllLocales();
    expect(paths).toHaveLength(locales.length);
    const langs = paths.map((r) => r.params.lang);
    for (const locale of locales) {
      expect(langs).toContain(locale.path);
    }
  });

  it("localizePath prefixes locale and normalizes slashes", () => {
    expect(localizePath("en", "about")).toBe("/en/about/");
    expect(localizePath("en", "/about")).toBe("/en/about/");
    expect(localizePath("de", "///about///me")).toBe("/de/about/me/");
  });

  describe("normalizeFilePath", () => {
    // it("strips locale and ensures leading and trailing slash", () => {
    //   expect(normalizeFilePath("/en/about")).toBe("/about/");
    //   expect(normalizeFilePath("en/about/")).toBe("/about/");
    // });

    it("removes Astro extensions", () => {
      expect(normalizeFilePath("/en/about/index.astro")).toBe("/en/about/");
      expect(normalizeFilePath("/de/blog/index.astro")).toBe("/de/blog/");
      expect(normalizeFilePath("/de/blog/post.astro")).toBe("/de/blog/post/");
    });

    it("collapses repeated slashes", () => {
      expect(normalizeFilePath("///en////about//index.astro")).toBe("/en/about/");
    });
  });
});
