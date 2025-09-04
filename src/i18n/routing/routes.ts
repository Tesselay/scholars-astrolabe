import { type Locale } from "../locales";
import { type ContentManifest } from "../manifests/content";
import { pages, nonLocalizedPages } from "../constants/routes";
import { convertLocalPathToSlug, normalizeNeutralPath } from "../utils/path";
import { getAlternateLocalesByLang } from "../utils/locale";

const mNonLocalizedPages = new Set(
  nonLocalizedPages.map((p) => convertLocalPathToSlug(p)),
);
const mPages = new Set(pages.map((p) => convertLocalPathToSlug(p)));

function staticPageExists(neutralPath: string): boolean {
  const path = normalizeNeutralPath(neutralPath);
  return mNonLocalizedPages.has(path);
}

function dynamicPageExists(neutralPath: string): boolean {
  const path = normalizeNeutralPath(neutralPath);
  return mPages.has(path);
}

function parseContentPath(
  neutralPath: string,
):
  | { kind: "blog-post"; slug: string }
  | { kind: "page" }
  | { kind: "static-page" }
  | { kind: "not-found" } {
  const path = normalizeNeutralPath(neutralPath);
  const blogMatch = path.match(/^\/blog\/(.+?)\/$/);
  if (blogMatch) {
    return { kind: "blog-post", slug: blogMatch[1] };
  } else if (dynamicPageExists(neutralPath)) {
    return { kind: "page" };
  } else if (staticPageExists(neutralPath)) {
    return { kind: "static-page" };
  }

  return { kind: "not-found" };
}

export function pageExistsForLocale(
  locale: Locale,
  neutralPath: string,
  manifest: ContentManifest,
): boolean {
  const parsed = parseContentPath(neutralPath);
  if (parsed.kind === "blog-post") {
    return manifest.blogPostExists(locale, parsed.slug);
  } else if (parsed.kind === "page") {
    return true;
  }
  return false;
}

export function altLocalesFor(
  currentLocale: Locale,
  neutralPath: string,
  manifest: ContentManifest,
): Locale[] {
  const parsed = parseContentPath(neutralPath);
  const candidates = getAlternateLocalesByLang(currentLocale);

  if (parsed.kind === "blog-post") {
    return candidates.filter((l) => manifest.blogPostExists(l, parsed.slug));
  }
  if (parsed.kind === "page") {
    return candidates;
  }

  return [];
}
