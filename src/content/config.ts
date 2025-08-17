import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const postsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    'date-created': z.date(),
    'date-modified': z.date(),
  }),
})

export const collections = { blog: postsCollection }
