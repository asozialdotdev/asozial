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
import axios from "axios";
import { User } from "next-auth";

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

// GET to get a project from Github
const fetchGithubRepos = async () => {
  const session = await auth();
  const owner = session?.user?.githubUsername 
  console.log("owner", owner);

  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${owner}/repos?per_page=100`,
    );

    console.log("data", data);
    console.log("Github repo:", data);
    return data;
  } catch {
    console.error("Error fetching Github repos");
    return { error: true, message: "Error fetching Github repos" };
  }
};

// POST create a project from Github

const createProjectFromGithub = async (repoUrl: string) => {
  const session = await auth();
  const owner = "jrcopeti";
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
    console.log("project", project);
    return project;
  } catch (error) {
    console.error("Error creating project");
    return { error: true, message: "Error creating project" };
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

// Patch a pitch
const patchPitch = async (projectId: ProjectId, pitch: string) => {
  const session = await auth();

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
    revalidatePath(`/projects/${projectId}`);
    return { error: false, message: "Pitch updated" };
  } catch (error) {
    console.error("Error updating pitch:", error);
    return { error: true, message: "Error updating pitch" };
  }
};

//Patch Main Language
const patchMainLanguage = async (
  projectId: ProjectId,
  mainLanguage: string,
) => {
  const session = await auth();

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
    revalidatePath(`/projects/${projectId}`);
    return { error: false, message: "Main language updated" };
  } catch (error) {
    console.error("Error updating main language:", error);
    return { error: true, message: "Error updating main language" };
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
    return { error: false, message: "Project deleted" };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { error: true, message: "Error deleting project" };
  }
};

export {
  fetchAllProjects,
  fetchProjectById,
  fetchGithubRepos,
  createProjectFromGithub,
  searchForMyProjects,
  handleJoinProject,
  createProject,
  checkIsMember,
  updateProject,
  patchPitch,
  patchMainLanguage,
  deleteProject,
};
