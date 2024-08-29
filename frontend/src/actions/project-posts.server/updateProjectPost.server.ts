"use server";

import { ProjectPostId } from "@/types/ProjectPost";
import { CreatePostFormState } from "./createProjectPost.server";
import { auth } from "@/auth";
import { createPostSchema } from "@/lib/schema";
import { fetchPostByIdAndReplies } from "./fetchPostByIdAndReplies.server";
import { revalidatePath } from "next/cache";
import { baseUrl } from "@/constants";

const updateProjectPost = async (
  projectPostId: ProjectPostId,
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
  const { post } = await fetchPostByIdAndReplies(projectPostId);

  if (!post) {
    throw new Error("Post not found");
  }

  try {
    const response = await fetch(
      `${baseUrl}/api/project-posts/${projectPostId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: result.data.title,
          content: result.data.content,
          image: result.data.image,
          placeholder: result.data.placeholder,
          edited: true,
          userId: session?.user?.id,
        }),
      },
    );
    const updatedPost = await response.json();
    revalidatePath(
      `/${username}/${post.projectId.slug}/${post.projectId._id}/posts/${projectPostId}`,
    );
    return {
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Error updating project post:", error);
    return {
      errors: {
        content: ["Failed to update post"],
      },
    };
  }
};

export { updateProjectPost };
