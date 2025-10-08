import { parseEnvLike } from "./parse.ts";

const parsed = parseEnvLike(import.meta.env);
export const env = {
  MODE: parsed.MODE,
  MAIN_DOMAIN: parsed.MAIN_DOMAIN,
  ROOT_REDIRECT_PAGE: parsed.ROOT_REDIRECT_PAGE,
  TEST_PAGE: parsed.TEST_PAGE,
  FORCE_HTTP: parsed.FORCE_HTTP,
  DIAG_GRAPH: parsed.DIAG_GRAPH
} as const;
