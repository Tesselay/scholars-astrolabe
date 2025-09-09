import { describe, it, expect } from "vitest";
import { getCollection } from "astro:content";

describe("content collection integration (project content)", () => {
  it("loads blog entries, coerces schema types, and excludes underscored files", async () => {
    const posts = await getCollection("blog");

    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);

    for (const p of posts) {
      // id should look like "<lang>/<slug>..."
      expect(typeof p.id).toBe("string");
      expect(p.id).toMatch(/^[^/]+\/.+/);

      // schema fields
      expect(typeof p.data.title).toBe("string");
      expect(Array.isArray(p.data.tags)).toBe(true);
      for (const t of p.data.tags) expect(typeof t).toBe("string");

      expect(typeof p.data.summary).toBe("string");
      expect(Array.isArray(p.data.sources)).toBe(true);
      for (const s of p.data.sources) expect(typeof s).toBe("string");

      // dates are coerced to Date by the content pipeline
      expect(p.data["date-created"]).toBeInstanceOf(Date);
      expect(p.data["date-modified"]).toBeInstanceOf(Date);

      // loader excludes files whose basename starts with "_"
      const lastSeg = p.id.split("/").pop()!;
      expect(lastSeg.startsWith("_")).toBe(false);
    }
  });
});
