import { describe, it, expect } from "vitest";
import * as i18n from "@/i18n";

describe("i18n utils - path normalization", () => {
  it("collapseSlashes should collapse duplicate slashes", () => {
    expect(i18n.collapseSlashes("")).toBe("");
    expect(i18n.collapseSlashes("/a//b///c")).toBe("/a/b/c");
    expect(i18n.collapseSlashes("//")).toBe("/");
    expect(i18n.collapseSlashes("///a////")).toBe("/a/");
    expect(i18n.collapseSlashes("///b")).toBe("/b");
  });

  it("trimSlashes should trim leading and trailing slashes", () => {
    expect(i18n.trimSlashes("/a/b/")).toBe("a/b");
    expect(i18n.trimSlashes("a/b")).toBe("a/b");
    expect(i18n.trimSlashes("///a///")).toBe("a");
  });

  it("ensureLeadingSlash should add a leading slash and collapse duplicates", () => {
    expect(i18n.ensureLeadingSlash("a/b")).toBe("/a/b");
    expect(i18n.ensureLeadingSlash("/a/b")).toBe("/a/b");
    expect(i18n.ensureLeadingSlash("///a//b")).toBe("/a/b");
  });

  it("ensureTrailingSlash should add a trailing slash if missing", () => {
    expect(i18n.ensureTrailingSlash("/a/b")).toBe("/a/b/");
    expect(i18n.ensureTrailingSlash("/a/b/")).toBe("/a/b/");
  });

  it("normalizeNeutralPath should strip lang, *.astro and ensure trailing slash", () => {
    expect(i18n.normalizeNeutralPath("/en/about/index.astro")).toBe("/about/");
    expect(i18n.normalizeNeutralPath("en/about.astro")).toBe("/about/");
    expect(i18n.normalizeNeutralPath("en/about")).toBe("/about/");
    expect(i18n.normalizeNeutralPath("/en//about///index.astro")).toBe(
      "/about/",
    );
  });
});

describe("i18n utils - locales and detection", () => {
  it("getAllLocales returns supported locales", () => {
    expect(i18n.getAllLocales()).toEqual([...i18n.locales]);
  });

  it("getLangFromUrl returns supported locale or default", () => {
    const en = i18n.getLangFromUrl(new URL("https://example.com/en/blog/x"));
    const de = i18n.getLangFromUrl(new URL("https://example.com/de/"));
    const fallback = i18n.getLangFromUrl(
      new URL("https://example.com/fr/whatever"),
    );
    expect(en).toBe("en");
    expect(de).toBe("de");
    expect(fallback).toBe(i18n.defaultLocale);
  });

  it("getAlternateLocales returns all except current", () => {
    const enAlts = i18n.getAlternateLocales(new URL("https://example.com/en/"));
    const deAlts = i18n.getAlternateLocales(new URL("https://example.com/de/"));
    expect(enAlts).toEqual(i18n.locales.filter((l) => l !== "en"));
    expect(deAlts).toEqual(i18n.locales.filter((l) => l !== "de"));
  });
});

describe("i18n utils - lang stripping", () => {
  it("stripLangFromUrlOrId handles common cases", () => {
    expect(i18n.stripLangFromUrlOrId("en/foo")).toBe("foo");
    expect(i18n.stripLangFromUrlOrId("de/foo/bar")).toBe("foo/bar");
    expect(i18n.stripLangFromUrlOrId("/en/foo")).toBe("/foo");
    expect(i18n.stripLangFromUrlOrId("/de")).toBe("/");
  });

  it("stripLangFromUrlOrId returns unchanged for non-locale first segment", () => {
    expect(i18n.stripLangFromUrlOrId("fr/foo")).toBe("fr/foo");
    expect(i18n.stripLangFromUrlOrId("/xx/foo")).toBe("/xx/foo");
  });

  it("stripLangFromUrlOrId with double-leading slashes currently returns unchanged", () => {
    expect(i18n.stripLangFromUrlOrId("//en//foo")).toBe("/foo");
    expect(i18n.stripLangFromUrlOrId("/en//foo//")).toBe("/foo/");
    expect(i18n.stripLangFromUrlOrId("de/////foo//")).toBe("foo/");
    expect(i18n.stripLangFromUrlOrId("foo")).toBe("foo");
  });

  it("stripLangFromUrlOrId edge of only locale segment", () => {
    expect(i18n.stripLangFromUrlOrId("en")).toBe("/");
    expect(i18n.stripLangFromUrlOrId("/en")).toBe("/");
    expect(i18n.stripLangFromUrlOrId("en/")).toBe("/");
  });
});

describe("i18n utils - path builders", () => {
  it("pathWithLocale prefixes path correctly", () => {
    expect(i18n.pathWithLocale("en" as i18n.Locale, "/about")).toBe(
      "/en/about",
    );
    expect(i18n.pathWithLocale("de" as i18n.Locale, "about")).toBe("/de/about");
    expect(i18n.pathWithLocale("en" as i18n.Locale, "//about//")).toBe(
      "/en/about/",
    );
  });

  it("buildBlogPostPath builds localized blog paths from IDs or slugs", () => {
    expect(i18n.buildBlogPostPath("en" as i18n.Locale, "en/foo")).toBe(
      "/en/blog/foo",
    );
    expect(i18n.buildBlogPostPath("de" as i18n.Locale, "en/foo")).toBe(
      "/de/blog/foo",
    );
    expect(i18n.buildBlogPostPath("en" as i18n.Locale, "/en/foo")).toBe(
      "/en/blog/foo",
    );
    expect(i18n.buildBlogPostPath("de" as i18n.Locale, "foo")).toBe(
      "/de/blog/foo",
    );
  });

  it("encodeTagPath encodes segments without losing hierarchy", () => {
    expect(i18n.encodeTagPath("programming/javascript")).toBe(
      "programming/javascript",
    );
    expect(i18n.encodeTagPath("C# .NET")).toBe("C%23%20.NET");
    expect(i18n.encodeTagPath("data science/python")).toBe(
      "data%20science/python",
    );
    expect(i18n.encodeTagPath("データ/科学")).toBe(
      "%E3%83%87%E3%83%BC%E3%82%BF/%E7%A7%91%E5%AD%A6",
    );
  });

  it("buildTagPath builds localized tag URLs with encoding", () => {
    expect(
      i18n.buildTagPath("en" as i18n.Locale, "programming/javascript"),
    ).toBe("/en/tags/programming/javascript");
    expect(i18n.buildTagPath("de" as i18n.Locale, "C# .NET")).toBe(
      "/de/tags/C%23%20.NET",
    );
    expect(i18n.buildTagPath("en" as i18n.Locale, "データ/科学")).toBe(
      "/en/tags/%E3%83%87%E3%83%BC%E3%82%BF/%E7%A7%91%E5%AD%A6",
    );
  });
});
