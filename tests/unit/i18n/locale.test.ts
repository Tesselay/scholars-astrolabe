import { describe, it, expect } from "vitest";
import {
  getLangFromUrl,
  getAllLocales,
  getAlternateLocalesByURL,
  defaultLocale,
  locales
} from "@/i18n";

describe("locale utils", () => {
  it("getLangFromUrl returns the first path segment if it is a locale", () => {
    expect(getLangFromUrl(new URL("https://thaum.de/en/blog/example"))).toBe("en");
    expect(getLangFromUrl(new URL("https://thaum.de/de/"))).toBe("de");
    expect(getLangFromUrl(new URL("https://thaum.de/en"))).toBe("en");
    expect(getLangFromUrl(new URL("https://thaum.de/xx/whatever"))).toBe(defaultLocale);
  });

  it("getLangFromUrl falls back to defaultLocale when segment is not a locale", () => {
    expect(getLangFromUrl(new URL("https://thaum.de/xx/about"))).toBe(defaultLocale);
    expect(getLangFromUrl(new URL("https://thaum.de/"))).toBe(defaultLocale);
  });

  it("getAllLocales returns the configured locales", () => {
    expect(getAllLocales()).toEqual(locales);
  });

  it("getAlternateLocalesByURL excludes current locale", () => {
    expect(getAlternateLocalesByURL(new URL("https://thaum.de/en/"))).toEqual(
      locales.filter((l) => l !== "en")
    );
    expect(getAlternateLocalesByURL(new URL("https://thaum.de/de/"))).toEqual(
      locales.filter((l) => l !== "de")
    );
    expect(getAlternateLocalesByURL(new URL("https://thaum.de/"))).toEqual(
      locales.filter((l) => l !== "en")
    );
  });
});
