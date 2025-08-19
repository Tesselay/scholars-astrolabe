import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `\
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}

`;

export const GET: APIRoute = ({ site, request }) => {
  const origin = site?.origin ?? new URL(request.url).origin;

  const sitemapURL = new URL("sitemap-index.xml", origin);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
