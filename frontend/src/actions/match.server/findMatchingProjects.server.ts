"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

const getMatchedProjects = async (
  actualUser: string,
  targetProject: string,
) => {
  const session = await auth();
  try {
    const actualUserId = session?.user?.id || "";

    const queryParams = new URLSearchParams({
      actualUser: actualUserId,
      targetProject,
    });

    const response = await fetch(
      `${baseUrl}/api/match/projects?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      return { error: errorText };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching matched projects:", error.message);
    return { error: error.message };
  }
};

export { getMatchedProjects };
