import { z } from "zod";

export type StringLeaves<T> = T extends string
  ? string
  : T extends Record<string, unknown>
    ? { [K in keyof T]: StringLeaves<T[K]> }
    : never;

type SchemaOf<T> = T extends string
  ? z.ZodString
  : T extends Record<string, unknown>
    ? z.ZodObject<{ [K in keyof T]: SchemaOf<T[K]> }, "strict">
    : never;

export function buildStrictSchema<T>(obj: T): SchemaOf<T> {
  if (typeof obj === "string") {
    return z.string() as unknown as SchemaOf<T>;
  }

  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    const shape: Record<string, z.ZodType<unknown>> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      shape[key] = buildStrictSchema(
        value as unknown,
      ) as unknown as z.ZodType<unknown>;
    }

    return z.object(shape).strict() as unknown as SchemaOf<T>;
  }

  return z.never() as unknown as SchemaOf<T>;
}
