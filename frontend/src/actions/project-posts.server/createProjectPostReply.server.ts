"use server";
import { auth } from "@/auth";
import { createReplySchema } from "@/lib/schema";
import { ProjectPostId, ReplyId } from "@/types/ProjectPost";
import { fetchPostByIdAndReplies } from "./fetchPostByIdAndReplies.server";
import { baseUrl } from "@/constants";
import { revalidatePath } from "next/cache";

export type CreateReplyFormState = {
  errors: {
    content?: string[];
  };
  success?: boolean;
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
  const username = session?.user?.githubUsername;

  const result = createReplySchema.safeParse({
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
    revalidatePath(`/${username}/${post.projectId.slug}/${post.projectId._id}/posts/${projectPostId}`);
    return {
      errors: {},
      success: true,
    };
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      errors: {
        content: ["Failed to create reply"],
      },
    };
  }
};

export { createProjectPostReply };
