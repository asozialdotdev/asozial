"use server";

import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { ProjectId } from "@/types/Project";
import { revalidatePath } from "next/cache";

type AcceptMemberState = {
  errors: {
    apply?: string[];
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
    revalidatePath(`/${project.owner.username}/${project.slug}/${projectId}`);
    return {
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Error accepting a user to a project", error);
    return {
      errors: {
        apply: ["Error accepting a user to a project. Please try again."],
      },
    };
  }
};

export { acceptMember };
