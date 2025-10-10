import { describe, it, expect } from "vitest";
import { normalizeStyles } from "@/utils";

describe("normalizeStyles (inline CSS)", () => {
  it("keeps spaces inside quoted strings and escaped quotes", () => {
    const input = 'content: "Open Sans";content: "\"q\""';
    const out = normalizeStyles(input);
    expect(out).toBe('content: "Open Sans";content: "\"q\"";');
  });

  it("preserves calc() spaces and formatting", () => {
    const input = "width: calc(100% - 2rem)";
    const out = normalizeStyles(input);
    expect(out).toBe("width: calc(100% - 2rem);");
  });

  it("handles nested functions inside var() and calc() without touching internals", () => {
    const input = "padding: var(--x, calc(1px + var(--y, 2px)))";
    const out = normalizeStyles(input);
    expect(out).toBe("padding: var(--x, calc(1px + var(--y, 2px)));");
  });

  it("leaves gradient values intact inside parentheses", () => {
    const input = "background-image: linear-gradient(to right, red 0%, blue 100%)";
    const out = normalizeStyles(input);
    expect(out).toBe("background-image: linear-gradient(to right, red 0%, blue 100%);");
  });

  it("does not split semicolons inside url(data:...)", () => {
    const input =
      'background: url(data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"></svg>)';
    const out = normalizeStyles(input);
    expect(out).toBe(
      'background: url(data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"></svg>);'
    );
  });

  it("preserves quoted URL with spaces", () => {
    const input = 'background-image: url("/img with space.png")';
    const out = normalizeStyles(input);
    expect(out).toBe('background-image: url("/img with space.png");');
  });

  it("collapses leading/trailing/extra semicolons and spaces", () => {
    const input = ";;  color: red  ;;;  ";
    const out = normalizeStyles(input);
    expect(out).toBe("color: red;");
  });

  it("normalizes spacing around separators (e.g., margin:0 -> margin: 0;)", () => {
    const input = "margin:0";
    const out = normalizeStyles(input);
    expect(out).toBe("margin: 0;");
  });

  it("keeps custom properties and !important intact apart from ': ' normalization", () => {
    const input = "--gap: 1rem; color:red !important";
    const out = normalizeStyles(input);
    expect(out).toBe("--gap: 1rem;color: red !important;");
  });

  it("preserves escapes inside strings (e.g., \\A) and normalizes following declarations", () => {
    const input = 'content: "\\A"; white-space: pre';
    const out = normalizeStyles(input);
    expect(out).toBe('content: "\\A";white-space: pre;');
  });
});
