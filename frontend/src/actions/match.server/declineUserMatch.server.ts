"use server";
import { baseUrl } from "@/constants";

const declineUserMatch = async (targetUserId: string, matchId: string) => {
  try {
    console.log("Declining match:", { targetUserId, matchId });

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
      console.log("Error declining match:", errorText);
      return { error: errorText };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error declining match:", error.message);
    return { error: error.message };
  }
};

export { declineUserMatch };
