"use server";

import { baseUrl } from "@/constants";
import { ProjectId } from "@/types/Project";

// Get 1 project
const fetchProjectBySlug = async (slug: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/projects/${slug}`, {
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

export { fetchProjectBySlug };
