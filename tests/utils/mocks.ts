export const mockMetaEN = {
  default: {
    site: { name: "Site EN" },
    home: { title: "Home EN", description: "Desc EN" },
    folio: { title: "Folio EN" },
    "blog:index": { title: "Blog Index EN" },
    "blog:page": { title: "Blog Page EN" },
    contact: { title: "Contact EN" },
    "tags:index": { title: "Tags Index EN" },
    "tags:page": { title: "Tags Page EN" },
  },
};

export const mockMetaDE = {
  default: {
    site: { name: "Site DE" },
    home: { title: "Home DE" },
    folio: { title: "Folio DE" },
    "blog:index": { title: "Blog Index DE" },
    "blog:page": { title: "Blog Page DE" },
    contact: { title: "Contact DE" },
    "tags:index": { title: "Tags Index DE" },
    "tags:page": { title: "Tags Page DE" },
  },
};

export const mockMetaInvalid = {
  default: {
    site: { name: "Site DE" },
    home: { title: 42 },
    folio: { title: "Folio DE" },
    "blog:index": { title: "Blog Index DE" },
    "blog:page": { title: "Blog Page DE" },
    contact: { title: "Contact DE" },
    "tags:index": { title: "Tags Index DE" },
    "tags:page": { title: "Tags Page DE" },
  },
};

export const mockMetaEmpty = {
  default: {},
};

export const mockUiEN = {
  default: {
    nav: {
      home: "Home EN",
      portfolio: "Portfolio EN",
      blog: "Blog EN",
      contact: "Contact EN",
    },
  },
};

export const mockUiDE = {
  default: {
    nav: {
      home: "Startseite DE",
      portfolio: "Portfolio DE",
      blog: "Blog DE",
      contact: "Kontakt DE",
    },
  },
};

export const mockUiInvalid = {
  default: {
    nav: {
      home: 42,
      portfolio: "Portfolio",
      blog: "Blog",
      contact: "Contact",
    },
  },
};

export const mockUiEmpty = {
  default: {},
};

export const mockUiExtra = {
  default: {
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      blog: "Blog",
      contact: "Contact",
      extra: "Extra",
    },
  },
};
