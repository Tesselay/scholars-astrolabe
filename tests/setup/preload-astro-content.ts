// @vitest-environment node
import { dev } from "astro";

let server: Awaited<ReturnType<typeof dev>> | undefined;

async function waitForContentLayer() {
  // Import inside the function so it resolves after Astro dev is up
  const { getCollection } = await import("astro:content");

  const deadline = Date.now() + 10_000; // 10s max
  let lastErr: unknown;

  while (Date.now() < deadline) {
    try {
      await getCollection("blog");
      return;
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  throw new Error(
    "Content layer never initialized for 'blog'. Last error: " +
      (lastErr instanceof Error ? lastErr.message : String(lastErr)),
  );
}

export async function setup() {
  console.log("[global-setup] starting Astro dev… cwd=", process.cwd());
  server = await dev({
    root: process.cwd(),
    logLevel: "silent",
  });
  await waitForContentLayer();
  console.log("[global-setup] content layer ready");
}

export async function teardown() {
  console.log("[global-setup] stopping Astro dev…");
  await server?.stop();
}
