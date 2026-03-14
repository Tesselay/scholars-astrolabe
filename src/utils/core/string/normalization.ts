function collapseSlashes(str: string): string {
  return String(str).replace(/\/+/g, "/");
}

function trimSlashes(str: string): string {
  return String(str).replace(/^\/+|\/+$/g, "");
}

function ensureLeadingSlash(str: string): string {
  const collapsed = collapseSlashes(String(str));

  return collapsed.startsWith("/") ? collapsed : "/" + collapsed.replace(/^\/+/, "");
}

function ensureTrailingSlash(str: string): string {
  return str.endsWith("/") ? str : str + "/";
}

export { collapseSlashes, ensureLeadingSlash, ensureTrailingSlash, trimSlashes };
