"use server";
import { revalidatePath } from "next/cache";
import { baseUrl } from "@/constants";
import { ProjectId } from "@/types/Project";
import { ProjectPostId, ReplyId } from "@/types/Post";
import { createPostSchema, createReplySchema } from "@/lib/schema";
import { auth } from "@/auth";

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
  success?: boolean;
};

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
// POST Create a new Project Post
const createProjectPost = async (
  projectId: ProjectId,
  formState: CreatePostFormState,
  formData: FormData,
): Promise<CreatePostFormState> => {
  const session = await auth();
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
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
        userId: session?.user?.id,
        projectId,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }
    const post = await response.json();
    console.log("Created post:", post);
    revalidatePath(`/projects/${projectId}`);
    return post;
  } catch (error) {
    console.error("Error creating project post:", error);
    return {
      errors: {
        title: ["Failed to create post"],
        content: ["Failed to create post"],
        projectId: ["Failed to create post"],
      },
    };
  }
};
// GET Fetch a post by ID and its replies
const fetchPostByIdAndReplies = async (projectPostId: ProjectPostId) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/project-posts/${projectPostId}`,
      {
        cache: "no-store",
      },
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

// POST Create Reply
const createProjectPostReply = async (
  {
    projectPostId,
    parentId,
  }: { projectPostId: ProjectPostId; parentId: ReplyId },
  formState: CreateReplyFormState,
  formData: FormData,
): Promise<CreateReplyFormState> => {
  const session = await auth();

  const result = createReplySchema.safeParse({
    content: formData.get("content"),
  });

  if (!result.success) {
    console.error("Validation error:", result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  try {
    const response = await fetch(`${baseUrl}/api/project-posts/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: result.data.content,
        projectPostId,
        userId: session?.user?.id,
        parentId: parentId || null,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }
    const reply = await response.json();
    console.log("Created reply:", reply);
    revalidatePath(`/projects/${projectPostId}`);
    return {
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Error creating postttttttt:", error);
    return {
      errors: {
        content: ["Failed to create reply"],
      },
    };
  }
};

export {
  createProjectPost,
  createProjectPostReply,
  fetchProjectPosts,
  fetchPostByIdAndReplies,
};
