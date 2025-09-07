import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `\
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}

`;

import { env as appEnv } from "@/env/env.ts";

export const GET: APIRoute = ({ site, request }) => {
  // Prefer configured site origin; otherwise fall back to env-based origin.
  const forceHttp = appEnv.FORCE_HTTP;
  const fallbackScheme = forceHttp
    ? "http"
    : import.meta.env.PROD
      ? "https"
      : "http";
  const rawDomain = appEnv.MAIN_DOMAIN?.trim() || "localhost:4321";
  const normalizedDomain = rawDomain
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "");
  const envOrigin = `${fallbackScheme}://${normalizedDomain}`;
  const origin = site?.origin ?? envOrigin ?? new URL(request.url).origin;

  const sitemapURL = new URL("sitemap-index.xml", origin);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
