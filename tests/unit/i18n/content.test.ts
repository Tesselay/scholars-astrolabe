import { describe, expect, it } from "vitest";
import type { CollectionEntry } from "astro:content";
import { byLang, filterEntriesByLang } from "@/utils/compositional/content/filter";

describe("content filters: byLang and filterEntriesByLang", () => {
  const entries = [
    { id: "en/post-1" },
    { id: "en/blog/post-2" },
    { id: "de/post-3" },
    { id: "fr/post-4" },
    { id: "en" }, // edge case: no trailing slash — should NOT match
    { id: "enx/not" }, // edge case: wrong prefix — should NOT match
    { id: "en-US/post-5" } // edge case: different locale — should NOT match for "en"
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
});
