import type { JSX } from "astro/jsx-runtime";
import type { HTMLAttributes } from "astro/types";

type PatcherAttributes<Type extends keyof JSX.DefinedIntrinsicElements> = Partial<
  HTMLAttributes<Type>
> &
  Record<`data-${string}`, string | number | boolean | null | undefined>;

export interface PatchOptions<Type extends keyof JSX.DefinedIntrinsicElements> {
  classList?: Array<string | false | null | undefined>;
  styleList?: Array<string | false | null | undefined>;
  decorative?: boolean;
  attributes?: PatcherAttributes<Type>;
}
