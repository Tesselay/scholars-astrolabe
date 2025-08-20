import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { buildBlogPostPath } from "../i18n/utils";

export async function GET(context) {
  // Fallback to the request origin if context.site isn't available
  const site =
    (context.site && String(context.site)) ||
    new URL(context.request.url).origin;

  const posts = await getCollection("blog");
  return rss({
    site,
    title: "Site Title",
    description: "A description for your blog",
    items: posts.map((post) => ({
      title: post.data.title,
      tags: post.data.tags,
      dateCreated: post.data["date-created"],
      dateModified: post.data["date-modified"],
      link: buildBlogPostPath("en", post.id),
    })),
    customData: `<language>en-us</language>`,
  });
}
