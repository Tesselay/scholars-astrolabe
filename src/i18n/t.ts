import { defaultLocale, type Locale } from "./locales";
import { uiByLocale } from "./loaders/ui";

function get(obj: unknown, path: string): unknown {
  if (!path) return obj;
  return path.split(".").reduce<unknown>((acc, k) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj);
}

export function useTranslations(lang: Locale) {
  return function t(path: string): string {
    const local = get(uiByLocale[lang], path);
    if (local != null) return local as string;

    const fallback = get(uiByLocale[defaultLocale], path);
    if (import.meta.env?.MODE !== "production") {
      console.warn(
        `[i18n] Missing key "${path}" for ${lang}; falling back to ${defaultLocale}`,
      );
    }
    return (fallback as string) ?? path; // last-resort: echo the key
  };
}
