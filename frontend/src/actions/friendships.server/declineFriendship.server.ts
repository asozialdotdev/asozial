"use server";
import { baseUrl } from "@/constants";
import { auth } from "@/auth";

const declineFriendship = async (userId: string, friendshipId: string) => {
  const session = await auth();
  console.log("receiverId", userId);
  try {
    const res = await fetch(`${baseUrl}/api/friends/${friendshipId}/decline`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: session?.user?.id }),
    });
    const data = await res.json();
  } catch (error: any) {
    console.log("Error declining friendship:", error.message);
    return error;
  }
};

export default declineFriendship;
