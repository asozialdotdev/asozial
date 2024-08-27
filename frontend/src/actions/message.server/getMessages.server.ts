"use server";
import { baseUrl } from "@/constants";

const getMessages = async (
  friendshipId: string,
  actualUser: string,
  targetUser: string,
) => {
  try {
    console.log("Fetching messages between users:", { actualUser, targetUser });

    const queryParams = new URLSearchParams({
      actualUser,
      targetUser,
    });

    const response = await fetch(
      `${baseUrl}/api/messages/${friendshipId}?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error fetching messages:", errorText);
      return { error: errorText };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error fetching messages:", error.message);
    return { error: error.message };
  }
};

export { getMessages };
