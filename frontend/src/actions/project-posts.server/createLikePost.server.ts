"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { ProjectPostId } from "@/types/ProjectPost";

// POST Like a post
const createLikePost = async (projectPostId: ProjectPostId) => {
  const session = await auth();
  try {
    const response = await fetch(
      `${baseUrl}/api/project-posts/${projectPostId}/like`,
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
      throw new Error(`Failed to like post: ${response.statusText}`);
    }
    const data = await response.json();
    return data.likes;
  } catch (error) {
    console.error("Error liking post:", error);
  }
};

export { createLikePost };
