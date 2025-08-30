import { defaultLocale, type Locale } from "./locales";
import { uiByLocale } from "@/i18n/loaders/ui";

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
    // Defensive: empty key should not return an object tree; return empty string
    if (path === "") return "";

    const local = get(uiByLocale[lang], path);
    if (typeof local === "string") return local;

    if (import.meta.env?.MODE !== "production") {
      console.warn(
        `[i18n] Missing key "${path}" for ${lang}; falling back to ${defaultLocale}`,
      );
    }

    const fallback = get(uiByLocale[defaultLocale], path);
    if (typeof fallback === "string") return fallback;

    return path; // last-resort: echo the key
  };
}
