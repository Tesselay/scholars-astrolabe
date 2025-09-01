import { z } from "zod";
import { locales } from "@/i18n";

export const LanguageEnum = z.enum(locales);

export const BlogPostSchema = z.object({
  title: z.string(),
  tags: z.array(z.string()),
  summary: z.string(),
  sources: z.array(z.string()),
  language: LanguageEnum.optional(),
  "date-created": z.date(),
  "date-modified": z.date(),
});
