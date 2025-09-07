import { z } from "zod";

export const ModeSchema = z.enum(["development", "test", "production"]);
export type Mode = z.infer<typeof ModeSchema>;

const truthy = z
  .string()
  .transform((s) => ["1", "true", "yes", "on"].includes(s.toLowerCase()));

export const EnvSchema = z.object({
  MODE: ModeSchema.default("development"),
  MAIN_DOMAIN: z.string().default("127.0.0.1:4321"),
  ROOT_REDIRECT_PAGE: z.union([z.coerce.boolean(), truthy]).default(false),
  FORCE_HTTP: z.union([z.coerce.boolean(), truthy]).default(false),
});

export type ParsedEnv = z.infer<typeof EnvSchema>;

export function parseEnvLike(obj: unknown): ParsedEnv {
  return EnvSchema.parse(obj);
}
