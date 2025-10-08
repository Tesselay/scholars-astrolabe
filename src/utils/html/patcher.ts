import type { HTMLAttributes } from "astro/types";
import { type JSX } from "astro/jsx-runtime";
import type { PatchOptions } from "@/types/attributes";

export function buildElementProps<Type extends keyof JSX.DefinedIntrinsicElements>(
  options: PatchOptions<Type> = {}
): Partial<HTMLAttributes<Type>> {
  const { classList, styleList, decorative = false, attributes } = options;

  const result: Record<string, unknown> = { ...(attributes ?? {}) };

  if (classList?.length) {
    const provided = (result["class"] as string | undefined)?.trim();
    const classStr = classList
      .filter(Boolean)
      // @ts-expect-error: Item won't ever be null or undefined after filter
      .map((s) => s.toString().trim())
      .join(" ")
      .trim();
    const merged = [provided, classStr].filter(Boolean).join(" ");
    if (merged) result["class"] = merged;
  }

  if (styleList?.length) {
    const provided = (result["style"] as string | undefined)?.trim();
    const styleStr = styleList
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
