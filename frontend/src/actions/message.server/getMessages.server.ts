"use server";
import { baseUrl } from "@/constants";

const getMessages = async (friendshipId: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/messages/${friendshipId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

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
