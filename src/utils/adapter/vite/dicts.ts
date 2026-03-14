export const uiDictModules = <Ui>() => import.meta.glob<Ui>("../../../content/dictionaries/*/ui.json", {
  eager: true,
  import: "default",
});

export const metaDictModules = <Meta>() => import.meta.glob<Meta>("../../../content/dictionaries/*/meta.json", {
  eager: true,
  import: "default",
});
