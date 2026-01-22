import type { ButtonBase } from "@/components/Button/button.d.ts";

export function getButtonClasses(props: ButtonBase) {
  return ["btn", props.variant && `btn--${props.variant}`, props.size && `btn--${props.size}`];
}

export function getButtonStyles(props: ButtonBase) {
  return [props.color && `--btn-accent: ${props.color}`];
}
