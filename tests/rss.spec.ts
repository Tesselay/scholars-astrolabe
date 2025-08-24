import { test, expect } from "./utils/fixtures.ts";
import { toAbs } from "./utils/url";

test.describe("RSS feed", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/rss.xml`);
  });

  test("GET /rss.xml returns a valid RSS document with optional items", async ({
    request,
  }) => {
    const rssPath = "/rss.xml";
    const res = await request.get(rssPath);
    const body = await res.text();

    expect(
      res.ok(),
      `GET ${rssPath} -> ${res.status()} ${res.statusText()}\n${body}`,
    ).toBeTruthy();

    const ct = res.headers()["content-type"] || "";
    expect(ct).toMatch(/(application|text)\/(xml|rss\+xml)/i);

    // Root usually has attributes like version="2.0"
    expect(body).toMatch(/<rss\b/i);

    // Title may be plain or CDATA-wrapped
    expect(body).toMatch(
      /<title>\s*(?:<!\[CDATA\[)?Site Title(?:]]>)?\s*<\/title>/i,
    );

    // If there are items, validate each item's <link>
    const itemBlocks = body.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
    if (itemBlocks.length > 0) {
      for (const item of itemBlocks) {
        // Handle plain or CDATA links
        const m = item.match(
          /<link>\s*(?:<!\[CDATA\[)?([^<\]]+?)(?:]]>)?\s*<\/link>/i,
        );
        expect(m, "Each <item> should include a <link>").toBeTruthy();

        const rawLink = m?.[1] ?? "";
        // Normalize to a URL and assert pathname
        let pathname = "";
        try {
          pathname = toAbs(rawLink).pathname;
        } catch {
          // leave pathname empty so the assertion below fails with a clear message
        }
        expect(
          pathname,
          "Item link pathname should be /en/blog/<slug>",
        ).toMatch(/^\/en\/blog\/.+$/);
      }
    }
  });
});
