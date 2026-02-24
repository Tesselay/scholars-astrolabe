import { type LocalePath, localesMap } from "@/utils/core/i18n/locale/locales.ts";

export function assertLocalePath(value: string): asserts value is LocalePath {
  if (!localesMap.has(value as LocalePath)) {
    throw new Error(`[i18n] Invalid locale path: "${value}"`);
  }
}
