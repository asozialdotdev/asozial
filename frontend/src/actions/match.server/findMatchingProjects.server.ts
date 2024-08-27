"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

const getMatchedProjects = async (
  actualUser: string,
  targetProject: string,
) => {
  const session = await auth();
  try {
    console.log("Fetching matched projects for user:", {
      actualUser,
      targetProject,
    });

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
      console.log("Error fetching matched projects:", errorText);
      return { error: errorText };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error fetching matched projects:", error.message);
    return { error: error.message };
  }
};

export { getMatchedProjects };
