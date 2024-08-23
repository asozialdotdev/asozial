"use server";

import { baseUrl } from "@/constants";
import { ProjectId } from "@/types/Project";

const fetchProjectPosts = async (projectId: ProjectId) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/project-posts?projectId=${projectId}`,
      { cache: "no-store" },
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching projectPosts:", error);
    return "Error fetching projectPosts";
  }
};

export { fetchProjectPosts };
