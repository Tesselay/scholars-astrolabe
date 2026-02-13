// Locales
export { locales, defaultLocale, localeByPath } from "./locales";
export type { LocalePath } from "./locales";

// Dict API
export { uiLoader, metaLoader } from "./dictBuilder.ts";
export { type StringLeaves, buildStrictSchema } from "./common/schemaBuilder.ts";
export { GenericLoader, type DictGlob } from "./common/genericLoader.ts";

// Constants
export { pages, nonLocalizedPages } from "./constants/routes";

// Utilities
export { filterEntriesByLang, byLang } from "./common/content";
export { getLangFromUrl, getLangFromId, getAlternateLocalesByURL } from "./common/locale";
export {
  localizePath,
  pathsForAllLocales,
  stripLangFromUrlOrId,
  trimSlashes,
  collapseSlashes,
  ensureLeadingSlash,
  ensureTrailingSlash,
  neutralizePath,
  normalizePath,
  pathHasLocale
} from "./common/path";
export { buildTagPath, encodeTagPath, buildTagPaths } from "./common/urlBuilders";

// Routing
export { pageExistsForLocale, altLocalesFor, normalizeFilePath } from "./routing/routes";

// Manifests
export { getContentManifest } from "./manifests/content";
export type { ContentManifest } from "./manifests/content";
