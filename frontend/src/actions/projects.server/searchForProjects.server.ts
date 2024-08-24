"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

// Function to search for projects
const searchForProjects = async (
  query: string,
  currentPage: number,
  limit: number,
) => {
  console.log("Exploring for projects with query:", query);
  try {
    const response = await fetch(
      `${baseUrl}/api/projects/explore?&query=${query}&page=${currentPage}&limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const projects = await response.json();
    console.log("Explored projects:", projects);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { projects: [], totalPages: 1 };
  }
};
export { searchForProjects };
