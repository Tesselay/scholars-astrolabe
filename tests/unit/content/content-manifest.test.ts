import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  __resetContentManifest,
  buildContentManifest,
} from "@/i18n/manifests/content";
import { mockBlog } from "../../utils/mocks.ts";

describe("buildContentManifest", () => {
  beforeEach(() => {
    __resetContentManifest();
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("derives languages, strips slugs, de-duplicates and checks existence", async () => {
    const fakeGetCollection = async () => mockBlog;
    const manifest = await buildContentManifest(fakeGetCollection);

    const enSlugs = Array.from(manifest.blogSlugsByLang.get("en") ?? []).sort();
    const deSlugs = Array.from(manifest.blogSlugsByLang.get("de") ?? []).sort();

    expect(enSlugs).toEqual(["other", "p1"].sort());
    expect(deSlugs).toEqual(["blog/p3", "dup", "p2", "x1"].sort());
    expect(manifest.blogPostExists("de", "///blog///p3//")).toBe(true);
    expect(manifest.blogPostExists("en", "p2")).toBe(false);
  });
});
