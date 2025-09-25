import type { DictGlob } from "@/i18n";

export function fakeGlob(en: unknown, de: unknown, filename: string): DictGlob {
  return {
    [`/virtual/i18n/dictionaries/en/${filename}.json`]: { default: en },
    [`/virtual/i18n/dictionaries/de/${filename}.json`]: { default: de },
  };
}
