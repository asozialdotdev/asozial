"use server";
import { baseUrl } from "@/constants";
import { auth } from "@/auth";

const acceptUserMatch = async (targetUserId: string, matchId: string) => {
  try {
    const session = await auth();
    console.log("Accepting match:", { targetUserId, matchId });

    const response = await fetch(`${baseUrl}/api/match/users/accept`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        targetUserId,
        matchId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error accepting match:", errorText);
      return { error: errorText };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error accepting match:", error.message);
    return { error: error.message };
  }
};

export { acceptUserMatch };
