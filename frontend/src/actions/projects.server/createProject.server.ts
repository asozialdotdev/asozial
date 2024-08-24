"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { CreateUpdateProject } from "@/types/Project";
import { generateSlug } from "@/utils";
import { redirect } from "next/navigation";

// POST create a new project
const createProject = async (data: CreateUpdateProject) => {
  const session = await auth();
  const slug = generateSlug(data.title);
  let project;
  try {
    const response = await fetch(`${baseUrl}/api/projects/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, slug, userId: session?.user?.id }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create project: ${response.statusText}`);
    }

    project = await response.json();
    console.log("project", project);
  } catch (error) {
    console.error("Error creating project:", error);
    return { error: true, message: "Failed to create project" };
  }
  redirect(`/projects/${project._id}`);
};

export { createProject };
