import { describe, it, expect, vi, beforeEach } from "vitest";
import { initUi, getUiAsync, __resetUI } from "@/i18n/loaders/ui";
import { fakeGlob } from "../../utils/fake-glob.ts";
import {
  mockUiEN,
  mockUiDE,
  mockUiInvalid,
  mockUiEmpty,
} from "../../utils/mocks.ts";

describe("UI loader validation", () => {
  beforeEach(() => {
    __resetUI();
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("loads and validates, with default-locale strict", async () => {
    await initUi(fakeGlob(mockUiEN, mockUiDE, "ui"));
    const enUi = await getUiAsync("en");
    expect(enUi.nav.blog).toBe("Blog EN");
  });

  it("rejects invalid default-locale schema (wrong types or extra keys)", async () => {
    await expect(
      initUi(fakeGlob(mockUiEmpty, mockUiInvalid, "ui")),
    ).rejects.toThrow();
  });
});
