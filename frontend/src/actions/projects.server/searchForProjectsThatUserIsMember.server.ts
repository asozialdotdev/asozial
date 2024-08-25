"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

// Function to search for projects
const searchForProjectsThatUserIsMember = async (
  query: string,
  currentPage: number,
  limit: number,
) => {
  console.log("member projects with query:", query);
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const response = await fetch(
      `${baseUrl}/api/projects/member?userId=${userId}&query=${query}&page=${currentPage}&limit=${limit}`,
      {
        cache: "force-cache",
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const projects = await response.json();
    console.log("MEMBER PROJECTS:", projects);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { projects: [], totalPages: 1 };
  }
};
export { searchForProjectsThatUserIsMember };
