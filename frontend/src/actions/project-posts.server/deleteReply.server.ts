"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { ReplyId } from "@/types/ProjectPost";
import { revalidatePath } from "next/cache";

const deleteReply = async (replyId: ReplyId) => {
  const session = await auth();

  try {
    const response = await fetch(`${baseUrl}/api/replies/${replyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user?.id,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to delete reply: ${response.statusText}`);
    }
    const data = await response.json();

    revalidatePath(`/projects/${data.projectId}/posts/${data.projectPostId}`);
    return { error: false, message: "Reply deleted" };
  } catch (error) {
    console.error("Error deleting reply:", error);
    return { error: true, message: "Error deleting reply" };
  }
};

export { deleteReply };
