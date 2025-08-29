import { locales, type Locale } from "../locales.ts";
import {
  collapseSlashes,
  ensureLeadingSlash,
  ensureTrailingSlash,
  normalizeNeutralPath,
} from "../utils/path.ts";

const pageModules = import.meta.glob("/src/pages/**/*.astro", { eager: true });

const routesByLang: Record<Locale, Set<string>> = Object.fromEntries(
  locales.map((l) => [l as Locale, new Set<string>()]),
) as Record<Locale, Set<string>>;

for (const filePath of Object.keys(pageModules)) {
  // filePath example: "/src/pages/en/about.astro" or "/src/pages/en/about/index.astro"
  const rel = filePath.replace(/^\/src\/pages/, "");
  const first = rel.split("/")[1];
  if (first && (locales as readonly string[]).includes(first)) {
    const neutral = normalizeNeutralPath(rel);
    const lang = first as Locale;
    routesByLang[lang].add(neutral);
  }
}

export function pageExistsForLocale(
  lang: Locale,
  neutralPath: string,
): boolean {
  // Accept inputs like "/about" or "/about/" or "about"
  const n = collapseSlashes(
    ensureTrailingSlash(ensureLeadingSlash(neutralPath)),
  );
  return routesByLang[lang].has(n);
}
