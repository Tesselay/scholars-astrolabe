import { describe, expect, it } from "vitest";
import { buildTagPaths, byLang, filterEntriesByLang } from "@/i18n";
import type { CollectionEntry } from "astro:content";

describe("content filters: byLang and filterEntriesByLang", () => {
  const entries = [
    { id: "en/post-1" },
    { id: "en/blog/post-2" },
    { id: "de/post-3" },
    { id: "fr/post-4" },
    { id: "en" }, // edge case: no trailing slash — should NOT match
    { id: "enx/not" }, // edge case: wrong prefix — should NOT match
    { id: "en-US/post-5" }, // edge case: different locale — should NOT match for "en"
  ];

  it("byLang('en') returns a predicate that selects only ids starting with 'en/'", () => {
    const onlyEn = entries.filter(byLang("en"));
    expect(onlyEn.map((e) => e.id)).toEqual(["en/post-1", "en/blog/post-2"]);
  });

  it("byLang('de') selects only 'de/' entries", () => {
    const onlyDe = entries.filter(byLang("de"));
    expect(onlyDe.map((e) => e.id)).toEqual(["de/post-3"]);
  });

  it("filterEntriesByLang mirrors byLang behavior", () => {
    const viaHelper = filterEntriesByLang(entries, "en");
    const viaPredicate = entries.filter(byLang("en"));
    expect(viaHelper).toEqual(viaPredicate);
  });

  type TestEntry = { id: string; data: { title?: string; tags?: string[] } };

  it("deduplicates tags per language", () => {
    const posts = [
      { id: "en/p1", data: { tags: ["astro"] } },
      { id: "en/p2", data: { tags: ["astro"] } },
      { id: "en/p3", data: { tags: ["web"] } },
    ] satisfies TestEntry[];

    const paths = buildTagPaths(posts as CollectionEntry<"blog">[]);
    const enAstro = paths.filter(
      (p) => p.params.lang === "en" && p.props.tag === "astro",
    );
    expect(enAstro).toHaveLength(1);
    expect(enAstro[0].props.posts.map((p) => p.id)).toEqual(["en/p1", "en/p2"]);
  });

  it("produces no paths for languages with posts but without tags", () => {
    const posts = [
      { id: "en/p1", data: { tags: [] } },
      { id: "en/p2", data: {} },
    ] satisfies TestEntry[];

    const paths = buildTagPaths(posts as CollectionEntry<"blog">[]);
    expect(paths).toEqual([]);
  });

  it("encodes tag slugs and preserves hierarchy", () => {
    const posts = [
      { id: "en/p1", data: { tags: ["C#/.NET", "programming/javascript"] } },
    ] satisfies TestEntry[];

    const paths = buildTagPaths(posts as CollectionEntry<"blog">[]);
    const slugSet = new Set(paths.map((p) => p.params.slug));

    expect(slugSet.has("C%23/.NET")).toBe(true);
    expect(slugSet.has("programming/javascript")).toBe(true);
  });

  it("groups posts by language and tags", () => {
    const allPosts = [
      { id: "en/some-post", data: { title: "A", tags: ["astro", "web"] } },
      { id: "fr/autre", data: { title: "B", tags: ["astro"] } },
    ] satisfies TestEntry[];

    const paths = buildTagPaths(allPosts as CollectionEntry<"blog">[]);
    expect(paths.length).toBeGreaterThan(0);

    const enAstro = paths.find(
      (p) => p.params.lang === "en" && p.props.tag === "astro",
    );
    expect(enAstro?.props.posts.length).toBeGreaterThan(0);
  });
});
