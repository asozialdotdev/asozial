"use server";
import { revalidatePath } from "next/cache";
import { baseUrl } from "@/constants";
import { ProjectId } from "@/types/Project";
import { PostId } from "@/types/Post";
import { createPostSchema, createReplySchema } from "@/lib/schema";

type CreatePostFormState = {
  errors: {
    title?: string[];
    content?: string[];
    projectId?: string[];
  };
};

type CreateReplyFormState = {
  errors: {
    content?: string[];
  };
};

const createPost = async (
  formState: CreatePostFormState,
  formData: FormData,
): Promise<CreatePostFormState> => {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    projectId: formData.get("projectId"),
  });

  if (!result.success) {
    console.error("Validation error:", result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${baseUrl}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: result.data.title,
        content: result.data.content,
        projectId: result.data.projectId,
        userId: "66ba4cb189ed3084ede59fa5",
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }
    const post = await response.json();
    console.log("Created post:", post);
    const projectPath = `/projects/${result.data.projectId}`;
    revalidatePath(projectPath);
    return post;
  } catch (error) {
    console.error("Error creating postttttttt:", error);
    return {
      errors: {
        title: ["Failed to create post"],
        content: ["Failed to create post"],
        projectId: ["Failed to create post"],
      },
    };
  }
};

const createReply = async (
  formState: CreateReplyFormState,
  formData: FormData,
): Promise<CreateReplyFormState> => {
  const result = createReplySchema.safeParse({
    content: formData.get("content"),
  });

  const projectId = formData.get("projectId");
  const parentId = formData.get("parentId");
  if (!result.success) {
    console.error("Validation error:", result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    const response = await fetch(`${baseUrl}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: result.data.content,
        projectId,
        parentId,
        userId: "66ba4cb189ed3084ede59fa5",
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
    return {
      errors: {
        content: ["Failed to create reply"],
      },
    };
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
