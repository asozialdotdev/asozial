"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

// Function to fetch all projects from a user
const fetchAllProjectsFromAUser = async (
  currentPage: number,
  limit: number,
) => {
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const response = await fetch(
      `${baseUrl}/api/projects/user?userId=${userId}&page=${currentPage}&limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const projects = await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { projects: [], totalPages: 1 };
  }
};

export { fetchAllProjectsFromAUser };
