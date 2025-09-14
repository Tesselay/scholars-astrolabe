import { describe, it, expect } from "vitest";
import { buildContentManifest } from "@/i18n/manifests/content";

describe("buildContentManifest", () => {
  it("derives languages, strips slugs, de-duplicates and checks existence", async () => {
    const fakeEntries = [
      { id: "en/p1", data: {} },
      { id: "de/p2", data: {} },
      { id: "en/blog/p3", data: { language: "de" } },
      { id: "de/x1", data: { language: "xx" } },
      { id: "misc/other", data: {} },
      { id: "de/dup", data: {} },
      { id: "de/dup", data: {} },
    ];

    const fakeGetCollection = async () => fakeEntries;

    const manifest = await buildContentManifest(fakeGetCollection);

    const enSlugs = Array.from(manifest.blogSlugsByLang.get("en") ?? []).sort();
    const deSlugs = Array.from(manifest.blogSlugsByLang.get("de") ?? []).sort();

    expect(enSlugs).toEqual(["other", "p1"].sort());
    expect(deSlugs).toEqual(["blog/p3", "dup", "p2", "x1"].sort());
    expect(manifest.blogPostExists("de", "///blog///p3//")).toBe(true);
    expect(manifest.blogPostExists("en", "p2")).toBe(false);
  });
});
