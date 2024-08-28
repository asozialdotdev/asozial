"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

const sendMessage = async (
  friendshipId: string,
  actualUser: string,
  targetUser: string,
  content: string,
) => {
  const session = await auth();
  try {
    console.log("Sending message to user:", { actualUser, targetUser });

    const response = await fetch(`${baseUrl}/api/messages/${friendshipId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actualUser: session?.user.id,
        targetUser,
        content,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error sending message:", errorText);
      return { error: errorText };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error sending message:", error.message);
    return { error: error.message };
  }
};

export { sendMessage };
