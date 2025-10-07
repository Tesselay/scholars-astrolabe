import type { JSX } from "astro/jsx-runtime";
import type { HTMLAttributes } from "astro/types";

export type PatcherAttributes<Type extends keyof JSX.DefinedIntrinsicElements> = Partial<
  HTMLAttributes<Type>
> &
  Record<`data-${string}`, string | number | boolean | null | undefined>;

export interface PatchOptions<Type extends keyof JSX.DefinedIntrinsicElements> {
  cssClass?: Array<string | false | null | undefined>;
  style?: Array<string | false | null | undefined>;
  decorative?: boolean;
  attributes?: PatcherAttributes<Type>;
}
