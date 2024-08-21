"use server";
//Next
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//Constants
import { baseUrl } from "@/constants";

//Lib
import { auth } from "@/auth";

//Types
import { CreateUpdateProject, Project, ProjectId } from "@/types/Project";

// Get all projects
const fetchAllProjects = async () => {
  const session = await auth();
  try {
    const response = await fetch(
      `${baseUrl}/api/projects?userId=${session?.user?.id}`,
      {
        cache: "no-store",
      },
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return null;
  }
};

// Get 1 project

const fetchProjectById = async (projectId: ProjectId) => {
  try {
    const response = await fetch(`${baseUrl}/api/projects/${projectId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.statusText}`);
    }
    const project = await response.json();

    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
};

// Search for my-projects

const searchForMyProjects = async (searchTerm: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/projects/search?query=${searchTerm}`,
    );
    if (!response.ok) {
      throw new Error(`Failed to search for projects: ${response.statusText}`);
    }
    const projects = await response.json();
    console.log("Searched projects:", projects);
    return projects;
  } catch (error) {
    console.error("Error searching for projects:", error);
    return "Error searching for projects";
  }
};

// POST create a new project

const createProject = async (data: CreateUpdateProject) => {
  const session = await auth();
  console.log("GITHUB REPO", data);
  let project;
  try {
    const response = await fetch(`${baseUrl}/api/projects/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, userId: session?.user?.id }),
    });

    project = await response.json();
    console.log("project", project);
  } catch (error) {
    console.error("Error creating project:", error);
    return "Error creating project";
  }
  redirect(`/projects/${project._id}`);
};

// POST join a project
const handleJoinProject = async (formData: FormData) => {
  const session = await auth();
  try {
    const projectId = formData.get("projectId") as string;

    const response = await fetch(`${baseUrl}/api/projects/${projectId}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: session?.user?.id }),
    });

    const result = await response.json();
    revalidatePath(`/projects/${projectId}`);
    console.log("result:", result);
  } catch (error) {
    console.error("Error joining project:", error);
    return "Error joining project";
  }
};

// GET check if user is a member of a project
const checkIsMember = async (projectId: ProjectId) => {
  const session = await auth();
  try {
    const response = await fetch(
      `${baseUrl}/api/projects/${projectId}/is-member?userId=${session?.user?.id}`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to check if user is a member: ${response.statusText}`,
      );
    }
    const data = await response.json();
    console.log("Is member:", data);
    return data.isMember;
  } catch (error) {
    console.error("Error checking if user is a member:", error);
    return "Error checking if user is a member";
  }
};

// PUT update a project

const updateProject = async (
  projectId: ProjectId,
  data: CreateUpdateProject,
) => {
  const session = await auth();

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
      body: JSON.stringify({ ...data, userId: session?.user?.id }),
    });

    const updateProject = await response.json();
    console.log("Updated updateProject:", updateProject);
    revalidatePath(`/projects/${projectId}`);
    return "Project updated";
  } catch (error) {
    console.error("Error updating project:", error);
    return "Error updating project";
  }
};

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
    return {error: false, message: "Project deleted"};
  } catch (error) {
    console.error("Error deleting project:", error);
    return { error: true, message: "Error deleting project" };
  }

};

export {
  fetchAllProjects,
  fetchProjectById,
  searchForMyProjects,
  handleJoinProject,
  createProject,
  checkIsMember,
  updateProject,
  deleteProject,
};
