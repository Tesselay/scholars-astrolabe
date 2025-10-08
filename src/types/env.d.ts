// declare global to merge with vite's declarations
declare global {
  type Mode = "development" | "test" | "production";
  type booleanish = "true" | "false" | "1" | "0" | "yes" | "no" | "on" | "off";

  interface ImportMetaEnv {
    /* Vite built-ins (narrowed for type safety) */
    readonly MODE: Mode;

    /* Vite built-ins (kept for completeness) */
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly SSR: boolean;
    readonly BASE_URL: string;

    /* App specific variables */
    readonly MAIN_DOMAIN: string;
    readonly ROOT_REDIRECT_PAGE: booleanish;
    readonly TEST_PAGE: booleanish;
    readonly FORCE_HTTP?: booleanish;
    readonly DIAG_GRAPH?: booleanish;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
