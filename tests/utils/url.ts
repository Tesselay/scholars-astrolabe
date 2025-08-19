export const BASE_URL = process.env.E2E_BASE_URL || "http://127.0.0.1:4321";

export const toAbs = (href: string) => new URL(href, BASE_URL);
