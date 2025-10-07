// Locales
export { locales, defaultLocale, isLocale } from "./locales";
export type { Locale } from "./locales";

// Dict API
export { uiLoader, metaLoader } from "./dictBuilder.ts";
export { type StringLeaves, buildStrictSchema } from "./common/schemaBuilder.ts";
export { GenericLoader, type DictGlob } from "./common/genericLoader.ts";

// Constants
export { languages, ogLocales } from "./constants/languages";
export { pages, nonLocalizedPages } from "./constants/routes";

// HTML
export { buildElementProps } from "./html/patcher";

// Utilities
export { filterEntriesByLang, byLang } from "./common/content";
export {
  getLangFromUrl,
  getLangFromId,
  getAllLocales,
  getAlternateLocalesByURL
} from "./common/locale";
export {
  pathWithLocale,
  pathsForAllLocales,
  stripLangFromUrlOrId,
  trimSlashes,
  collapseSlashes,
  ensureLeadingSlash,
  ensureTrailingSlash,
  normalizeNeutralPath
} from "./common/path";
export {
  buildBlogPostPath,
  buildTagPath,
  encodeTagPath,
  buildTagPaths
} from "./common/urlBuilders";

// Routing
export { pageExistsForLocale, altLocalesFor } from "./routing/routes";

// Manifests
export { getContentManifest } from "./manifests/content";
export type { ContentManifest } from "./manifests/content";
