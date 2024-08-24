"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

// Function to search for projects
const searchForUserProjects = async (
  query: string,
  currentPage: number,
  limit: number,
) => {
  console.log("Searching for projects with query:", query);
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const response = await fetch(
      `${baseUrl}/api/projects/user?userId=${userId}&query=${query}&page=${currentPage}&limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const projects = await response.json();
    console.log("Searched projects:", projects);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { projects: [], totalPages: 1 };
  }
};
export { searchForUserProjects };
