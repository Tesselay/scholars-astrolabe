import { z } from "zod";
import enUI from "../dictionaries/en/ui.json";

type StringLeaves<T> = T extends string
  ? string
  : T extends Record<string, unknown>
    ? { [K in keyof T]: StringLeaves<T[K]> }
    : never;

type DeepPartial<T> = T extends string
  ? string | undefined
  : T extends Record<string, unknown>
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : never;

type SchemaOf<T> = T extends string
  ? z.ZodString
  : T extends Record<string, unknown>
    ? z.ZodObject<{ [K in keyof T]: SchemaOf<T[K]> }, "strict">
    : never;

function buildStrictSchema<T>(obj: T): SchemaOf<T> {
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

function buildDeepPartialSchema<T>(obj: T): SchemaOf<DeepPartial<T>> {
  if (typeof obj === "string") {
    return z.string().optional() as unknown as SchemaOf<DeepPartial<T>>;
  }

  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    const shape: Record<string, z.ZodType<unknown>> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      shape[key] = buildDeepPartialSchema(
        value as unknown,
      ) as unknown as z.ZodType<unknown>;
    }

    return z.object(shape).partial().strict() as unknown as SchemaOf<
      DeepPartial<T>
    >;
  }

  return z.never() as unknown as SchemaOf<DeepPartial<T>>;
}

export const UiSchema = buildStrictSchema(enUI);
export const UiPartialSchema = buildDeepPartialSchema(enUI);

export type Ui = StringLeaves<typeof enUI>;
