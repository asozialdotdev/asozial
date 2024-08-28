"use server";

import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { ProjectId } from "@/types/Project";
import { revalidatePath } from "next/cache";

type RestoreMember = {
  errors: {
    restore?: string[];
  };
  success?: boolean;
  data?: any;
};

// POST Accept a user to a project
const restoreMember = async (
  formState: RestoreMember,
  formData: FormData,
): Promise<RestoreMember> => {
  const session = await auth();
  const userId = session?.user?.id;
  const projectId = formData.get("projectId") as ProjectId;
  const memberId = formData.get("memberId") as string;

  try {
    const response = await fetch(
      `${baseUrl}/api/projects/${projectId}/restore`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memberId, userId }),
      },
    );

    if (!response.ok) {
      throw new Error("Error restoring user from a project");
    }

    const {project} = await response.json();
    console.log("project applied:", project);
    // setTimeout(() => {
    // }, 2000);
    revalidatePath(`/${project.owner.info.username}/${project.slug}/${projectId}/members`);
    return {
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Error restoring user to this project", error);
    return {
      errors: {
        restore: ["Error restoring user to this project. Please try again."],
      },
    };
  }
};

export { restoreMember };
