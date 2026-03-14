export interface ButtonBase {
  variant?: "primary" | "ghost" | "icon" | "danger";
  size?: "xs" | "s" | "m" | "l" | "xl";
  color?: string | undefined | null;
}

export function getButtonClasses(variant?: ButtonBase["variant"], size?: ButtonBase["size"]) {
  return [
    "btn",
    variant && `btn--${variant}`,
    size && `btn--${size}`,
  ];
}
