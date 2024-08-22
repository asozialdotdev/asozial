"use server";

import { baseUrl } from "@/constants";
import { ProjectId } from "@/types/Project";

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

export { fetchProjectById };
