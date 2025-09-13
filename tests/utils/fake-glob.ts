import type { MetaGlob } from "@/i18n/loaders/meta.ts";

export function fakeGlob(
  en: { default: unknown },
  de: { default: unknown },
): MetaGlob {
  return {
    "/virtual/i18n/dictionaries/en/meta.json": en as { default: unknown },
    "/virtual/i18n/dictionaries/de/meta.json": de as { default: unknown },
  };
}
