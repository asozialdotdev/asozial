'use server'
import { auth } from "@/auth";
import { ProjectId } from "@/types/Project";
import { fetchProjectById } from "./fetchProjectById.server";
import { baseUrl } from "@/constants";

//Delete a project
const deleteProject = async (projectId: ProjectId) => {
  const session = await auth();

  try {
    const project = await fetchProjectById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    const response = await fetch(`${baseUrl}/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: session?.user?.id }),
    });

    const deleteProject = await response.json();
    console.log("Deleted deleteProject:", deleteProject);
    return { error: false, message: "Project deleted" };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { error: true, message: "Error deleting project" };
  }
};

export { deleteProject };
