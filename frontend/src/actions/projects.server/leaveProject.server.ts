"use server";

import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { ProjectId } from "@/types/Project";
import { revalidatePath } from "next/cache";

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

  try {
    const response = await fetch(`${baseUrl}/api/projects/${projectId}/leave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, projectId }),
    });

    if (!response.ok) {
      throw new Error("Error leaving this  project");
    }

    const project = await response.json();
    console.log("project left:", project);
    revalidatePath(`/${project.owner.username}/${project.slug}/${projectId}`);
    return {
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Error leaving this project", error);
    return {
      errors: {
        leave: ["Error leaving this project. Please try again."],
      },
    };
  }
};

export { leaveProject };
