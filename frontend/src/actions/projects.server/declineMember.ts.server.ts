"use server";

import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { ProjectId } from "@/types/Project";
import { revalidatePath } from "next/cache";

type DeclineMemberState = {
  errors: {
    decline?: string[];
  };
  success?: boolean;
  data?: any;
};

// POST Accept a user to a project
const declineMember = async (
  formState: DeclineMemberState,
  formData: FormData,
): Promise<DeclineMemberState> => {
  const session = await auth();
  const userId = session?.user?.id;
  const projectId = formData.get("projectId") as ProjectId;
  const memberId = formData.get("memberId") as string;

  try {
    const response = await fetch(
      `${baseUrl}/api/projects/${projectId}/decline`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memberId, userId }),
      },
    );

    if (!response.ok) {
      throw new Error("Error declining a user to a project");
    }

    const { project } = await response.json();
    revalidatePath(
      `/${project.owner.info.username}/${project.slug}/${projectId}/members`,
    );
    return {
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Error declining a user to a project", error);
    return {
      errors: {
        decline: ["Error declining a user to a project. Please try again."],
      },
    };
  }
};

export { declineMember };
