export function collapseSlashes(str: string): string {
  return String(str).replace(/\/+/g, "/");
}

export function trimSlashes(str: string): string {
  return String(str).replace(/^\/+|\/+$/g, "");
}

export function ensureLeadingSlash(str: string): string {
  const collapsed = collapseSlashes(String(str));
  return collapsed.startsWith("/") ? collapsed : "/" + collapsed.replace(/^\/+/, "");
}

export function ensureTrailingSlash(str: string): string {
  return str.endsWith("/") ? str : str + "/";
}
