import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const body
    = [
      "Contact: mailto:postmaster@thaum.de",
      "Preferred-Languages: en",
      `Expires: ${new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString()}`,
    ].join("\n") + "\n";

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};
