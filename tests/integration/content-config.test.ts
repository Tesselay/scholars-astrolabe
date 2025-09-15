import { describe, it, expect, beforeEach } from "vitest";
import { globby } from "globby";
import { getCollection, getEntry } from "astro:content";

import * as cfg from "@/content.config.ts";
import { getContentManifest } from "@/i18n";

describe("Blog content collections exist", () => {
  it("shows registered collections", () => {
    expect(cfg.collections.blog).toBeTypeOf("object");
    console.log("content collections =>", Object.keys(cfg.collections));
    expect(Object.keys(cfg.collections)).toContain("blog");
  });

  it("sees markdown files under blog", async () => {
    const files = await globby("src/content/blog/**/[^_]*.md");
    console.log("blog md files =>", files);
    expect(files.length).toBeGreaterThan(0);
  });
});

describe("Astro can load blog content collection", () => {
  beforeEach(() => {
    getContentManifest();
  });

  it("can load a specific entry", async () => {
    const entry = await getEntry("blog", "en/example");
    console.log("[getEntry] en/example =>", entry ? "FOUND" : "NULL");
    expect(entry).toBeTruthy();
  });

  it("debug: vitest sees blog collection", async () => {
    try {
      const posts = await getCollection("blog");
      console.log(
        "[debug] posts.len=",
        posts.length,
        posts.map((p) => p.id),
      );
      const one = await getEntry("blog", "en/example");
      console.log("[debug] getEntry(en/example)=", !!one, one?.data);
      expect(Array.isArray(posts)).toBe(true);
    } catch (e) {
      console.error("[debug] astro:content threw:", e);
    }
  });

  it("debug: show blog entries", async () => {
    const posts = await getCollection("blog");
    console.log(
      "blog count:",
      posts.length,
      "ids:",
      posts.map((p) => p.id),
    );
    expect(posts.length).toBeGreaterThan(0);
  });
});
