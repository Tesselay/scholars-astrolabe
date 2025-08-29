import { defaultLocale, type Locale } from "../locales";
import { UiSchema, UiPartialSchema, type Ui } from "../schemas/ui";
import enUI from "../dictionaries/en/ui.json";
import deUI from "../dictionaries/de/ui.json";

const raw: Record<Locale, unknown> = { en: enUI, de: deUI } as const;

function validate(locale: Locale, data: unknown): Ui | Partial<Ui> {
  const parsed = (
    locale === defaultLocale ? UiSchema : UiPartialSchema
  ).safeParse(data);
  if (!parsed.success) {
    console.error(
      `[i18n] UI dictionary invalid for ${locale}:`,
      parsed.error.format(),
    );
    throw new Error(`Invalid UI dictionary for ${locale}`);
  }
  return parsed.data as Ui | Partial<Ui>;
}

export const uiByLocale = Object.fromEntries(
  Object.entries(raw).map(([l, d]) => [l, validate(l as Locale, d)]),
) as Record<Locale, Ui | Partial<Ui>>;
