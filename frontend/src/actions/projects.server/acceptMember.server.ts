"use server";

import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { ProjectId } from "@/types/Project";
import { revalidatePath } from "next/cache";

export type AcceptMemberState = {
  errors: {
    accept?: string[];
  };
  success?: boolean;
  data?: any;
};

// POST Accept a user to a project
const acceptMember = async (
  formState: AcceptMemberState,
  formData: FormData,
): Promise<AcceptMemberState> => {
  const projectId = formData.get("projectId") as ProjectId;
  const memberId = formData.get("memberId") as string;

  try {
    const response = await fetch(`${baseUrl}/api/projects/${projectId}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ memberId, projectId }),
    });

    if (!response.ok) {
      throw new Error("Error accepting a user to a project");
    }

    const project = await response.json();
    console.log("project applied:", project);
    // setTimeout(() => {
    //   revalidatePath(`/${project.owner.username}/${project.slug}/${projectId}`);
    // }, 5000);
    return {
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Error accepting a user to a project", error);
    return {
      errors: {
        accept: ["Error accepting a user to a project. Please try again."],
      },
    };
  }
};

export { acceptMember };