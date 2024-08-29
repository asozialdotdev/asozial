"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { ReplyId } from "@/types/ProjectPost";

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
    return data.dislikes;
  } catch (error) {
    console.error("Error disliking reply:", error);
  }
};

export { createDislikeReply };
