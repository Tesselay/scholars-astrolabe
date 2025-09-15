export type DictGlob = Record<string, { default: unknown }>;

export function loadDictFiles(filename: string): DictGlob {
  const fileGlob = `@/i18n/dictionaries/*/${filename}.json`;
  return import.meta.glob(fileGlob, { eager: true });
}
