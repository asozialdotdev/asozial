"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

// Search for user projects
const searchForUserProjects = async (query: string, currentPage: number) => {
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const response = await fetch(
      ` ${baseUrl}/api/projects/user/search?userId=${userId}&query=${query}&page=${currentPage}`,
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

export { searchForUserProjects };
