export const uiDictModules = () =>
  import.meta.glob("@content/dictionaries/*/ui.json", {
    eager: true,
    import: "default",
  });

export const metaDictModules = () =>
  import.meta.glob("@content/dictionaries/*/meta.json", {
    eager: true,
    import: "default",
  });
