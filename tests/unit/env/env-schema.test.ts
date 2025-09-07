import { describe, it, expect } from "vitest";
import { parseEnvLike } from "@/env/parse.ts";

describe("Env schema", () => {
  it("applies defaults when values are missing", () => {
    const parsed = parseEnvLike({});
    expect(parsed.MODE).toBe("development");
    expect(parsed.MAIN_DOMAIN).toBe("127.0.0.1:4321");
    expect(parsed.ROOT_REDIRECT_PAGE).toBe(false);
  });

  it("coerces boolean flags", () => {
    const parsed = parseEnvLike({ ROOT_REDIRECT_PAGE: "true" });
    expect(parsed.ROOT_REDIRECT_PAGE).toBe(true);
  });

  it("rejects invalid MODE values", () => {
    expect(() => parseEnvLike({ MODE: "prod" })).toThrow();
  });
});
