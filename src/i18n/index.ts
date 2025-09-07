// Locales
export { locales, defaultLocale, isLocale } from "./locales";
export type { Locale } from "./locales";

// Public Translation API
export { useTranslations } from "./t";

// Meta API
export { getPageMeta } from "./loaders/meta";
export type { PageId, PageMeta, MetaDictionary } from "./schemas/meta";

// Constants
export { languages, ogLocales } from "./constants/languages";
export { pages, nonLocalizedPages } from "./constants/routes";

// Utilities
export { filterEntriesByLang, byLang } from "./utils/content";
export {
  getLangFromUrl,
  getLangFromId,
  getAllLocales,
  getAlternateLocalesByURL,
} from "./utils/locale";
export {
  pathWithLocale,
  pathsForAllLocales,
  stripLangFromUrlOrId,
  trimSlashes,
  collapseSlashes,
  ensureLeadingSlash,
  ensureTrailingSlash,
  normalizeNeutralPath,
} from "./utils/path";
export {
  buildBlogPostPath,
  buildTagPath,
  encodeTagPath,
  buildTagPaths,
} from "./utils/urlBuilders";

// Routing
export { pageExistsForLocale, altLocalesFor } from "./routing/routes";

// Manifests
export { getContentManifest } from "./manifests/content";
export type { ContentManifest } from "./manifests/content";
