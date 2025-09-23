import { describe, it, expect, vi, beforeEach } from "vitest";
import { __resetMeta, getMetaAsync, initMeta } from "@/i18n/loaders/meta.ts";
import { fakeGlob } from "../../utils/fake-glob.ts";
import {
  mockMetaEmpty,
  mockMetaInvalid,
  mockMetaDE,
  mockMetaEN,
} from "../../utils/mocks.ts";

describe("Meta loader", () => {
  beforeEach(() => {
    __resetMeta();
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("parses strict dictionaries and returns page meta with siteName", async () => {
    await initMeta(fakeGlob(mockMetaEN, mockMetaDE, "meta"));
    const m = await getMetaAsync("en");
    expect(m.folio.title).toBe("Folio EN");
    expect(m.site.name).toBe("Site EN");
  });

  it("throws when dictionaries are invalid against strict schema", async () => {
    await expect(
      initMeta(fakeGlob(mockMetaInvalid, mockMetaEmpty, "meta")),
    ).rejects.toThrow("Invalid META dictionary");
  });
});
