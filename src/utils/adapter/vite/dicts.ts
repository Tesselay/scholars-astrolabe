const uiDictModules = <Ui>() => Promise.resolve(import.meta.glob<Ui>("../../../content/dictionaries/*/ui.json",
  {
    eager: true,
    import: "default",
  }));

const metaDictModules = <Meta>() => Promise.resolve(import.meta.glob<Meta>("../../../content/dictionaries/*/meta.json",
  {
    eager: true,
    import: "default",
  }));

export { metaDictModules, uiDictModules };
