// declare global to merge with vite's declarations
declare global {
  type Mode = "development" | "test" | "production";

  interface ImportMetaEnv {
    /** Vite built-ins (we narrow it for type safety) */
    readonly MODE: Mode;

    /** Vite built-ins (kept for completeness) */
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly SSR: boolean;
    readonly BASE_URL: string;

    /** App specific variables */
    readonly MAIN_DOMAIN: string;
    readonly ROOT_REDIRECT_PAGE: "true" | "false";
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
