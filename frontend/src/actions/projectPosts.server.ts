"use server";
//Next
import { revalidatePath } from "next/cache";

//Lib
import { createPostSchema, createReplySchema } from "@/lib/schema";
import { auth } from "@/auth";

//Constants
import { baseUrl } from "@/constants";

//Types
import type {
  ProjectPost,
  ProjectPostId,
  Reply,
  ReplyId,
} from "@/types/ProjectPost";
import type { ProjectId } from "@/types/Project";

type CreatePostFormState = {
  errors: {
    title?: string[];
    content?: string[];
    projectId?: string[];
  };
  success?: boolean;
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
// GET Fetch a post by ID and its replies
const fetchPostByIdAndReplies = async (projectPostId: ProjectPostId) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/project-posts/${projectPostId}`,
      { next: { revalidate: 300 } },
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
    console.log("data LIKE:", data);
    return data.likes;
  } catch (error) {
    console.error("Error liking post:", error);
  }
};

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
    console.log("Disliked data:", data);
    return data.dislikes;
  } catch (error) {
    console.error("Error disliking post:", error);
  }
};

// POST Like a reply
const createLikeReply = async (replyId: ReplyId) => {
  const session = await auth();
  try {
    const response = await fetch(`${baseUrl}/api/replies/${replyId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user?.id,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to like post: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("REPLY LIKE:", data);
    return data.likes;
  } catch (error) {
    console.error("Error liking reply:", error);
  }
};

// POST Dislike a reply
const createDislikeReply = async (replyId: ReplyId) => {
  const session = await auth();
  try {
    const response = await fetch(`${baseUrl}/api/replies/${replyId}/dislike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user?.id,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to dislike post: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("REPLY DISLIKE:", data);
    return data.dislikes;
  } catch (error) {
    console.error("Error disliking reply:", error);
  }
};

//PUT update a project post

const updateProjectPost = async (
  projectPostId: ProjectPostId,
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
          edited: true,
          userId: session?.user?.id,
        }),
      },
    );
    const updatedPost = await response.json();
    console.log("Updated post:", updatedPost);
    revalidatePath(`/projects/${post.projectId}/posts/${projectPostId}`);
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

//PUT update a project post

const updatePostReply = async (
  {
    projectPostId,
    replyId,
  }: { projectPostId: ProjectPostId; replyId: ReplyId },
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
  const { post, replies } = await fetchPostByIdAndReplies(projectPostId);

  const reply = replies.find((r: Reply) => r?._id === replyId);

  if (!reply) {
    throw new Error("Reply not found");
  }

  try {
    const response = await fetch(`${baseUrl}/api/replies/${replyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: result.data.content,
        edited: true,
        userId: session?.user?.id,
      }),
    });
    const updatedReply = await response.json();
    console.log("Updated reply:", updatedReply);
    revalidatePath(`/projects/${post.projectId}/posts/${projectPostId}`);
    return {
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Error updating reply:", error);
    return {
      errors: {
        content: ["Failed to update reply"],
      },
    };
  }
};

export {
  createProjectPost,
  createProjectPostReply,
  fetchProjectPosts,
  fetchPostByIdAndReplies,
  createLikePost,
  createDislikePost,
  createLikeReply,
  createDislikeReply,
  updateProjectPost,
  updatePostReply,
};
