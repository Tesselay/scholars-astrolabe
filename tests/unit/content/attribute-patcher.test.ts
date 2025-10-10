import { describe, expect, it } from "vitest";
import { buildElementProps } from "@/utils";

describe("Attribute Patcher", () => {
  it("correctly parses and builds class string", () => {
    const built = buildElementProps<"div">({
      classList: ["card", " ts", "<fault>", "?!hfi2"]
    });
    expect(built.class).toBe("card ts <fault> ?!hfi2");
  });

  it("correctly parses and builds style string", () => {
    const built = buildElementProps<"div">({
      styleList: ["background: red; color: white", "color: black;"] // For now double values are allowed
    });
    expect(built.style).toContain("background: red;");
    expect(built.style).toContain("color: white;");
    expect(built.style).toContain("color: black;");
  });

  it("custom decorative attribute sets correct aria attributes", () => {
    const built = buildElementProps<"div">({
      decorative: true
    });
    expect(built["aria-hidden"]).toBe(true);
    expect(built.inert).toBe(true);
  });

  it("returns empty object for no options", () => {
    const built = buildElementProps<"div">();
    expect(built).toEqual({});
  });

  it("merges provided class attribute with classList and trims", () => {
    const built = buildElementProps<"div">({
      attributes: { class: "  pre   classes  " },
      classList: [" post", "classes"]
    });
    expect(built.class).toBe("pre classes post classes");
  });

  it("does not set class when classList is effectively empty and no provided class", () => {
    const built = buildElementProps<"div">({ classList: [undefined as any, "", null as any] });
    expect(built.class).toBeUndefined();
  });

  it("keeps provided class when classList is empty after filtering", () => {
    const built = buildElementProps<"div">({
      attributes: { class: "provided" },
      classList: [undefined as any, "", null as any]
    });
    expect(built.class).toBe("provided");
  });

  it("handles non-string entries in classList", () => {
    const built = buildElementProps<"div">({
      classList: [0 as any, 1 as any, true as any, false as any, "ok"]
    });
    // 0 and false are removed by filter(Boolean), 1 and true become strings
    expect(built.class).toBe("1 true ok");
  });

  it("merges provided style attribute with styleList and normalizes", () => {
    const built = buildElementProps<"div">({
      attributes: { style: "color: blue" },
      styleList: ["font-weight: bold;", ";margin:0;;"]
    });
    expect(built.style).toBe("color: blue;font-weight: bold;margin: 0;");
  });

  it("does not modify provided style when styleList is not used", () => {
    const built = buildElementProps<"div">({
      attributes: { style: "color: blue" }
    });
    expect(built.style).toBe("color: blue;");
  });

  it("normalizes styleList entries and enforces a single trailing semicolon", () => {
    const built = buildElementProps<"div">({
      styleList: [";a:1;;", ";", " ;b:2 ", "", null as any]
    });
    expect(built.style).toBe("a: 1;b: 2;");
  });

  it("handles non-string entries in styleList", () => {
    const built = buildElementProps<"div">({
      styleList: [false as any, 0 as any, 1 as any, true as any, "x:y"]
    });
    // 0 and false are removed by filter(Boolean), 1 and true included as strings
    expect(built.style).toBe("1;true;x: y;");
  });

  it("decorative does not override explicit aria-hidden/inert values", () => {
    const built = buildElementProps<"div">({
      decorative: true,
      attributes: { "aria-hidden": false as any, inert: false as any }
    });
    expect(built["aria-hidden"]).toBe(false);
    expect(built.inert).toBe(false);
  });

  it("decorative fills aria-hidden and inert only when missing", () => {
    const built = buildElementProps<"div">({ decorative: true, attributes: { id: "x" } });
    expect(built["aria-hidden"]).toBe(true);
    expect(built.inert).toBe(true);
    expect(built.id).toBe("x");
  });

  it("passes through arbitrary attributes (id, role, data-*)", () => {
    const built = buildElementProps<"div">({
      attributes: { id: "card1", role: "group", ["data-x" as any]: "123" }
    });
    expect(built.id).toBe("card1");
    expect(built.role).toBe("group");
    expect((built as any)["data-x"]).toBe("123");
  });

  it("normalizes input attributes object", () => {
    const attrs = { class: "a", style: "b:c" } as const;
    const clone = { ...attrs };
    const built = buildElementProps<"div">({
      attributes: attrs,
      classList: ["d"],
      styleList: ["e:f"]
    });
    expect(attrs).toEqual(clone); // original unchanged
    expect(built.class).toBe("a d");
    expect(built.style).toBe("b: c;e: f;");
  });

  it("omits class/style keys when lists normalize to empty and no provided values", () => {
    const built = buildElementProps<"div">({ classList: [""], styleList: [""] });
    expect(built.class).toBeUndefined();
    expect(built.style).toBeUndefined();
  });

  it("works for non-div intrinsic elements (type parameter only)", () => {
    const built = buildElementProps<"span">({ classList: ["x"] });
    expect(built.class).toBe("x");
  });
});
