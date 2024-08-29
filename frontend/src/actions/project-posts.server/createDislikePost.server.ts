"use server";

import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { ProjectPostId } from "@/types/ProjectPost";

// POST Dislike a post
const createDislikePost = async (projectPostId: ProjectPostId) => {
  const session = await auth();
  try {
    const response = await fetch(
      `${baseUrl}/api/project-posts/${projectPostId}/dislike`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.id,
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`Failed to dislike post: ${response.statusText}`);
    }
    const data = await response.json();
    return data.dislikes;
  } catch (error) {
    console.error("Error disliking post:", error);
  }
};

export { createDislikePost };
