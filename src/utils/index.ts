// Common
export {
  collapseSlashes,
  trimSlashes,
  ensureLeadingSlash,
  ensureTrailingSlash,
  normalizePath,
  normalizeFilePath,
  convertLocalPathToSlug
} from "./common/normalization.ts";

// Localization
export { locales, astroLocales, defaultLocale, type LocalePath } from "./i18n/locales.ts";
export {
  localizePath,
  neutralizePath,
  pathsForAllLocales,
  localeByPath,
  getLangFromUrl,
  getLangFromId,
  getAlternateLocalesByURL,
  getAlternateLocalesByLang
} from "./i18n/path.ts";
export { type StringLeaves, buildStrictSchema } from "./i18n/schemaBuilder.ts";
export { GenericDictLoader, type DictGlob } from "./i18n/genericDictLoader.ts";
export { uiLoader, metaLoader } from "./i18n/dictBuilder.ts";

// Routing
export { pages, nonLocalizedPages } from "./routing/pages.ts";
export { pageExistsForLocale, altLocalesFor } from "./routing/routes.ts";
export { encodeTagPath, buildTagPath, buildTagPaths } from "./routing/urlBuilders.ts";

// Content
export {
  type GetCollection,
  type ContentManifest,
  getContentManifest,
  buildContentManifest,
  __resetContentManifest
} from "./content/manifest.ts";
export { filterEntriesByLang, byLang } from "./content/filter.ts";
