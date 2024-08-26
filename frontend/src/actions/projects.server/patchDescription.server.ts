"use server";
import { auth } from "@/auth";
import { ProjectId } from "@/types/Project";
import { fetchProjectById } from "./fetchProjectById.server";
import { baseUrl } from "@/constants";
import { revalidatePath } from "next/cache";

// Patch a description
const patchDescription = async (projectId: ProjectId, description: string) => {
  const session = await auth();
  const username = session?.user?.githubUsername;

  try {
    const project = await fetchProjectById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const response = await fetch(
      `${baseUrl}/api/projects/${projectId}/description`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description, userId: session?.user?.id }),
      },
    );

    const updateDescription = await response.json();
    console.log("Updated description:", updateDescription);
    revalidatePath(`/${username}/${project.slug}/${project._id}`);
    return { error: false, message: "Description updated" };
  } catch (error) {
    console.error("Error updating description:", error);
    return { error: true, message: "Error updating description" };
  }
};

export { patchDescription };
