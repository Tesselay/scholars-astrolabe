import { describe, it, expect } from "vitest";
import { buildBlogPostPath, buildTagPath, encodeTagPath, stripLangFromUrlOrId } from "@/utils";

describe("url builders", () => {
  it("encodeTagPath encodes each segment", () => {
    expect(encodeTagPath("programming/javascript")).toBe("programming/javascript");
    expect(encodeTagPath("C#/.NET")).toBe("C%23/.NET");
    expect(encodeTagPath("über uns")).toBe("%C3%BCber%20uns");
    expect(encodeTagPath("/a//b///c/")).toBe("a/b/c");
    expect(encodeTagPath("データ/科学")).toBe("%E3%83%87%E3%83%BC%E3%82%BF/%E7%A7%91%E5%AD%A6");
  });

  it("buildBlogPostPath strips incoming lang and prefixes target", () => {
    expect(buildBlogPostPath("de", "en/awesome-post")).toBe("/de/blog/awesome-post/");
    expect(buildBlogPostPath("en", "awesome-post")).toBe("/en/blog/awesome-post/");
    expect(buildBlogPostPath("de", "/en/awesome/post")).toBe("/de/blog/awesome/post/");
  });

  it("buildTagPath uses encodeTagPath and prefixes", () => {
    expect(buildTagPath("en", "programming/javascript")).toBe("/en/tags/programming/javascript/");
    expect(buildTagPath("de", "C#/.NET")).toBe("/de/tags/C%23/.NET/");
    expect(buildTagPath("en", "データ/科学")).toBe(
      "/en/tags/%E3%83%87%E3%83%BC%E3%82%BF/%E7%A7%91%E5%AD%A6/"
    );
  });

  it("stripLangFromUrlOrId used by blog path handles edge cases (integration)", () => {
    const stripped = stripLangFromUrlOrId("/en//nested///post");
    expect(stripped).toBe("/nested/post/");
    expect(buildBlogPostPath("en", "/en//nested///post")).toBe("/en/blog/nested/post/");
  });
});
