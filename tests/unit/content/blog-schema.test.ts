import { describe, it, expect } from "vitest";
import { BlogPostSchema } from "@/content/schema";

describe("BlogPostSchema", () => {
  it("accepts valid entries", () => {
    const data = {
      title: "Post",
      tags: ["astro", "web"],
      summary: "...",
      sources: ["https://example.com"],
      language: "en",
      "date-created": new Date("2024-01-01"),
      "date-modified": new Date("2024-01-02"),
    };
    expect(() => BlogPostSchema.parse(data)).not.toThrow();
  });

  it("rejects invalid language and missing required fields", () => {
    expect(() => BlogPostSchema.parse({ language: "xx" })).toThrow();
  });
});
