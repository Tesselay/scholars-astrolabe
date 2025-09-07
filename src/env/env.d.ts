// declare global to merge with vite's declarations
declare global {
  type Mode = "development" | "test" | "production";

  interface ImportMetaEnv {
    /** Vite built-ins (narrowed for type safety) */
    readonly MODE: Mode;

    /** Vite built-ins (kept for completeness) */
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly SSR: boolean;
    readonly BASE_URL: string;

    /** App specific variables */
    readonly MAIN_DOMAIN: string;
    readonly ROOT_REDIRECT_PAGE: "true" | "false";
    readonly FORCE_HTTP?:
      | "true"
      | "false"
      | "1"
      | "0"
      | "yes"
      | "no"
      | "on"
      | "off";
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
