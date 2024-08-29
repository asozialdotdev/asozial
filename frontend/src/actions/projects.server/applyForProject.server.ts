"use server";

import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { ProjectId } from "@/types/Project";
import { revalidatePath } from "next/cache";

type ApplyForProjectState = {
  errors: {
    apply?: string[];
  };
  success?: boolean;
  data?: any;
};

// POST join a project
const applyForProject = async (
  formState: ApplyForProjectState,
  formData: FormData,
): Promise<ApplyForProjectState> => {
  const session = await auth();
  const projectId = formData.get("apply") as ProjectId;

  try {
    const response = await fetch(`${baseUrl}/api/projects/${projectId}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: session?.user?.id }),
    });

    if (!response.ok) {
      throw new Error("Error applying for a project");
    }

    const { project } = await response.json();
    revalidatePath(
      `/${project.owner.info.username}/${project.slug}/${projectId}`,
    );
    return {
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Error applying for project", error);
    return {
      errors: {
        apply: ["Error applying for this project. Please try again."],
      },
    };
  }
};

export { applyForProject };
