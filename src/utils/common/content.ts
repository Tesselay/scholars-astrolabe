import { type Locale } from "../locales.ts";

export function filterEntriesByLang<T extends { id: string }>(
  entries: readonly T[],
  lang: Locale
): T[] {
  const prefix = `${lang}/`;
  return entries.filter((e) => e.id.startsWith(prefix));
}

export const byLang =
  <T extends { id: string }>(lang: Locale) =>
  (e: T) =>
    e.id.startsWith(`${lang}/`);
