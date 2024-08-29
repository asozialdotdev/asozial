"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { checkProjectTitle } from "./checkProjectTitle.server";

// POST create a project from Github
const createProjectFromGithub = async (repoUrl: string) => {
  const session = await auth();

  let project;
  try {
    const result = await fetch(`${baseUrl}/api/projects/github`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        repoUrl,
        userId: session?.user?.id,
      }),
    });

    project = await result.json();
    return project;
  } catch (error) {
    console.error("Error creating project", error);
    return { error: true, message: "Error creating a project" };
  }
};

export { createProjectFromGithub };
