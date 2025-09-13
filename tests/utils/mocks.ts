export const mockEN = {
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

export const mockDE = {
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

export const badMockInvalid = {
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

export const badMockEmpty = {
  default: {},
};
