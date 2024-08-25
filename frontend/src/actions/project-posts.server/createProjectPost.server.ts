"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { createPostSchema } from "@/lib/schema";
import { ProjectId } from "@/types/Project";
import { revalidatePath } from "next/cache";

export type CreatePostFormState = {
  errors: {
    title?: string[];
    content?: string[];
    projectId?: string[];
  };
  success?: boolean;
};

// POST Create a new Project Post
const createProjectPost = async (
  projectId: ProjectId,
  formState: CreatePostFormState,
  formData: FormData,
): Promise<CreatePostFormState> => {
  const session = await auth();
  const username = session?.user?.githubUsername;
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    image: formData.get("image"),
    placeholder: formData.get("placeholder"),
  });

  if (!result.success) {
    console.error("Validation error:", result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${baseUrl}/api/project-posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: result.data.title,
        content: result.data.content,
        image: result.data.image,
        placeholder: result.data.placeholder,
        userId: session?.user?.id,
        projectId,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }
    const post = await response.json();
    console.log("post Project Slug", post.projectId.slug);
    console.log("Created post:", post);
    revalidatePath(`/${username}/${post.projectId.slug}/${post.projectId._id}`);
    return {
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Error creating project post:", error);
    return {
      errors: {
        title: ["Failed to create post"],
        content: ["Failed to create post"],
      },
    };
  }
};

export { createProjectPost };
