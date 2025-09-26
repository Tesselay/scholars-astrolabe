import { describe, it, expect, vi, beforeEach } from "vitest";
import { buildStrictSchema, GenericLoader, type StringLeaves } from "@/i18n";
import { fakeGlob } from "../../utils/fake-glob.ts";
import {
  mockMetaEmpty,
  mockMetaInvalid,
  mockMetaDE,
  mockMetaEN,
} from "../../utils/mocks.ts";

describe("Meta loader", () => {
  const MetaSchema = buildStrictSchema(mockMetaEN);
  type Meta = StringLeaves<typeof mockMetaEN>;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("parses strict dictionaries and returns page meta with siteName", async () => {
    const metaLoader = new GenericLoader<Meta>(
      "meta",
      MetaSchema,
      fakeGlob(mockMetaEN, mockMetaDE, "meta"),
    );
    const m = await metaLoader.getAsync("en");
    expect(m.folio.title).toBe("Folio EN");
    expect(m.site.name).toBe("Site EN");
  });

  it("throws when dictionaries are invalid against strict schema", async () => {
    const metaLoader = new GenericLoader<Meta>(
      "meta",
      MetaSchema,
      fakeGlob(mockMetaInvalid, mockMetaEmpty, "meta"),
    );
    await expect(metaLoader.init()).rejects.toThrow(
      "Invalid dictionary for en",
    );
  });
});
