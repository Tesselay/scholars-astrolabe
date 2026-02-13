import { type LocalePath } from "../i18n/locales.ts";
import { type ContentManifest } from "@/utils/content/manifest.ts";
import { nonLocalizedPages, pages } from "./pages.ts";
import { getAlternateLocalesByLang } from "@/utils/i18n/path.ts";
import { convertLocalPathToSlug, normalizeFilePath } from "@/utils/common/normalization.ts";

const mNonLocalizedPages = new Set(nonLocalizedPages.map((p) => convertLocalPathToSlug(p)));
const mPages = new Set(pages.map((p) => convertLocalPathToSlug(p)));
// Precompute base paths for dynamic routes using raw page module keys
// Example: "/src/pages/[lang]/tags/[...slug].astro" -> base "/src/pages/[lang]/tags" -> slug "/tags/"
const mDynamicBases = new Set(
  pages
    .filter((p) => p.includes("/["))
    .map((p) => {
      const langMarker = "/[lang]/";
      const afterLangIdx = p.indexOf(langMarker) + langMarker.length;
      const dynIdx = p.indexOf("/[", afterLangIdx);
      if (dynIdx === -1) return null;
      const basePath = p.slice(0, dynIdx); // up to the segment before the dynamic token
      return convertLocalPathToSlug(basePath);
    })
    .filter((v): v is string => Boolean(v))
);

function staticPageExists(neutralPath: string): boolean {
  const path = normalizeFilePath(neutralPath);
  return mNonLocalizedPages.has(path);
}

function dynamicPageExists(neutralPath: string): boolean {
  const path = normalizeFilePath(neutralPath);
  if (mPages.has(path)) return true;
  for (const base of mDynamicBases) {
    if (path.startsWith(base)) return true;
  }
  return false;
}

function parseContentPath(
  neutralPath: string
):
  | { kind: "blog-post"; slug: string }
  | { kind: "tag"; slug: string }
  | { kind: "page" }
  | { kind: "static-page" }
  | { kind: "not-found" } {
  const path = normalizeFilePath(neutralPath);
  const blogMatch = path.match(/^\/blog\/(.+?)$/);
  if (blogMatch) {
    return { kind: "blog-post", slug: blogMatch[1] };
  }
  const tagMatch = path.match(/^\/tags\/(.+?)$/);
  if (tagMatch) {
    const slug = tagMatch[1];
    return { kind: "tag", slug };
  }
  if (dynamicPageExists(neutralPath)) {
    return { kind: "page" };
  }
  if (staticPageExists(neutralPath)) {
    return { kind: "static-page" };
  }

  return { kind: "not-found" };
}

export function pageExistsForLocale(
  locale: LocalePath,
  neutralPath: string,
  manifest: ContentManifest
): boolean {
  const parsed = parseContentPath(neutralPath);
  if (parsed.kind === "blog-post") {
    return manifest.blogPostExists(locale, parsed.slug);
  }
  if (parsed.kind === "tag") {
    return manifest.tagExists?.(locale, parsed.slug);
  }
  if (parsed.kind === "page") {
    return true;
  }
  return false;
}

export function altLocalesFor(
  currentLocale: LocalePath,
  neutralPath: string,
  manifest: ContentManifest
): LocalePath[] {
  const parsed = parseContentPath(neutralPath);
  const locales = getAlternateLocalesByLang(currentLocale);

  if (parsed.kind === "blog-post") {
    return locales
      .filter((locale) => manifest.blogPostExists(locale.path, parsed.slug))
      .map((locale) => locale.path);
  }
  if (parsed.kind === "tag") {
    return locales
      .filter((locale) => manifest.tagExists?.(locale.path, parsed.slug))
      .map((locale) => locale.path);
  }
  if (parsed.kind === "page") {
    return locales.map((locale) => locale.path);
  }

  return [];
}
