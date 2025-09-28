// Locales
export { locales, defaultLocale, isLocale } from "./locales";
export type { Locale } from "./locales";

// Dict API
export { uiLoader, metaLoader } from "./dictBuilder.ts";
export { type StringLeaves, buildStrictSchema } from "./utils/schemaBuilder.ts";
export { GenericLoader, type DictGlob } from "./utils/genericLoader.ts";

// Constants
export { languages, ogLocales } from "./constants/languages";
export { pages, nonLocalizedPages } from "./constants/routes";

// Utilities
export { filterEntriesByLang, byLang } from "./utils/content";
export {
  getLangFromUrl,
  getLangFromId,
  getAllLocales,
  getAlternateLocalesByURL
} from "./utils/locale";
export {
  pathWithLocale,
  pathsForAllLocales,
  stripLangFromUrlOrId,
  trimSlashes,
  collapseSlashes,
  ensureLeadingSlash,
  ensureTrailingSlash,
  normalizeNeutralPath
} from "./utils/path";
export { buildBlogPostPath, buildTagPath, encodeTagPath, buildTagPaths } from "./utils/urlBuilders";

// Routing
export { pageExistsForLocale, altLocalesFor } from "./routing/routes";

// Manifests
export { getContentManifest } from "./manifests/content";
export type { ContentManifest } from "./manifests/content";
