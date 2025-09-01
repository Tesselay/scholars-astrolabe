// tests/integration/routing/routes.test.ts
import { describe, it, expect } from "vitest";
import { pageExistsForLocale, type Locale } from "@/i18n";

const locales: Locale[] = ["en", "de"];

describe("routing: pageExistsForLocale integration", () => {
  it("recognizes neutral paths for existing localized pages (normalization variants)", () => {
    for (const lang of locales) {
      expect(pageExistsForLocale(lang, "blog")).toBe(true);
      expect(pageExistsForLocale(lang, "/blog")).toBe(true);
      expect(pageExistsForLocale(lang, "/blog/")).toBe(true);
      expect(pageExistsForLocale(lang, "///blog///")).toBe(true);
    }
  });

  it("returns false for pages missing in a given locale", () => {
    expect(pageExistsForLocale("en", "/not-a-real-page")).toBe(false);
    expect(pageExistsForLocale("de", "/not-a-real-page")).toBe(false);
  });
});
