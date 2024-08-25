import { z } from "zod";

const createProjectSchema = z.object({
  title: z
    .string({ required_error: "Project with no name?" })
    .min(2, "Minimum of 2 characters, bitte 🙏")
    .max(100, "Maximum of 100 characters, bitte 🙏"),
  description: z
    .string({ required_error: "They need to know what your project is about" })
    .min(3, "Minimum of 3 characters, bitte 🙏")
    .max(250, "Maximum of 250 characters, bitte 🙏"),
  pitch: z
    .string({ required_error: "Pitch your project" })
    .min(3, "Minimum of 3 characters, bitte 🙏")
    .max(2000, "Maximum of 2000 characters, bitte 🙏"),
  githubRepo: z
    .string({ required_error: "Pick at least one tech stack" })
    .optional(),
  techStack: z.array(z.string()).min(1, "Pick at least one tech stack"),

  mainLanguage: z
    .string({ required_error: "Specify the main language" })
    .min(1, "Specify the main language"),
  socials: z
    .object({
      slack: z.string().optional(),
      discord: z.string().optional(),
      notion: z.string().optional(),
      gitlab: z.string().optional(),
    })
    .optional(),
  status: z.enum(["active", "inactive", "completed"]).default("active"),
  image: z.string().optional(),
  placeholder: z.string().optional(),
});

const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Your thread needs a title")
    .max(100, "Maximum of 100 characters, bitte 🙏"),
  content: z
    .string()
    .min(1, "At least try to write something")
    .max(2000, "Maximum of 2000 characters, bitte 🙏"),
  image: z.string().optional(),
  placeholder: z.string().optional(),
});

const createReplySchema = z.object({
  content: z
    .string()
    .min(1, "At least try to write something")
    .max(1000, "Maximum of 1000 characters, bitte 🙏"),
});

const pitchSchema = z.object({
  pitch: z
    .string({ required_error: "Pitch your project" })
    .min(3, "Minimum of 3 characters, bitte 🙏")
    .max(2000, "Maximum of 2000 characters, bitte 🙏"),
});

const mainLanguageSchema = z.object({
  mainLanguage: z
    .string({ required_error: "Specify the main language" })
    .min(1, "Specify the main language"),
});

const syncGithubRepoSchema = z.object({
  repo: z.string().min(1, "Provide your cool repo name"),
});

export {
  createProjectSchema,
  createPostSchema,
  createReplySchema,
  pitchSchema,
  mainLanguageSchema,
  syncGithubRepoSchema,
};
