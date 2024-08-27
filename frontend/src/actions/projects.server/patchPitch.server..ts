"use server";
import { auth } from "@/auth";
import { ProjectId } from "@/types/Project";
import { fetchProjectById } from "./fetchProjectById.server";
import { baseUrl } from "@/constants";
import { revalidatePath } from "next/cache";

// Patch a pitch
const patchPitch = async (projectId: ProjectId, pitch: string) => {
  const session = await auth();
  const username = session?.user?.githubUsername;

  try {
    const project = await fetchProjectById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const response = await fetch(`${baseUrl}/api/projects/${projectId}/pitch`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pitch, userId: session?.user?.id }),
    });

    const updatePitch = await response.json();
    console.log("Updated pitch:", updatePitch);
    revalidatePath(`/${username}/${project.slug}/${project._id}`);
    return { error: false, message: "Pitch updated" };
  } catch (error) {
    console.error("Error updating pitch:", error);
    return { error: true, message: "Error updating pitch" };
  }
};

export { patchPitch };
