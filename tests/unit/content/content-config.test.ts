import { describe, it, expect } from "vitest";
import { globby } from "globby";

import * as cfg from "../../../src/content.config";

describe("content config debug", () => {
  it("shows registered collections", () => {
    expect(cfg.collections.blog).toBeTypeOf("object");
    console.log("content collections =>", Object.keys(cfg.collections));
    expect(Object.keys(cfg.collections)).toContain("blog");
  });
});

describe("glob path debug", () => {
  it("sees markdown files under blog", async () => {
    const files = await globby("src/content/blog/**/[^_]*.md");
    console.log("blog md files =>", files);
    expect(files.length).toBeGreaterThan(0);
  });
});
