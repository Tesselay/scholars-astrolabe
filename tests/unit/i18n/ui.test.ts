import { describe, it, expect, vi, beforeEach } from "vitest";
import { fakeGlob } from "../../utils/fake-glob.ts";
import { mockUiEN, mockUiDE, mockUiInvalid, mockUiEmpty } from "../../utils/mocks.ts";
import { buildStrictSchema, type StringLeaves } from "@/utils/i18n/schemaBuilder";
import { GenericDictLoader } from "@/utils/i18n/genericDictLoader";

describe("UI loader validation", () => {
  const UiSchema = buildStrictSchema(mockUiEN);
  type Ui = StringLeaves<typeof mockUiEN>;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("loads and validates, with default-locale strict", async () => {
    const uiLoader = new GenericDictLoader<Ui>("ui", UiSchema, fakeGlob(mockUiEN, mockUiDE, "ui"));
    const enUi = await uiLoader.getAsync("en");
    expect(enUi.nav.blog).toBe("Blog EN");
  });

  it("rejects invalid default-locale schema (wrong types or extra keys)", async () => {
    const uiLoader = new GenericDictLoader<Ui>(
      "ui",
      UiSchema,
      fakeGlob(mockUiInvalid, mockUiEmpty, "ui")
    );

    await expect(uiLoader.init()).rejects.toThrow("Invalid dictionary for en");
  });
});
