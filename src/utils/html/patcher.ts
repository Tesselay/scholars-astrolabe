import type { AriaProps } from "@/utils";

export interface PatchOptions {
  class?: string[];
  style?: Record<string, string | null>;
  attributes?: Record<string, string>;
  ariaAttributes?: AriaProps;
  overwrite?: string[];
}

export function patchElement(element: Element, options: PatchOptions = {}): Element {
  if (options.overwrite) {
    options.overwrite.forEach((key) => element.removeAttribute(key));
  }

  if (options.class) {
    for (const cls of options.class) {
      element.classList.add(cls);
    }
  }

  if (options.style) {
    for (const [key, value] of Object.entries(options.style)) {
      (element as HTMLElement | SVGElement).style.setProperty(key, value);
    }
  }

  if (options.attributes) {
    for (const [key, value] of Object.entries(options.attributes)) {
      element.setAttribute(key, value);
    }
  }

  if (options.ariaAttributes) {
    for (const [key, value] of Object.entries(options.ariaAttributes)) {
      element.setAttribute(`aria-${key}`, value);
    }
  }

  return element;
}
