"use server";
import { auth } from "@/auth";
import { CreateUpdateProject, ProjectId } from "@/types/Project";
import { fetchProjectById } from "./fetchProjectById.server";
import { baseUrl } from "@/constants";
import { revalidatePath } from "next/cache";
import { generateSlug } from "@/utils";

const updateProject = async (
  projectId: ProjectId,
  data: CreateUpdateProject,
) => {
  const session = await auth();
  const username = session?.user?.githubUsername;
  const slug = generateSlug(data.title);

  try {
    const project = await fetchProjectById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const response = await fetch(`${baseUrl}/api/projects/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, slug, userId: session?.user?.id }),
    });

    const updateProject = await response.json();
    revalidatePath(`/${username}/${project.slug}/${project._id}`);
    return "Project updated";
  } catch (error) {
    console.error("Error updating project:", error);
    return "Error updating project";
  }
};

export { updateProject };
