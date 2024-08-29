"use server";
import { baseUrl } from "@/constants";
import { auth } from "@/auth";

const acceptUserMatch = async (targetUserId: string, matchId: string) => {
  try {
    const session = await auth();

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
      return { error: errorText };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error accepting match:", error.message);
    return { error: error.message };
  }
};

export { acceptUserMatch };
