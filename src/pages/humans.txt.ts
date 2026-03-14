import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const body
    = [
      "/* TEAM */",
      "Developer: Dominique Lahl",
      "GitHub: Tesselay",
      "From: Germany",
      "/* SITE */",
      `Last update: ${new Date().toISOString().slice(0, 10)}`,
    ].join("\n") + "\n";

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400",
    },
  });
};
