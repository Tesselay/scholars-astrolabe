import { describe, it, expect, vi } from "vitest";

const getContentManifestMock = vi.fn();
vi.mock("@/i18n", () => ({
  getContentManifest: getContentManifestMock
}));

describe("API: /api/content-manifest.json GET", () => {
  it("returns application/json and flattens Map<Lang, Set<string>> to plain object of arrays", async () => {
    const blogSlugsByLang = new Map<string, Set<string>>([
      ["en", new Set(["p1", "p3"])],
      ["de", new Set(["p2"])]
    ]);

    getContentManifestMock.mockResolvedValueOnce({
      blogSlugsByLang,
      blogPostExists: vi.fn()
    });

    const { GET } = await import("../../../src/pages/api/content-manifest.json.ts");

    const res = await GET();
    expect(res.headers.get("content-type")).toBe("application/json");

    const body = await res.json();
    expect(body && typeof body === "object").toBe(true);
    expect("blogSlugsByLang" in body).toBe(true);

    const normalized = Object.fromEntries(
      Object.entries(body.blogSlugsByLang as Record<string, string[]>).map(([k, arr]) => [
        k,
        [...arr].sort()
      ])
    );

    const expected = {
      en: ["p3", "p1"].sort(),
      de: ["p2"].sort()
    } as const;

    expect(normalized).toEqual(expected);
  });
});
