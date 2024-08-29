"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { ProjectId } from "@/types/Project";

// GET check if user is a member of a project

const checkIsMember = async (projectId: ProjectId) => {
  const session = await auth();
  try {
    const response = await fetch(
      `${baseUrl}/api/projects/${projectId}/is-member?userId=${session?.user?.id}`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to check if user is a member: ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data.isMember;
  } catch (error) {
    console.error("Error checking if user is a member:", error);
    return "Error checking if user is a member";
  }
};
export { checkIsMember };
