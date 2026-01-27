import type { ButtonBase } from "@/components/Button/button.d.ts";

export function getButtonClasses(variant?: ButtonBase["variant"], size?: ButtonBase["size"]) {
  return ["btn", variant && `btn--${variant}`, size && `btn--${size}`];
}

export function getButtonStyles(color?: ButtonBase["color"]) {
  return color ? { "--btn-accent": color } : {};
}
