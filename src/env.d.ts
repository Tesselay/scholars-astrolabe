interface ImportMetaEnv {
  readonly MAIN_DOMAIN: string;
  readonly ROOT_REDIRECT_PAGE: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
