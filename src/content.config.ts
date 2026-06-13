import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/posts"
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    description: z.string(),
    author: z.string().default("Time Vapour"),
    tags: z.array(z.string()).default([]),
    cover: z.string().default("/assets/images/og-default.svg")
  })
});

export const collections = {
  posts
};
