export const BASE_URL = process.env.E2E_BASE_URL || "http://127.0.0.1:4321";

export const toAbs = (href: string) => new URL(href, BASE_URL);
export const normalize = (s: string) =>
  s.replace(/\s+/g, " ").trim().toLowerCase();
export const escapeRegExp = (s: string) =>
  s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
export const tagPathFromUrl = (url: string, lang: string) =>
  new URL(url).pathname.replace(new RegExp(`^/${lang}/tags/?`), "");

export function parseLangAndSlugFromHref(baseUrl: string, href: string) {
  const url = new URL(href, baseUrl);
  const parts = url.pathname.replace(/^\/+|\/+$/g, "").split("/");
  if (parts.length < 3 || parts[1] !== "blog")
    throw new Error(`Unexpected blog URL: ${url.pathname}`);
  return { lang: parts[0], slug: parts.slice(2).join("/") };
}
