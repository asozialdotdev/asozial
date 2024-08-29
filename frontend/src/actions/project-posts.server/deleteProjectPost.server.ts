"use server";

import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { ProjectPostId } from "@/types/ProjectPost";

//DELETE a project post

const deleteProjectPost = async (projectPostId: ProjectPostId) => {
  const session = await auth();

  try {
    const response = await fetch(
      `${baseUrl}/api/project-posts/${projectPostId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`Failed to delete post: ${response.statusText}`);
    }
    const { post } = await response.json();
    return { error: false, message: "Post deleted" };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { error: true, message: "Error deleting post" };
  }
};

export { deleteProjectPost };
