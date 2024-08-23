import { baseUrl } from "@/constants";

const searchForProjects = async (query: string, currentPage: number) => {
  try {
    const response = await fetch(
      ` ${baseUrl}/api/projects/search?query=${query}&page=${currentPage}`,
    );
    if (!response.ok) {
      throw new Error("Error searching for projects");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching for projects", error);
    return { error: true, message: "Error searching for projects" };
  }
};

export { searchForProjects };
