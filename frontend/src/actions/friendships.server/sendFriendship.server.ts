"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

const sendFriendship = async (senderId: string, receiverId: string) => {
  const session = await auth();
  try {
    const response = await fetch(`${baseUrl}/api/friends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderId: session?.user?.id,
        receiverId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("API responded with error:", errorData);
      return errorData;
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error sending friendship:", error.message);
    return { message: "Error sending request" };
  }
};

export default sendFriendship;
