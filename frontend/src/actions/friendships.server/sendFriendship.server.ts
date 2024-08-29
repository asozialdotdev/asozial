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

    const data = await response.json();

    if (response.status === 409) {
      return {
        errors: {
          send: ["You are already send a request or you are already friends."],
        },
      };
    }
    return {
      errors: {},
      success: true,
      data,
    };
  } catch (error: any) {
    console.error("Error sending friendship:", error.message);
    return {
      errors: {
        send: ["Error sending friendship. Please try again."],
      },
    };
  }
};

export { sendFriendship };
