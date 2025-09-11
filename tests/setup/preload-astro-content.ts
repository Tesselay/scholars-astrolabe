import "astro:content";

import { fileURLToPath } from "node:url";
import { statSync } from "node:fs";
import { getCollection } from "astro:content";

const root = fileURLToPath(new URL(".", import.meta.url));
console.log("[preload] cwd=", process.cwd(), "setup root=", root);

try {
  const exists = !!statSync("src/content/blog"); // relative to cwd
  console.log("[preload] src/content/blog exists?", exists);
} catch {
  console.log("[preload] src/content/blog exists? false");
}

getCollection("blog")
  .then((list) => {
    console.log("[preload] initial blog count =", list.length);
  })
  .catch((e) => {
    console.log("[preload] initial getCollection error:", e?.message);
  });
