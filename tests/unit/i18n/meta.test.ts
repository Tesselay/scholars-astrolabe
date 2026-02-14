import { describe, it, expect, vi, beforeEach } from "vitest";
import { fakeGlob } from "../../utils/fake-glob.ts";
import { mockMetaEmpty, mockMetaInvalid, mockMetaDE, mockMetaEN } from "../../utils/mocks.ts";
import { buildStrictSchema, type StringLeaves } from "@/utils/i18n/schemaBuilder";
import { GenericDictLoader } from "@/utils/i18n/genericDictLoader";

describe("Meta loader", () => {
  const MetaSchema = buildStrictSchema(mockMetaEN);
  type Meta = StringLeaves<typeof mockMetaEN>;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("parses strict dictionaries and returns page meta with siteName", async () => {
    const metaLoader = new GenericDictLoader<Meta>(
      "meta",
      MetaSchema,
      fakeGlob(mockMetaEN, mockMetaDE, "meta")
    );
    const m = await metaLoader.getAsync("en");
    expect(m.folio.title).toBe("Folio EN");
    expect(m.site.name).toBe("Site EN");
  });

  it("throws when dictionaries are invalid against strict schema", async () => {
    const metaLoader = new GenericDictLoader<Meta>(
      "meta",
      MetaSchema,
      fakeGlob(mockMetaInvalid, mockMetaEmpty, "meta")
    );
    await expect(metaLoader.init()).rejects.toThrow("Invalid dictionary for en");
  });
});
