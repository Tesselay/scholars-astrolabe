import type { HTMLAttributes } from "astro/types";
import { type JSX } from "astro/jsx-runtime";
import type { PatchOptions } from "@/types/attributes";
import { normalizeClasses, normalizeStyles } from "@/utils";

// TODO: No duplicated attributes, classes or styles
// TODO: Overwriting ability
// TODO: No styles with missing key or value

export function buildElementProps<Type extends keyof JSX.DefinedIntrinsicElements>(
  options: PatchOptions<Type> = {}
): Partial<HTMLAttributes<Type>> {
  const { classList, styleList, decorative = false, attributes } = options;

  const result: Record<string, unknown> = { ...(attributes ?? {}) };

  if (classList?.length) {
    const provided = (result["class"] as string | undefined)?.trim();
    const classStr = classList.filter(Boolean).join(" ");
    const merged = [provided, classStr].filter(Boolean).join(" ");
    if (merged) result["class"] = merged;
  }

  if (styleList?.length) {
    const provided = (result["style"] as string | undefined)?.trim();
    const styleStr = styleList.filter(Boolean).map(String).join(";");
    const merged = [provided, styleStr].filter(Boolean).join(";");
    if (merged) result["style"] = merged;
  }

  result["class"] = result["class"] ? normalizeClasses(result["class"] as string) : undefined;
  result["style"] = result["style"] ? normalizeStyles(result["style"] as string) : undefined;

  if (decorative) {
    if (result["aria-hidden"] == null) result["aria-hidden"] = true;
    if (result["inert"] == null) result["inert"] = true;
  }

  return result as Partial<HTMLAttributes<Type>>;
}
