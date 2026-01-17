import type { JSX } from "astro/jsx-runtime";
import type { HTMLAttributes } from "astro/types";

export interface PatchOptions<Type extends keyof JSX.DefinedIntrinsicElements> {
  classList?: Array<string | false | null | undefined>;
  styleList?: Array<string | false | null | undefined>;
  decorative?: boolean;
  attributes?: HTMLAttributes<Type>;
}
