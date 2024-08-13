"use server";


import { ProjectId } from "@/types/Project";
import { baseUrl } from "@/constants";

// Get all projects
const fetchAllProjects = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/projects`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const projects = await response.json();
    console.log("Fetched projects:", projects);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return "Error fetching projects";
  }
};

// Get 1 project


const fetchProjectById = async (projectId: ProjectId) => {
  try {
    const response = await fetch(`${baseUrl}/api/projects/${projectId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.statusText}`);
    }
    const project = await response.json();

    console.log("Fetched project:", project);

    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return "Error fetching project";
  }
};

// Search for my-projects

const searchForMyProjects = async (searchTerm: string) => {
  try {
    const response = await fetch(

      `${baseUrl}/projects/search?query=${searchTerm}`,

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

const handleJoinProject = async (formData: FormData) => {
  const projectId = formData.get("projectId") as string;


  const response = await fetch(`${baseUrl}/projects/${projectId}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: "60d4f4d2d243f80015f7b3f9" }),
  });


  const result = await response.json();
  console.log("result:", result);
};


//Get Posts



export {
  fetchAllProjects,
  fetchProjectById,
  searchForMyProjects,
  handleJoinProject,
};
