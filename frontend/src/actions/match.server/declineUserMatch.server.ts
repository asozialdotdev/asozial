"use server";
import { baseUrl } from "@/constants";

const declineUserMatch = async (targetUserId: string, matchId: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/match/users/decline`, {
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
    console.error("Error declining match:", error.message);
    return { error: error.message };
  }
};

export { declineUserMatch };
