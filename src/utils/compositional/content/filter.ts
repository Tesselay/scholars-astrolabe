import { type LocaleRoute, locales } from "@utils/core/i18n/locale/definition.ts";

export function filterEntriesByLang<Type extends { id: string }>(
  entries: readonly Type[],
  lang: LocaleRoute
): Type[] {
  const prefix = `${lang}/`;
  return entries.filter((entry) => entry.id.startsWith(prefix));
}

export const byLang =
  <Type extends { id: string }>(lang: LocaleRoute) =>
  (entry: Type) =>
    entry.id.startsWith(`${lang}/`);

export function pathsForAllLocales(): { params: { lang: LocaleRoute } }[] {
  return locales.map((locale) => ({ params: { lang: locale.path } }));
}
