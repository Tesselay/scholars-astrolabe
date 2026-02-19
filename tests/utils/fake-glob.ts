import type { DictGlob } from "@/utils/core/i18n/dict/genericDictLoader.ts";

export function fakeGlob(en: unknown, de: unknown, filename: string): DictGlob<unknown> {
  return {
    [`/virtual/i18n/dictionaries/en/${filename}.json`]: en,
    [`/virtual/i18n/dictionaries/de/${filename}.json`]: de
  };
}
