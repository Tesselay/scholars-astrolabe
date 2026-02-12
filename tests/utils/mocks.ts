export const mockMetaEN = {
  site: { name: "Site EN" },
  home: { title: "Home EN", description: "Home Desc EN" },
  folio: { title: "Folio EN", description: "Folio Desc EN" },
  "blog:index": { title: "Blog Index EN", description: "Blog Index Desc EN" },
  "blog:page": { title: "Blog Page EN", description: "Blog Page Desc EN" },
  contact: { title: "Contact EN", description: "Contact Desc EN" },
  "tags:index": { title: "Tags Index EN", description: "Tags Index Desc EN" },
  "tags:page": { title: "Tags Page EN", description: "Tags Page Desc EN" }
};

export const mockMetaDE = {
  site: { name: "Site DE" },
  home: { title: "Home DE", description: "Home Desc DE" },
  folio: { title: "Folio DE", description: "Folio Desc DE" },
  "blog:index": { title: "Blog Index DE", description: "Blog Index Desc DE" },
  "blog:page": { title: "Blog Page DE", description: "Blog Page Desc DE" },
  contact: { title: "Contact DE", description: "Contact Desc DE" },
  "tags:index": { title: "Tags Index DE", description: "Tags Index Desc DE" },
  "tags:page": { title: "Tags Page DE", description: "Tags Page Desc DE" }
};

export const mockMetaInvalid = {
  site: { name: "Site DE" },
  home: { title: 42 },
  folio: { title: "Folio DE" },
  "blog:index": { title: "Blog Index DE" },
  "blog:page": { title: "Blog Page DE" },
  contact: { title: "Contact DE" },
  "tags:index": { title: "Tags Index DE" },
  "tags:page": { title: "Tags Page DE" }
};

export const mockMetaEmpty = {};

export const mockUiEN = {
  nav: {
    home: "Home EN",
    portfolio: "Portfolio EN",
    blog: "Blog EN",
    contact: "Contact EN"
  }
};

export const mockUiDE = {
  nav: {
    home: "Startseite DE",
    portfolio: "Portfolio DE",
    blog: "Blog DE",
    contact: "Kontakt DE"
  }
};

export const mockUiInvalid = {
  nav: {
    home: 42,
    portfolio: "Portfolio",
    blog: "Blog",
    contact: "Contact"
  }
};

export const mockUiEmpty = {};

export const mockUiExtra = {
  nav: {
    home: "Home",
    portfolio: "Portfolio",
    blog: "Blog",
    contact: "Contact",
    extra: "Extra"
  }
};

export const mockBlog = [
  { id: "en/p1", data: {} },
  { id: "de/p2", data: {} },
  { id: "en/blog/p3", data: {} },
  { id: "en/blog/p3", data: { language: "de" } },
  { id: "de/x1", data: { language: "xx" } },
  { id: "de/dup", data: {} },
  { id: "de/dup", data: {} }
];

export const mockBlogInvalid = [
  { id: "xx/p1", data: {} },
  { id: "de/p2", data: {} },
  { id: "en/blog/p3", data: {} },
  { id: "en/blog/p3", data: { language: "xx" } },
  { id: "de/x1", data: { language: "de" } }
];
