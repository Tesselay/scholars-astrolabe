import { describe, it, expect, vi, beforeEach } from "vitest";

const modulePath = "@/i18n/loaders/meta";
const enJsonPath = "@/i18n/dictionaries/en/meta.json";
const deJsonPath = "@/i18n/dictionaries/de/meta.json";

async function importFresh() {
  vi.resetModules();
  return await import(modulePath);
}

describe("Meta loader", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("parses strict dictionaries and returns page meta with siteName", async () => {
    vi.doMock(enJsonPath, () => ({
      default: {
        site: { name: "Site EN" },
        home: { title: "Home EN", description: "Desc EN" },
        folio: { title: "Folio EN" },
        "blog:index": { title: "Blog Index EN" },
        "blog:page": { title: "Blog Page EN" },
        contact: { title: "Contact EN" },
        "tags:index": { title: "Tags Index EN" },
        "tags:page": { title: "Tags Page EN" },
      },
    }));

    vi.doMock(deJsonPath, () => ({
      default: {
        site: { name: "Site DE" },
        home: { title: "Home DE" },
        folio: { title: "Folio DE" },
        "blog:index": { title: "Blog Index DE" },
        "blog:page": { title: "Blog Page DE" },
        contact: { title: "Contact DE" },
        "tags:index": { title: "Tags Index DE" },
        "tags:page": { title: "Tags Page DE" },
      },
    }));

    const { getPageMeta } = await importFresh();
    const m = getPageMeta("de", "home");
    expect(m.title).toBe("Home DE");
    expect(m.siteName).toBe("Site DE");
  });

  it("handles optional fields and returns siteName from selected locale", async () => {
    vi.doMock(enJsonPath, () => ({
      default: {
        site: { name: "Site EN" },
        home: { title: "Home EN", description: "Desc EN" },
        folio: { title: "Folio EN" },
        "blog:index": { title: "Blog Index EN" },
        "blog:page": { title: "Blog Page EN" },
        contact: { title: "Contact EN" },
        "tags:index": { title: "Tags Index EN" },
        "tags:page": { title: "Tags Page EN" },
      },
    }));

    vi.doMock(deJsonPath, () => ({
      default: {
        site: { name: "Site DE" },
        home: { title: "Home DE" }, // description optional
        folio: { title: "Folio DE" },
        "blog:index": { title: "Blog Index DE" },
        "blog:page": { title: "Blog Page DE" },
        contact: { title: "Contact DE" },
        "tags:index": { title: "Tags Index DE" },
        "tags:page": { title: "Tags Page DE" },
      },
    }));

    const { getPageMeta } = await importFresh();
    const m = getPageMeta("de", "home");
    expect(m.title).toBe("Home DE");
    expect(m.siteName).toBe("Site DE");
  });

  it("throws when dictionaries are invalid against strict schema", async () => {
    vi.doMock(enJsonPath, () => ({
      default: {
        site: { name: "Site EN" },
        home: { title: 42 }, // invalid type
      },
    }));

    vi.doMock(deJsonPath, () => ({ default: {} }));

    await expect(importFresh()).rejects.toThrowError();
  });
});
