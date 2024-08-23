"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

// Get all projects
const fetchAllProjectsFromAUser = async () => {
  const session = await auth();
  try {
    const response = await fetch(
      `${baseUrl}/api/projects?userId=${session?.user?.id}`,
      {
        cache: "no-store",
      },
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return null;
  }
};

export { fetchAllProjectsFromAUser };
