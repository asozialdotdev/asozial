"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

// Search for user projects
const fetchAllProjectsFromAUser = async (page = 1, limit = 12) => {
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const response = await fetch(
      `${baseUrl}/api/projects/user?userId=${userId}&page=${page}&limit=${limit}`,
      {
        cache: "no-store",
      },
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const { projects, totalPages, currentPage } = await response.json();
    return { projects, totalPages, currentPage };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return null;
  }
};

export { fetchAllProjectsFromAUser };
