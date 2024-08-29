"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { ProjectId } from "@/types/Project";

// GET check if user is a member of a project

const checkMemberHasApplied = async (projectId: ProjectId) => {
  const session = await auth();
  try {
    const response = await fetch(
      `${baseUrl}/api/projects/${projectId}/has-applied?userId=${session?.user?.id}`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to check if user is owner: ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data.hasApplied;
  } catch (error) {
    console.error("Error checking if user has applied:", error);
    return "Error checking if user has applied";
  }
};
export { checkMemberHasApplied };
