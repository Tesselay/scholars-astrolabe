export const uiDictModules = () =>
  import.meta.glob("@/utils/core/i18n/dict/dictionaries/*/ui.json", {
    eager: true,
    import: "default"
  });

export const metaDictModules = () =>
  import.meta.glob("@/utils/core/i18n/dict/dictionaries/*/meta.json", {
    eager: true,
    import: "default"
  });
