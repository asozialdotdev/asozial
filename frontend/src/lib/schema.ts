import { z } from "zod";

const createProjectSchema = z.object({
  title: z.string().min(1, "Project with no name?"),
  description: z.string().min(1, "They need to know what your project is about"),
  pitch: z.string().min(1, "Pitch your project"),
  githubRepo: z.string().optional(),
  techStack: z.array(z.string()).min(1, "Pick at least one tech stack"),
  mainLanguage: z.string().min(1, "Specify the main language"),
  socials: z.array(z.string()).optional(),
});

const createPostSchema = z.object({
  title: z.string().min(1, "Your thread needs a title"),
  content: z.string().min(1, "At least try to write something"),
});

const createReplySchema = z.object({
  content: z.string().min(1, "At least try to write something"),
});

export { createProjectSchema, createPostSchema, createReplySchema };
