import type { HTMLAttributes } from "astro/types";
import { type JSX } from "astro/jsx-runtime";
import type { PatchOptions } from "@/types/attributes";

export function buildElementProps<Type extends keyof JSX.DefinedIntrinsicElements>(
  options: PatchOptions<Type> = {}
): Partial<HTMLAttributes<Type>> {
  const { cssClass, style, decorative = false, attributes } = options;

  const result: Record<string, unknown> = { ...(attributes ?? {}) };

  if (cssClass?.length) {
    const provided = (result["class"] as string | undefined)?.trim();
    const classStr = cssClass.filter(Boolean).map(String).join(" ").trim();
    const merged = [provided, classStr].filter(Boolean).join(" ");
    if (merged) result["class"] = merged;
  }

  if (style?.length) {
    const provided = (result["style"] as string | undefined)?.trim();
    const styleStr = style
      .filter(Boolean)
      .map(String)
      .join(";")
      .replace(/;;+/g, ";")
      .replace(/(^;|;$)/g, "")
      .trim();
    const merged = [provided, styleStr]
      .filter(Boolean)
      .join(";")
      .replace(/;;+/g, ";")
      .replace(/(^;|;$)/g, "")
      .trim();
    if (merged) result["style"] = merged;
  }

  if (decorative) {
    if (result["aria-hidden"] == null) result["aria-hidden"] = true;
    if (result["inert"] == null) result["inert"] = true;
  }

  return result as Partial<HTMLAttributes<Type>>;
}
