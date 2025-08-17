import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: "Site Title",
    description: "A description for your blog",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      tags: post.data.tags,
      dateCreated: post.data["date-created"],
      dateModified: post.data["date-modified"],
      link: `/posts/${post.id}`,
    })),
    customData: `<language>en-us</language>`,
  });
}
