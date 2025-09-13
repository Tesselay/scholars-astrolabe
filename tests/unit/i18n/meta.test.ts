import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  __resetMeta,
  getPageMetaAsync,
  initMeta,
} from "@/i18n/loaders/meta.ts";
import { fakeGlob } from "../../utils/fake-glob.ts";
import {
  badMockEmpty,
  badMockInvalid,
  mockDE,
  mockEN,
} from "../../utils/mocks.ts";

describe("Meta loader", () => {
  beforeEach(() => {
    __resetMeta();
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("parses strict dictionaries and returns page meta with siteName", async () => {
    await initMeta(fakeGlob(mockEN, mockDE));
    const m = await getPageMetaAsync("de", "home");
    expect(m.title).toBe("Home DE");
    expect(m.siteName).toBe("Site DE");
  });

  it("handles optional fields and returns siteName from selected locale", async () => {
    await initMeta(fakeGlob(mockEN, mockDE));
    const m = await getPageMetaAsync("de", "home");
    expect(m.title).toBe("Home DE");
    expect(m.siteName).toBe("Site DE");
  });

  it("throws when dictionaries are invalid against strict schema", async () => {
    await expect(
      initMeta(fakeGlob(badMockInvalid, badMockEmpty)),
    ).rejects.toThrow("Expected string, received number");
  });
});
