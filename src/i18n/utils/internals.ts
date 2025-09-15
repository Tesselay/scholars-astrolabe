export type DictGlob = Record<string, { default: unknown }>;

const dictModules: DictGlob = import.meta.glob("@/i18n/dictionaries/*/*.json", {
  eager: true,
});

export function loadDictFiles(filename: string): DictGlob {
  const wanted = filename.endsWith(".json") ? filename : `${filename}.json`;
  const out: DictGlob = {};
  for (const path in dictModules) {
    if (path.endsWith(`/${wanted}`)) {
      out[path] = dictModules[path];
    }
  }
  return out;
}
