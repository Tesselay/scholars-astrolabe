import type { APIRoute } from "astro";

import { MetaLoader } from "&utils/compositional/i18n/metaLoader.ts";

const meta = await MetaLoader.getAsync("en");

export const GET: APIRoute = () => {
  const manifest = {
    name: meta.site.name,
    short_name: "Astrolabe",
    start_url: "/",
    scope: "/",
    display: "standalone",
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      "content-type": "application/manifest+json; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
