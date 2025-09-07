import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("@/i18n/loaders/ui", () => {
  const en = {
    nav: { home: "Home", blog: "Blog" },
    footer: { copyright: "All rights reserved" },
  };
  const de = {
    nav: { home: "Startseite" }, // 'blog' intentionally missing to test fallback
  };
  return {
    uiByLocale: {
      en,
      de,
    },
  };
});

import { useTranslations, defaultLocale } from "@/i18n";
import type { Mode } from "@/env/parse.ts";

describe("useTranslations()", () => {
  const originalEnv = import.meta.env?.MODE as Mode;

  afterEach(() => {
    const meta = import.meta as { env: { MODE?: Mode } };
    if (originalEnv === undefined) {
      if ("MODE" in meta.env) delete meta.env.MODE;
    } else {
      meta.env.MODE = originalEnv;
    }
    vi.restoreAllMocks();
  });

  it("returns localized string when key exists in current locale", () => {
    const t = useTranslations("de");
    expect(t("nav.home")).toBe("Startseite");
  });

  it("falls back to default locale when key missing in current locale", () => {
    const t = useTranslations("de");
    expect(t("nav.blog")).toBe("Blog"); // present in en, missing in de
  });

  it("logs a warning in non-production when falling back", () => {
    const meta = import.meta as { env: { MODE?: Mode } };
    meta.env.MODE = "development";
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const t = useTranslations("de");
    expect(t("nav.blog")).toBe("Blog");
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('[i18n] Missing key "nav.blog"'),
    );
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("falling back to en"),
    );
  });

  it("does not log a warning in production", () => {
    const meta = import.meta as { env: { MODE?: Mode } };
    meta.env.MODE = "production";
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const t = useTranslations("de");
    expect(t("nav.blog")).toBe("Blog");
    expect(warn).not.toHaveBeenCalled();
  });

  it("echoes the key if missing in both current and default locales", () => {
    const t = useTranslations(defaultLocale);
    expect(t("unknown.path")).toBe("unknown.path");
  });

  it("handles empty path without throwing (defensive)", () => {
    const t = useTranslations(defaultLocale);
    expect(t("")).toBe("");
  });
});
