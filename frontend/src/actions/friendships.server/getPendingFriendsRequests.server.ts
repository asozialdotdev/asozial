"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

const getPendingFriendsRequests = async () => {
  const session = await auth();
  const actualUser = session?.user?.id;

  try {
    const response = await fetch(
      `${baseUrl}/api/friends/pending?actualUser=${actualUser}`,
      {
        cache: "no-cache",
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch pending friend requests: ${response.statusText}`,
      );
    }
    const data = await response.json();
    console.log("Pending Friends Request", data);
    return data;
  } catch (error) {
    console.error("Error fetching pending friend requests:", error);
    return {
      error: true,
      message: "Error getting pending friends requests. Please try again.",
    };
  }
};

export { getPendingFriendsRequests };
