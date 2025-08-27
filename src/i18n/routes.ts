import { ui } from "./ui";
import {
  normalizeNeutralPath,
  ensureLeadingSlash,
  ensureTrailingSlash,
  collapseSlashes,
} from "./utils";

type Lang = keyof typeof ui;

const pageModules = import.meta.glob("/src/pages/**/*.astro", { eager: true });

const routesByLang: Record<Lang, Set<string>> = Object.fromEntries(
  Object.keys(ui).map((l) => [l as Lang, new Set<string>()]),
) as Record<Lang, Set<string>>;

for (const filePath of Object.keys(pageModules)) {
  // filePath example: "/src/pages/en/about.astro" or "/src/pages/en/about/index.astro"
  const rel = filePath.replace(/^\/src\/pages/, "");
  const first = rel.split("/")[1];
  if (first && first in ui) {
    const neutral = normalizeNeutralPath(rel);
    const lang = first as Lang;
    routesByLang[lang].add(neutral);
  }
}

export function pageExistsForLocale(lang: Lang, neutralPath: string): boolean {
  // Accept inputs like "/about" or "/about/" or "about"
  const n = collapseSlashes(
    ensureTrailingSlash(ensureLeadingSlash(neutralPath)),
  );
  return routesByLang[lang].has(n);
}
