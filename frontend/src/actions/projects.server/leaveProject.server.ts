"use server";

import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { Member, Project, ProjectId } from "@/types/Project";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type LeaveProject = {
  errors: {
    leave?: string[];
  };
  success?: boolean;
  data?: any;
};

// POST leave a project (LEAVE)
const leaveProject = async (
  formState: LeaveProject,
  formData: FormData,
): Promise<LeaveProject> => {
  const session = await auth();
  const userId = session?.user?.id;
  const projectId = formData.get("projectId") as ProjectId;
  let memberLeft: Member;
  try {
    const response = await fetch(`${baseUrl}/api/projects/${projectId}/leave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error("Error leaving this  project");
    }

    const { user } = await response.json();
    memberLeft = user;
    console.log("project left:", user);
  } catch (error) {
    console.error("Error leaving this project", error);
    return {
      errors: {
        leave: ["Error leaving this project. Please try again."],
      },
    };
  }
  redirect(`/search/projects`);
};

export { leaveProject };
