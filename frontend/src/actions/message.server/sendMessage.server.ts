"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

const sendMessage = async (friendshipId: string, content: string) => {
  const session = await auth();
  try {
    console.log("Sending message from:", session?.user.id);
    console.log(content);

    const response = await fetch(`${baseUrl}/api/messages/${friendshipId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: session?.user.id,
        content: content,
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
