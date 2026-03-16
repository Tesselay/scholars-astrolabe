export function fakeGlob<Type>(en: Type, de: Type, filename: string): Promise<Record<string, Type>> {
  return Promise.resolve({
    [`/virtual/i18n/dictionaries/en/${filename}.json`]: en,
    [`/virtual/i18n/dictionaries/de/${filename}.json`]: de
  });
}
