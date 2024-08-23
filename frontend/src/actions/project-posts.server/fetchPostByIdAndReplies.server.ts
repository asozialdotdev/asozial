"use server";
import { baseUrl } from "@/constants";
import { ProjectPostId } from "@/types/ProjectPost";

// GET Fetch a post by ID and its replies
const fetchPostByIdAndReplies = async (projectPostId: ProjectPostId) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/project-posts/${projectPostId}`,
      { cache: "no-store" },
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    const postData = await response.json();
    return postData;
  } catch (error) {
    console.error("Error fetching projectPost:", error);
    return "Error fetching post";
  }
};

export { fetchPostByIdAndReplies };
