"use server";

import { baseUrl } from "@/constants";
import { ProjectId } from "@/types/Project";

// Get 1 project
const fetchAllMembersFromAProject = async (projectId: ProjectId) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/projects/${projectId}/members`,

      { cache: "no-store" },
      // { next: { revalidate: 3 } },
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch project: ${response.statusText}`);
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching project:", error);
    return { error: true, message: "Error getting members from this project" };
  }
};

export { fetchAllMembersFromAProject };
