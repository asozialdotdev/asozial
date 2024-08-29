"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

// Function to search for projects
const searchForProjects = async (
  query: string,
  currentPage: number,
  limit: number,
) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/projects/all?&query=${query}&page=${currentPage}&limit=${limit}`,
      {
        cache: "no-cache",
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { projects: [], totalPages: 1 };
  }
};
export { searchForProjects };
