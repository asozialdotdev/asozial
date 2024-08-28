"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

export type SendFriendshipState = {
  errors: {
    send?: string[];
  };
  success?: boolean;
  data?: any;
};

const sendFriendship = async (
  formState: SendFriendshipState,
  formData: FormData,
): Promise<SendFriendshipState> => {
  const session = await auth();
  const senderId = session?.user?.id;
  const receiverId = formData.get("receiverId") as string;
  try {
    const response = await fetch(`${baseUrl}/api/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId,
        receiverId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send friend request: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      errors: {},
      success: true,
      data,
    };
  } catch (error: any) {
    console.log("Error sending friendship:", error.message);
    return {
      errors: {
        send: ["Error sending friendship. Please try again."],
      },
    };
  }
};

export { sendFriendship };
