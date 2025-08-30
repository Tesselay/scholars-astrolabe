import { z } from "zod";

const ModeSchema = z.enum(["development", "test", "production"]);
export type Mode = z.infer<typeof ModeSchema>;

const EnvSchema = z.object({
  MODE: ModeSchema.default("development"),
  MAIN_DOMAIN: z.string().default("127.0.0.1"),
  ROOT_REDIRECT_PAGE: z.coerce.boolean().default(false),
});

const parsed = EnvSchema.parse(import.meta.env);

export const env = {
  MODE: parsed.MODE,
  MAIN_DOMAIN: parsed.MAIN_DOMAIN,
  ROOT_REDIRECT_PAGE: parsed.ROOT_REDIRECT_PAGE,
} as const;
