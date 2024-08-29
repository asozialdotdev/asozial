"use server";
import { auth } from "@/auth";
import { syncGithubRepoSchema } from "@/lib/schema";
import axios from "axios";

type SyncFormState = {
  errors: {
    repo?: string[];
  };
  success?: boolean;
  data?: any;
};

// GET to sync a project with Github
const syncGithubRepo = async (
  formState: SyncFormState,
  formData: FormData,
): Promise<SyncFormState> => {
  const session = await auth();
  const owner = session?.user?.githubUsername;

  const result = syncGithubRepoSchema.safeParse({
    repo: formData.get("repo"),
  });

  if (!result.success) {
    console.error("Validation error:", result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${result.data.repo}`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        return {
          errors: {
            repo: ["Repo not found"],
          },
        };
      }
      throw new Error("Error syncing Github repo");
    }
    const data = await response.json();

    return {
      errors: {},
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error syncing Github repo", error);
    return {
      errors: {
        repo: ["Error syncing Github repo"],
      },
    };
  }
};

export { syncGithubRepo };
