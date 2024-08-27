"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { ReplyId } from "@/types/ProjectPost";
import { revalidatePath } from "next/cache";

const deleteReply = async (replyId: ReplyId) => {
  const session = await auth();
  const username = session?.user?.githubUsername;

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
    const { reply } = await response.json();
    console.log("Deleted reply:", reply);
    revalidatePath(
      `/${username}/${reply.projectPostId.projectId.slug}/${reply.projectPostId.projectId._id}/posts/${reply.projectPostId._id}`,
    );
    return { error: false, message: "Reply deleted" };
  } catch (error) {
    console.error("Error deleting reply:", error);
    return { error: true, message: "Error deleting reply" };
  }
};

export { deleteReply };
