import { z } from "zod";

const EnvSchema = z.object({
  MAIN_DOMAIN: z.string().default("127.0.0.1"),
  ROOT_REDIRECT_PAGE: z.coerce.boolean().default(false),
});

const parsed = EnvSchema.parse(import.meta.env);

export const env = {
  MAIN_DOMAIN: parsed.MAIN_DOMAIN,
  ROOT_REDIRECT_PAGE: parsed.ROOT_REDIRECT_PAGE,
};
