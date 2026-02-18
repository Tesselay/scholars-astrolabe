import type { APIRoute } from "astro";
import { metaLoader } from "@/utils/core/i18n/dict/dictBuilder.ts";

const meta = await metaLoader.getAsync("en");

export const GET: APIRoute = () => {
  const manifest = {
    name: meta.site.name,
    short_name: "Astrolabe",
    start_url: "/",
    scope: "/",
    display: "standalone"
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
      "cache-control": "public, max-age=3600"
    }
  });
};
