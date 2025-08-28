import type { APIRoute } from "astro";
import { getPageMeta } from "../i18n/meta.ts";

const meta = getPageMeta("en", "home");

export const GET: APIRoute = () => {
  const manifest = {
    name: meta.siteName,
    short_name: "Astrolabe",
    start_url: "/",
    scope: "/",
    display: "standalone",
    //background_color: '#ffffff',
    //theme_color: '#0f172a',
    //description: 'Blog & portfolio powered by Astro.',
    /*icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    ]*/
  };

  return new Response(JSON.stringify(manifest), {
    headers: {
      "content-type": "application/manifest+json; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
