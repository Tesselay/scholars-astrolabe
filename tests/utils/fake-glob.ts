export function fakeGlob<Type>(en: Type, de: Type, filename: string): Record<string, Type> {
  return {
    [`/virtual/i18n/dictionaries/en/${filename}.json`]: en,
    [`/virtual/i18n/dictionaries/de/${filename}.json`]: de
  };
}
