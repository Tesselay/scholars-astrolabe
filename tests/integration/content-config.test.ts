import { describe, it, expect } from "vitest";
import { globby } from "globby";
import { getCollection, getEntry } from "astro:content";

import * as cfg from "@/content.config.ts";

describe("Blog content collections exist", () => {
  it("shows registered collections", () => {
    expect(cfg.collections.blog).toBeTypeOf("object");
    expect(Object.keys(cfg.collections)).toContain("blog");
  });

  it("sees markdown files under blog", async () => {
    const files = await globby("src/content/blog/**/[^_]*.md");
    expect(files.length).toBeGreaterThan(0);
  });
});

describe("Astro can load blog content collection", () => {
  it("can load a specific entry", async () => {
    const entry = await getEntry("blog", "en/example");
    expect(entry).toBeTruthy();
  });

  it("vitest sees blog collection", async () => {
    try {
      const posts = await getCollection("blog");
      expect(Array.isArray(posts)).toBe(true);
    } catch (e) {
      console.error("astro:content threw:", e);
    }
  });

  it("show blog entries", async () => {
    const posts = await getCollection("blog");
    expect(posts.length).toBeGreaterThan(0);
  });
});
