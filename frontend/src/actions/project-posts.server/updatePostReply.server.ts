"use server";

import { ProjectPostId, Reply, ReplyId } from "@/types/ProjectPost";
import { CreateReplyFormState } from "./createProjectPostReply.server";
import { auth } from "@/auth";
import { createReplySchema } from "@/lib/schema";
import { fetchPostByIdAndReplies } from "./fetchPostByIdAndReplies.server";
import { baseUrl } from "@/constants";
import { revalidatePath } from "next/cache";

//PUT update a reply
const updatePostReply = async (
  {
    projectPostId,
    replyId,
  }: { projectPostId: ProjectPostId; replyId: ReplyId },
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
    revalidatePath(
      `/${username}/${post.projectId.slug}/${post.projectId._id}/posts/${projectPostId}`,
    );
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

export { updatePostReply };
