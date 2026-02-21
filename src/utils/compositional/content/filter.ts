import type { LocalePath } from "@/utils/core/i18n/locale/locales.ts";

export function filterEntriesByLang<Type extends { id: string }>(
  entries: readonly Type[],
  lang: LocalePath
): Type[] {
  const prefix = `${lang}/`;
  return entries.filter((entry) => entry.id.startsWith(prefix));
}

export const byLang =
  <Type extends { id: string }>(lang: LocalePath) =>
  (entry: Type) =>
    entry.id.startsWith(`${lang}/`);
