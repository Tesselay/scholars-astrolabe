import type { DictGlob } from "@/i18n/utils/internals.ts";

export function fakeGlob(
  en: { default: unknown },
  de: { default: unknown },
  filename: string,
): DictGlob {
  return {
    [`/virtual/i18n/dictionaries/en/${filename}.json`]: en as {
      default: unknown;
    },
    [`/virtual/i18n/dictionaries/de/${filename}.json`]: de as {
      default: unknown;
    },
  };
}
