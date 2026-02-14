import { getContentManifest } from "@/utils/content/manifest";

export const GET = async () => {
  const manifest = await getContentManifest();

  const blogSlugsByLang = Object.fromEntries(
    Array.from(manifest.blogSlugsByLang.entries()).map(([lang, set]) => [
      lang,
      Array.from(set.values())
    ])
  );

  return new Response(JSON.stringify({ blogSlugsByLang }, null, 2), {
    headers: { "content-type": "application/json" }
  });
};
