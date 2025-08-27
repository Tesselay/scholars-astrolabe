import { describe, it, expect } from "vitest";
import {
  collapseSlashes,
  trimSlashes,
  ensureLeadingSlash,
  ensureTrailingSlash,
  normalizeNeutralPath,
  getLangFromUrl,
  getAllLocales,
  getAlternateLocales,
  stripLangFromUrlOrId,
  buildBlogPostPath,
  encodeTagPath,
  buildTagPath,
  pathWithLocale,
} from "../../../src/i18n/utils";
import { locales, defaultLocale, type Locale } from "../../../src/i18n/locales";

describe("i18n utils - path normalization", () => {
  it("collapseSlashes should collapse duplicate slashes", () => {
    expect(collapseSlashes("")).toBe("");
    expect(collapseSlashes("/a//b///c")).toBe("/a/b/c");
    expect(collapseSlashes("//")).toBe("/");
    expect(collapseSlashes("///a////")).toBe("/a/");
    expect(collapseSlashes("///b")).toBe("/b");
  });

  it("trimSlashes should trim leading and trailing slashes", () => {
    expect(trimSlashes("/a/b/")).toBe("a/b");
    expect(trimSlashes("a/b")).toBe("a/b");
    expect(trimSlashes("///a///")).toBe("a");
  });

  it("ensureLeadingSlash should add a leading slash and collapse duplicates", () => {
    expect(ensureLeadingSlash("a/b")).toBe("/a/b");
    expect(ensureLeadingSlash("/a/b")).toBe("/a/b");
    expect(ensureLeadingSlash("///a//b")).toBe("/a/b");
  });

  it("ensureTrailingSlash should add a trailing slash if missing", () => {
    expect(ensureTrailingSlash("/a/b")).toBe("/a/b/");
    expect(ensureTrailingSlash("/a/b/")).toBe("/a/b/");
  });

  it("normalizeNeutralPath should strip lang, *.astro and ensure trailing slash", () => {
    expect(normalizeNeutralPath("/en/about/index.astro")).toBe("/about/");
    expect(normalizeNeutralPath("en/about.astro")).toBe("/about/");
    expect(normalizeNeutralPath("en/about")).toBe("/about/");
    expect(normalizeNeutralPath("/en//about///index.astro")).toBe("/about/");
  });
});

describe("i18n utils - locales and detection", () => {
  it("getAllLocales returns supported locales", () => {
    expect(getAllLocales()).toEqual([...locales]);
  });

  it("getLangFromUrl returns supported locale or default", () => {
    const en = getLangFromUrl(new URL("https://example.com/en/blog/x"));
    const de = getLangFromUrl(new URL("https://example.com/de/"));
    const fallback = getLangFromUrl(new URL("https://example.com/fr/whatever"));
    expect(en).toBe("en");
    expect(de).toBe("de");
    expect(fallback).toBe(defaultLocale);
  });

  it("getAlternateLocales returns all except current", () => {
    const enAlts = getAlternateLocales(new URL("https://example.com/en/"));
    const deAlts = getAlternateLocales(new URL("https://example.com/de/"));
    expect(enAlts).toEqual(locales.filter((l) => l !== "en"));
    expect(deAlts).toEqual(locales.filter((l) => l !== "de"));
  });
});

describe("i18n utils - lang stripping", () => {
  it("stripLangFromUrlOrId handles common cases", () => {
    expect(stripLangFromUrlOrId("en/foo")).toBe("foo");
    expect(stripLangFromUrlOrId("de/foo/bar")).toBe("foo/bar");
    expect(stripLangFromUrlOrId("/en/foo")).toBe("/foo");
    expect(stripLangFromUrlOrId("/de")).toBe("/");
  });

  it("stripLangFromUrlOrId returns unchanged for non-locale first segment", () => {
    expect(stripLangFromUrlOrId("fr/foo")).toBe("fr/foo");
    expect(stripLangFromUrlOrId("/xx/foo")).toBe("/xx/foo");
  });

  it("stripLangFromUrlOrId with double-leading slashes currently returns unchanged", () => {
    expect(stripLangFromUrlOrId("//en//foo")).toBe("/foo");
    expect(stripLangFromUrlOrId("/en//foo//")).toBe("/foo/");
    expect(stripLangFromUrlOrId("de/////foo//")).toBe("foo/");
    expect(stripLangFromUrlOrId("foo")).toBe("foo");
  });

  it("stripLangFromUrlOrId edge of only locale segment", () => {
    expect(stripLangFromUrlOrId("en")).toBe("/");
    expect(stripLangFromUrlOrId("/en")).toBe("/");
    expect(stripLangFromUrlOrId("en/")).toBe("/");
  });
});

describe("i18n utils - path builders", () => {
  it("pathWithLocale prefixes path correctly", () => {
    expect(pathWithLocale("en" as Locale, "/about")).toBe("/en/about");
    expect(pathWithLocale("de" as Locale, "about")).toBe("/de/about");
    expect(pathWithLocale("en" as Locale, "//about//")).toBe("/en/about/");
  });

  it("buildBlogPostPath builds localized blog paths from IDs or slugs", () => {
    expect(buildBlogPostPath("en" as Locale, "en/foo")).toBe("/en/blog/foo");
    expect(buildBlogPostPath("de" as Locale, "en/foo")).toBe("/de/blog/foo");
    expect(buildBlogPostPath("en" as Locale, "/en/foo")).toBe("/en/blog/foo");
    expect(buildBlogPostPath("de" as Locale, "foo")).toBe("/de/blog/foo");
  });

  it("encodeTagPath encodes segments without losing hierarchy", () => {
    expect(encodeTagPath("programming/javascript")).toBe(
      "programming/javascript",
    );
    expect(encodeTagPath("C# .NET")).toBe("C%23%20.NET");
    expect(encodeTagPath("data science/python")).toBe("data%20science/python");
    expect(encodeTagPath("データ/科学")).toBe(
      "%E3%83%87%E3%83%BC%E3%82%BF/%E7%A7%91%E5%AD%A6",
    );
  });

  it("buildTagPath builds localized tag URLs with encoding", () => {
    expect(buildTagPath("en" as Locale, "programming/javascript")).toBe(
      "/en/tags/programming/javascript",
    );
    expect(buildTagPath("de" as Locale, "C# .NET")).toBe(
      "/de/tags/C%23%20.NET",
    );
    expect(buildTagPath("en" as Locale, "データ/科学")).toBe(
      "/en/tags/%E3%83%87%E3%83%BC%E3%82%BF/%E7%A7%91%E5%AD%A6",
    );
  });
});
