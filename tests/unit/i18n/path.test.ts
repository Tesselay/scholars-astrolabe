import { describe, it, expect } from "vitest";

import {
  collapseSlashes,
  ensureLeadingSlash,
  ensureTrailingSlash,
  trimSlashes
} from "&utils/core/string/normalization.ts";
import { locales } from "&utils/core/i18n/locale/definition.ts";
import { pathsForAllLocales } from "&utils/compositional/content/filter.ts";
import { localizeUrlPath, neutralizeUrlPath } from "&utils/compositional/routing/url.ts";

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

  describe("neutralizeUrlPath", () => {
    it("strips known locale at start", () => {
      expect(neutralizeUrlPath("en/about")).toBe("/about/");
      expect(neutralizeUrlPath("de/about/me")).toBe("/about/me/");
      expect(neutralizeUrlPath("/en/about")).toBe("/about/");
    });

    it("returns '/' if only locale present", () => {
      expect(neutralizeUrlPath("en")).toBe("/");
      expect(neutralizeUrlPath("/en")).toBe("/");
      expect(neutralizeUrlPath("/en/")).toBe("/");
    });

    it("does not strip when first segment is not a locale", () => {
      expect(neutralizeUrlPath("xx/about")).toBe("xx/about");
      expect(neutralizeUrlPath("/xx/about")).toBe("/xx/about");
    });

    it("normalizes repeated slashes", () => {
      expect(neutralizeUrlPath("///en////about///me")).toBe("/about/me/");
      expect(neutralizeUrlPath("//en//about")).toBe("/about/");
      expect(neutralizeUrlPath("/en//about//")).toBe("/about/");
      expect(neutralizeUrlPath("de/////about//")).toBe("/about/");
      expect(neutralizeUrlPath("about")).toBe("about");
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

  it("localizeUrlPath prefixes locale and normalizes slashes", () => {
    expect(localizeUrlPath("en", "about")).toBe("/en/about/");
    expect(localizeUrlPath("en", "/about")).toBe("/en/about/");
    expect(localizeUrlPath("de", "///about///me")).toBe("/de/about/me/");
  });
});
