import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const body =
    [
      "/* TEAM */",
      "Developer: Dominique Lahl",
      "GitHub: Tesselay",
      "From: Bremen, Germany",
      "",
      "/* SITE */",
      `Last update: ${new Date().toISOString().slice(0, 10)}`,
      //'Standards: HTML5, CSS3, ES2025',
      //'Software: Astro, TypeScript'
    ].join("\n") + "\n";

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=86400",
    },
  });
};
