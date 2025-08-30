import { describe, it, expect, vi, beforeEach } from "vitest";

const modulePath = "@/i18n/loaders/ui";
const enJsonPath = "@/i18n/dictionaries/en/ui.json";
const deJsonPath = "@/i18n/dictionaries/de/ui.json";

async function importFresh() {
  vi.resetModules();
  return await import(modulePath);
}

describe("UI loader validation", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("accepts strict default-locale schema and partial non-default", async () => {
    vi.doMock(enJsonPath, () => ({
      default: {
        nav: { home: "Home", blog: "Blog" },
        footer: { copy: "All rights reserved" },
      },
    }));

    vi.doMock(deJsonPath, () => ({
      default: {
        nav: { home: "Startseite" }, // missing blog and footer allowed (partial)
      },
    }));

    const mod = await importFresh();
    const uiByLocale = mod.uiByLocale as Record<"en" | "de", unknown>;
    expect(uiByLocale.en).toBeTruthy();
    expect(uiByLocale.de).toBeTruthy();
  });

  it("rejects invalid default-locale schema (wrong types or extra keys)", async () => {
    vi.doMock(enJsonPath, () => ({
      default: {
        nav: { home: "Home", blog: 42 }, // wrong type
        x: "not allowed", // extra key not in template
      },
    }));

    vi.doMock(deJsonPath, () => ({ default: {} }));

    await expect(importFresh()).rejects.toThrowError(
      /Invalid UI dictionary for en/,
    );
  });

  it("rejects invalid non-default-locale schema (extra keys not in template)", async () => {
    vi.doMock(enJsonPath, () => ({
      default: {
        nav: { home: "Home" },
      },
    }));

    vi.doMock(deJsonPath, () => ({
      default: {
        nav: { home: "Startseite" },
        extra: { foo: "bar" }, // not allowed by strict partial schema
      },
    }));

    await expect(importFresh()).rejects.toThrowError(
      /Invalid UI dictionary for de/,
    );
  });
});
