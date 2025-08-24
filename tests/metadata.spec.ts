import { test, expect } from "./utils/fixtures.ts";
import type { APIRequestContext } from "@playwright/test";

const pickFirstReachable = async (
  request: APIRequestContext,
  paths: string[],
) => {
  for (const p of paths) {
    const res = await request.get(p);
    if (res.ok()) return res;
  }
  return null;
};

test.describe("Metadata endpoints", () => {
  test("robots.txt has correct basics and sitemap line", async ({
    request,
    baseURL,
  }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBeTruthy();
    expect(res.headers()["content-type"] || "").toContain("text/plain");

    const body = await res.text();
    expect(body).toContain("User-agent:");

    const m = body.match(/^Sitemap:\s*(\S+)/m);
    expect(m, "Sitemap line should exist").toBeTruthy();

    const urlSitemap = new URL(m![1], baseURL);
    expect(urlSitemap.pathname).toBe("/sitemap-index.xml");
  });

  test("security.txt is reachable and contains required fields", async ({
    request,
  }) => {
    // Support both preferred and fallback locations
    const res =
      (await pickFirstReachable(request, [
        "/.well-known/security.txt",
        "/security.txt",
      ])) ?? undefined;

    expect(res, "security.txt endpoint not found").toBeTruthy();
    if (!res) return;

    expect(res.ok()).toBeTruthy();
    expect(res.headers()["content-type"] || "").toContain("text/plain");

    const body = await res.text();

    expect(body).toMatch(/^Contact:\s*(.+)$/m);

    const expires = body.match(/^Expires:\s*([^\n\r]+)$/m)?.[1];
    expect(expires, "Expires is required").toBeTruthy();
    const expiresAt = new Date(expires!);
    expect(
      !isNaN(expiresAt.getTime()),
      "Expires must be a valid date",
    ).toBeTruthy();
    expect(expiresAt.getTime()).toBeGreaterThan(Date.now());
  });

  test("humans.txt is reachable and has a last update line", async ({
    request,
  }) => {
    const res =
      (await pickFirstReachable(request, [
        "/humans.txt",
        "/.well-known/humans.txt",
      ])) ?? undefined;

    expect(res, "humans.txt endpoint not found").toBeTruthy();
    if (!res) return;

    expect(res.ok()).toBeTruthy();
    expect(res.headers()["content-type"] || "").toContain("text/plain");

    const body = await res.text();
    const m = body.match(/^Last update:\s*(\d{4}-\d{2}-\d{2})$/m);
    expect(m, "Last update line should exist with YYYY-MM-DD").toBeTruthy();
  });

  test("site.webmanifest is valid JSON with minimal fields", async ({
    request,
  }) => {
    const res =
      (await pickFirstReachable(request, [
        "/site.webmanifest",
        "/manifest.webmanifest",
      ])) ?? undefined;

    expect(res, "web manifest not found").toBeTruthy();
    if (!res) return;

    expect(res.ok()).toBeTruthy();

    const ct = res.headers()["content-type"] || "";
    expect(ct).toMatch(/application\/manifest\+json|application\/json/);

    const manifest = JSON.parse(await res.text());
    expect(typeof manifest).toBe("object");
    expect(typeof manifest.name).toBe("string");
    expect(typeof manifest.short_name).toBe("string");
    expect(typeof manifest.start_url).toBe("string");
    // Optional but nice:
    if (manifest.display)
      expect(["standalone", "minimal-ui", "browser", "fullscreen"]).toContain(
        manifest.display,
      );
  });
});
