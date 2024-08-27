"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

const acceptFriendship = async (userId: string, friendshipId: string) => {
  const session = await auth();
  try {
    const response = await fetch(
      `${baseUrl}/api/friends/${friendshipId}/accept`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session?.user?.id, friendshipId }),
      },
    );

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error accepting friendship:", error.message);
    return { message: "Error accepting friendship" };
  }
};

export default acceptFriendship;
