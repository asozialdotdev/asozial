"use server";
import { auth } from "@/auth";
import { fetchProjectById } from "./fetchProjectById.server";
import { baseUrl } from "@/constants";
import { revalidatePath } from "next/cache";
import { ProjectId } from "@/types/Project";

//Patch Main Language
const patchMainLanguage = async (
  projectId: ProjectId,
  mainLanguage: string,
) => {
  const session = await auth();
  const username = session?.user?.githubUsername;

  try {
    const project = await fetchProjectById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const response = await fetch(
      `${baseUrl}/api/projects/${projectId}/main-language`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mainLanguage, userId: session?.user?.id }),
      },
    );

    const updateMainLanguage = await response.json();
    console.log("Updated main language:", updateMainLanguage);
    revalidatePath(`/${username}/${project.slug}/${project._id}`);
    return { error: false, message: "Main language updated" };
  } catch (error) {
    console.error("Error updating main language:", error);
    return { error: true, message: "Error updating main language" };
  }
};

export { patchMainLanguage };
