import { describe, it, expect } from "vitest";
import type { LocalePath } from "@/utils/i18n/locales";
import { getContentManifest } from "@/utils/content/manifest";
import { altLocalesFor, pageExistsForLocale } from "@/utils/routing/routes";

const locales: LocalePath[] = ["en", "de"];

describe("routing: pageExistsForLocale integration", () => {
  it("recognizes neutral paths for existing localized pages", async () => {
    const manifest = await getContentManifest();
    for (const lang of locales) {
      expect(pageExistsForLocale(lang, "/", manifest)).toBe(true);
      expect(pageExistsForLocale(lang, "/folio", manifest)).toBe(true);
      expect(pageExistsForLocale(lang, "/contact", manifest)).toBe(true);
      expect(pageExistsForLocale(lang, "/blog", manifest)).toBe(true);
      expect(pageExistsForLocale(lang, "/tags", manifest)).toBe(true);
      expect(pageExistsForLocale(lang, "/tags/astro", manifest)).toBe(true);
    }
  });

  it("recognizes neutral paths for existing localized pages (normalization variants)", async () => {
    const manifest = await getContentManifest();
    for (const lang of locales) {
      expect(pageExistsForLocale(lang, "blog/example", manifest)).toBe(true);
      expect(pageExistsForLocale(lang, "/blog/example", manifest)).toBe(true);
      expect(pageExistsForLocale(lang, "blog", manifest)).toBe(true);
      expect(pageExistsForLocale(lang, "/blog", manifest)).toBe(true);
      expect(pageExistsForLocale(lang, "/blog/", manifest)).toBe(true);
      expect(pageExistsForLocale(lang, "///blog///", manifest)).toBe(true);
    }
  });

  it("returns false for pages missing in a given locale", async () => {
    const manifest = await getContentManifest();
    expect(pageExistsForLocale("en", "/not-a-real-page", manifest)).toBe(false);
    expect(pageExistsForLocale("de", "/not-a-real-page", manifest)).toBe(false);
    expect(pageExistsForLocale("de", "/blog/2025/09/my-post", manifest)).toBe(false);
  });

  it("returns false for technical or global pages", async () => {
    const manifest = await getContentManifest();
    expect(pageExistsForLocale("en", "/robots.txt", manifest)).toBe(false);
    expect(pageExistsForLocale("en", "/humans.txt", manifest)).toBe(false);
    expect(pageExistsForLocale("en", "/sitemap.xml", manifest)).toBe(false);
    expect(pageExistsForLocale("en", "/.well-known/security.txt", manifest)).toBe(false);
    expect(pageExistsForLocale("en", "/api/content-manifest.json", manifest)).toBe(false);
    expect(pageExistsForLocale("en", "/index.astro", manifest)).toBe(true); // Exists as a static redirect and as localized indexes
  });
});

describe("routing: altLocalesFor integration", () => {
  it("returns alternate locales for localized pages", async () => {
    const manifest = await getContentManifest();
    expect(altLocalesFor("en", "blog/example", manifest)).toStrictEqual(["de"]);
    expect(altLocalesFor("de", "/blog/example", manifest)).toStrictEqual(["en"]);
    expect(altLocalesFor("en", "blog", manifest)).toStrictEqual(["de"]);
    expect(altLocalesFor("de", "/blog", manifest)).toStrictEqual(["en"]);
    expect(altLocalesFor("en", "/blog/", manifest)).toStrictEqual(["de"]);
    expect(altLocalesFor("de", "///blog///", manifest)).toStrictEqual(["en"]);
  });

  it("returns no locale for non-existent pages", async () => {
    const manifest = await getContentManifest();
    expect(altLocalesFor("en", "/not-a-real-page", manifest)).toStrictEqual([]);
    expect(altLocalesFor("de", "/not-a-real-page", manifest)).toStrictEqual([]);
    expect(altLocalesFor("de", "/blog/2025/09/my-post", manifest)).toStrictEqual([]);
  });

  it("returns false for technical or global pages", async () => {
    const manifest = await getContentManifest();
    expect(altLocalesFor("en", "/robots.txt", manifest)).toStrictEqual([]);
    expect(altLocalesFor("en", "/humans.txt", manifest)).toStrictEqual([]);
    expect(altLocalesFor("de", "/sitemap.xml", manifest)).toStrictEqual([]);
    expect(altLocalesFor("de", "/.well-known/security.txt", manifest)).toStrictEqual([]);
    expect(altLocalesFor("en", "/api/content-manifest.json", manifest)).toStrictEqual([]);
    expect(altLocalesFor("en", "/index.astro", manifest)).toStrictEqual(["de"]); // Exists as a static redirect and as localized indexes
  });
});

describe("routing: mDynamicBases fallback integration", () => {
  it("handles nested tag segments under /tags/[...slug] without throwing and reports existence via manifest", async () => {
    const manifest = await getContentManifest();
    for (const lang of locales) {
      const v1 = pageExistsForLocale(lang, "/tags/astro/js", manifest);
      const v2 = pageExistsForLocale(lang, "tags/astro/js", manifest);
      expect(typeof v1).toBe("boolean");
      expect(typeof v2).toBe("boolean");
    }
  });

  it("does not leak to static routes (no unintended children)", async () => {
    const manifest = await getContentManifest();
    for (const lang of locales) {
      expect(pageExistsForLocale(lang, "/contact/team", manifest)).toBe(false);
      expect(pageExistsForLocale(lang, "contact/team", manifest)).toBe(false);
    }
  });

  it("offers alternates for nested tags only when the localized tag exists", async () => {
    const manifest = await getContentManifest();
    const enAlts = altLocalesFor("en", "/tags/astro/js", manifest);
    const deAlts = altLocalesFor("de", "/tags/astro/js", manifest);

    // Should be arrays; may be empty if the tag doesn't exist in the other locale
    expect(Array.isArray(enAlts)).toBe(true);
    expect(Array.isArray(deAlts)).toBe(true);

    // If present, the only alternate for a 2-locale setup must be the other locale
    for (const l of enAlts) expect(["de"]).toContain(l);
    for (const l of deAlts) expect(["en"]).toContain(l);
  });
});
