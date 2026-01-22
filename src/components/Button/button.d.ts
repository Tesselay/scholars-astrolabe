import type { HTMLAttributes } from "astro/types";

export interface ButtonBase extends Pick<HTMLAttributes<"button">, "disabled"> {
  variant?: "primary" | "ghost" | "icon" | "danger";
  size?: "xs" | "s" | "m" | "l" | "xl";
  color?: string;
}
