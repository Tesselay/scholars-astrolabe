import type { DictGlob } from "@/utils/core/i18n/dict/genericDictLoader.ts";

export function fakeGlob(en: unknown, de: unknown, filename: string): DictGlob {
  return {
    [`/virtual/i18n/dictionaries/en/${filename}.json`]: { default: en },
    [`/virtual/i18n/dictionaries/de/${filename}.json`]: { default: de }
  };
}
