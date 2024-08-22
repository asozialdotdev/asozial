'use server'
import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { revalidatePath } from "next/cache";

// POST join a project
const joinAProject = async (formData: FormData) => {
  const session = await auth();
  try {
    const projectId = formData.get("projectId") as string;

    const response = await fetch(`${baseUrl}/api/projects/${projectId}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: session?.user?.id }),
    });

    const result = await response.json();
    revalidatePath(`/projects/${projectId}`);
    console.log("result:", result);
  } catch (error) {
    console.error("Error joining project:", error);
    return "Error joining project";
  }
};

export { joinAProject };
