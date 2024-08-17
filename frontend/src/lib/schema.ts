import { z } from "zod";

const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  pitch: z.string().min(1, "Pitch is required"),
  githubRepo: z.string().optional(),
  techStack: z.array(z.string()).min(1, "At least one tech stack is required"),
  mainLanguage: z.string().min(1, "Main language is required"),
  // owner: z.object({ userId: z.string().min(1, "Owner is required") }),
  socials: z.array(z.string()).optional(),
});

const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

const createReplySchema = z.object({
  content: z.string().min(1, "Content is required"),
});

export { createProjectSchema, createPostSchema, createReplySchema };
