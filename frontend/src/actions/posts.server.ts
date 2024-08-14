"use server";
import { revalidatePath } from "next/cache";
import { baseUrl } from "@/constants";
import { ProjectId } from "@/types/Project";
import { PostId } from "@/types/Post";

const createPost = async (formData: FormData) => {
  const title = formData.get("title");
  const content = formData.get("content");
  const projectId = formData.get("projectId");
  console.log("Creating post:", { title, content, projectId });

  try {
    const response = await fetch(`${baseUrl}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        projectId,
        userId: "66ba4cb189ed3084ede59fa5",
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }
    const post = await response.json();
    console.log("Created post:", post);
    const projectPath = `/projects/${projectId}`;
    revalidatePath(projectPath);
    return post;
  } catch (error) {
    console.error("Error creating postttttttt:", error);
    return "Error creating post";
  }
};

const createReply = async (formData: FormData) => {
  const content = formData.get("content");
  const projectId = formData.get("projectId");
  const parentId = formData.get("parentId");
  console.log("Creating reply:", { content, projectId, parentId });

  try {
    const response = await fetch(`${baseUrl}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        projectId,
        userId: "66ba4cb189ed3084ede59fa5",
        parentId,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }
    const post = await response.json();
    console.log("Created post:", post);
    const postPath = `/projects/${parentId}`;
    revalidatePath(postPath);
    return post;
  } catch (error) {
    console.error("Error creating postttttttt:", error);
    return "Error creating post";
  }
};

const fetchPosts = async (projectId: ProjectId) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/posts?projectId=${projectId}`,
      { cache: "no-store" },
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    const posts = await response.json();
    console.log("Fetched posts:", posts);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return "Error fetching posts";
  }
};

const fetchPostById = async (postId: PostId) => {
  try {
    const response = await fetch(`${baseUrl}/api/posts/${postId}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    const post = await response.json();
    console.log("Fetched post:", post);
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return "Error fetching post";
  }
};

export { createPost, createReply, fetchPosts, fetchPostById };
