import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock astro:content before importing the module under test
const getCollectionMock = vi.fn();
vi.mock("astro:content", () => ({
  getCollection: getCollectionMock,
}));

describe("buildContentManifest", () => {
  beforeEach(() => {
    getCollectionMock.mockReset();
  });

  it("derives languages, strips slugs, de-duplicates and checks existence with normalization", async () => {
    type Entry = { id: string; data: { language?: string } };

    const fakeEntries: Entry[] = [
      { id: "en/p1", data: {} },
      { id: "de/p2", data: {} },
      // override to 'de' even though path starts with 'en'
      { id: "en/blog/p3", data: { language: "de" } },
      // invalid language in data -> fallback to path-derived ('de')
      { id: "de/x1", data: { language: "xx" } },
      // no locale at start -> fallback to defaultLocale ('en')
      { id: "misc/other", data: {} },
      // duplicate slug in same lang should be de-duplicated by Set
      { id: "de/dup", data: {} },
      { id: "de/dup", data: {} },
    ];

    getCollectionMock.mockResolvedValueOnce(fakeEntries);

    const { buildContentManifest } = await import("@/i18n/manifests/content");
    const manifest = await buildContentManifest();

    const enSlugs = Array.from(manifest.blogSlugsByLang.get("en") ?? []).sort();
    const deSlugs = Array.from(manifest.blogSlugsByLang.get("de") ?? []).sort();

    // Slugs are ids without the leading "<lang>/"
    expect(enSlugs).toEqual(["other", "p1"].sort());
    expect(deSlugs).toEqual(["blog/p3", "dup", "p2", "x1"].sort());

    // blogPostExists normalizes slashes
    expect(manifest.blogPostExists("de", "blog/p3")).toBe(true);
    expect(manifest.blogPostExists("de", "/blog/p3")).toBe(true);
    expect(manifest.blogPostExists("de", "///blog///p3//")).toBe(true);

    // Negative check
    expect(manifest.blogPostExists("en", "p2")).toBe(false);
  });
});
