import { test, expect } from "@playwright/test";

test.describe("RSS feed", () => {
  test("GET /rss.xml returns a valid RSS document with optional items", async ({
    request,
  }) => {
    const res = await request.get("http://localhost:4321/rss.xml");
    expect(res.ok()).toBeTruthy();

    const xml = await res.text();

    // Minimal structure checks
    expect(xml).toContain("<rss");
    expect(xml).toContain("<title>Site Title</title>");

    // If there are items, validate each item's <link>
    const itemBlocks = xml.match(/<item\b[\s\S]*?<\/item>/g) ?? [];
    if (itemBlocks.length > 0) {
      for (const item of itemBlocks) {
        const m = item.match(/<link>([^<]+)<\/link>/);
        expect(m, "Each <item> should include a <link>").toBeTruthy();

        const rawLink = m?.[1] ?? "";
        // Normalize to a URL and assert pathname
        let pathname = "";
        try {
          pathname = new URL(rawLink, "http://127.0.0.1:4321").pathname;
        } catch {
          // leave pathname empty so the assertion below fails with a clear message
        }
        expect(pathname, "Item link pathname should be /posts/<slug>").toMatch(
          /^\/posts\/[^/?#]+\/?$/,
        );
      }
    }
  });
});
