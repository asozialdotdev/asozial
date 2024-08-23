'use client'

import { baseUrl } from "@/constants";

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

export { searchForMyProjects };
