import { describe, it, expect } from "vitest";
import { getLangFromUrl, getAlternateLocalesByURL, locales } from "@/utils";

describe("locale common", () => {
  it("getLangFromUrl returns the first path segment if it is a locale", () => {
    expect(getLangFromUrl(new URL("https://thaum.de/en/blog/example"))).toBe("en");
    expect(getLangFromUrl(new URL("https://thaum.de/de/"))).toBe("de");
    expect(getLangFromUrl(new URL("https://thaum.de/en"))).toBe("en");
  });

  it("getLangFromUrl throws error when segment is not a locale", () => {
    expect(() => getLangFromUrl(new URL("https://thaum.de/xx/about"))).toThrowError(
      "Cannot read properties of undefined"
    );
    expect(() => getLangFromUrl(new URL("https://thaum.de/"))).toThrowError(
      "Cannot read properties of undefined"
    );
  });

  it("getAlternateLocalesByURL excludes current locale", () => {
    expect(getAlternateLocalesByURL(new URL("https://thaum.de/en/"))).toEqual(
      locales.filter((locales) => locales.path !== "en")
    );
    expect(getAlternateLocalesByURL(new URL("https://thaum.de/de/"))).toEqual(
      locales.filter((locales) => locales.path !== "de")
    );
    expect(() => getAlternateLocalesByURL(new URL("https://thaum.de/"))).toThrowError(
      "Cannot read properties of undefined"
    );
  });
});
