const modules = import.meta.glob(
  ["/src/pages/**", "/src/pages/.well-known/**"],
  { eager: true },
);
export const pages = Object.keys(modules).filter((p) => p.includes("/[lang]/"));
export const nonLocalizedPages = Object.keys(modules).filter(
  (p) => !p.includes("/[lang]/"),
);
