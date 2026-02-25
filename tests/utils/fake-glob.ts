export function fakeGlob(en: unknown, de: unknown, filename: string): Record<string, unknown> {
  return {
    [`/virtual/i18n/dictionaries/en/${filename}.json`]: en,
    [`/virtual/i18n/dictionaries/de/${filename}.json`]: de
  };
}
