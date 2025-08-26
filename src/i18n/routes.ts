import { ui } from "./ui";
import { stripLangFromUrlOrId } from "./utils";

type Lang = keyof typeof ui;

const pageModules = import.meta.glob("/src/pages/**/*.astro", { eager: true });

const routesByLang: Record<Lang, Set<string>> = Object.fromEntries(
  Object.keys(ui).map((l) => [l as Lang, new Set<string>()]),
) as Record<Lang, Set<string>>;

function normalizeNeutralPath(p: string): string {
  let n = stripLangFromUrlOrId(p);
  n = n.trim();
  if (!n.startsWith("/")) n = "/" + n;
  n = n
    .replace(/index\.astro$/, "")
    .replace(/\.astro$/, "")
    .replace(/\/+/g, "/");
  if (!n.endsWith("/")) n = n + "/";
  return n;
}

for (const filePath of Object.keys(pageModules)) {
  // filePath example: "/src/pages/en/about.astro" or "/src/pages/en/about/index.astro"
  const rel = filePath.replace(/^\/src\/pages/, ""); // e.g., "/en/about.astro"
  const first = rel.split("/")[1];
  if (first && first in ui) {
    const neutral = normalizeNeutralPath(rel);
    const lang = first as Lang;
    routesByLang[lang].add(neutral);
  }
}

export function pageExistsForLocale(lang: Lang, neutralPath: string): boolean {
  // Accept inputs like "/about" or "/about/" or "about"
  let n = neutralPath;
  if (!n.startsWith("/")) n = "/" + n;
  if (!n.endsWith("/")) n = n + "/";
  n = n.replace(/\/+/g, "/");
  return routesByLang[lang].has(n);
}
