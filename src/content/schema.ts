import { z } from "zod";

export const BlogPostSchema = z.object({
  title: z.string(),
  tags: z.array(z.string()),
  summary: z.string(),
  sources: z.array(z.string()),
  language: z.string().optional(),
  "date-created": z.coerce.date(),
  "date-modified": z.coerce.date()
});
