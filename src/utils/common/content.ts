import type { LocalePath } from "@/utils/locales";

export function filterEntriesByLang<T extends { id: string }>(
  entries: readonly T[],
  lang: LocalePath
): T[] {
  const prefix = `${lang}/`;
  return entries.filter((e) => e.id.startsWith(prefix));
}

export const byLang =
  <T extends { id: string }>(lang: LocalePath) =>
  (e: T) =>
    e.id.startsWith(`${lang}/`);
