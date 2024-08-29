"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

const getUserFriendStatuses = async () => {
  const session = await auth();
  if (!session) {
    console.error("No session found");
    return;
  }
  try {
    const response = await fetch(
      `${baseUrl}/api/friends/${session.user.id}/status`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch friend requests: ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching friend requests:", error.message);
    return {
      error: true,
      message: "Error getting friends requests. Please try again.",
    };
  }
};

export { getUserFriendStatuses };
