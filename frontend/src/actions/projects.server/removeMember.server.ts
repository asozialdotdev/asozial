"use server";

import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { ProjectId } from "@/types/Project";
import { revalidatePath } from "next/cache";

type RemoveMember = {
  errors: {
    remove?: string[];
  };
  success?: boolean;
  data?: any;
};

// POST Accept a user to a project
const removeMember = async (
  formState: RemoveMember,
  formData: FormData,
): Promise<RemoveMember> => {
  const session = await auth();
  const userId = session?.user?.id;
  const projectId = formData.get("projectId") as ProjectId;
  const memberId = formData.get("memberId") as string;

  try {
    const response = await fetch(
      `${baseUrl}/api/projects/${projectId}/remove`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memberId, userId }),
      },
    );

    if (!response.ok) {
      throw new Error("Error removing user from a project");
    }

    const project = await response.json();
    console.log("project applied:", project);
    // revalidatePath(`/${project.owner.username}/${project.slug}/${projectId}`);
    return {
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Error removing user from this project", error);
    return {
      errors: {
        remove: ["Error removing user from this project. Please try again."],
      },
    };
  }
};

export { removeMember };
