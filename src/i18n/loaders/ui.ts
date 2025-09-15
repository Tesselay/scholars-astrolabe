import { locales, type Locale } from "../locales";
import { UiSchema, type Ui } from "../schemas/ui";
import { type DictGlob, loadDictFiles } from "../utils/internals.ts";

let UI: Readonly<Record<Locale, Ui>> | null = null;

function validate(locale: Locale, data: unknown): Ui {
  const parsed = UiSchema.safeParse(data);
  if (!parsed.success) {
    console.error(
      `[i18n:UI] Invalid UI dictionary for ${locale}:`,
      parsed.error.format(),
    );
    throw new Error(`Invalid UI dictionary for ${locale}`);
  }
  return parsed.data;
}

export async function initUi(
  files: DictGlob = loadDictFiles("ui"),
): Promise<void> {
  const acc: Partial<Record<Locale, Ui>> = {};
  for (const [path, mod] of Object.entries(files)) {
    const lang = path.split("/").at(-2) as Locale | undefined;
    if (!lang || !locales.includes(lang)) continue;
    acc[lang] = validate(lang, mod.default);
  }
  UI = Object.freeze(acc) as Readonly<Record<Locale, Ui>>;
}

export function getUi(locale: Locale): Ui {
  if (!UI) {
    throw new Error(
      "[i18n:UI] getUi() called before dictionaries were loaded. Use getUiAsync() or call initUi() in setup.",
    );
  }
  return UI[locale];
}

export async function getUiAsync(locale: Locale): Promise<Ui> {
  if (!UI) await initUi();
  return getUi(locale);
}

export function __resetUI() {
  UI = null;
}
