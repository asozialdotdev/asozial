"use server";

import { auth } from "@/auth";
import { baseUrl } from "@/constants";

const getAllUsers = async (
  query: string,
  currentPage: number,
  limit: number,
) => {
  try {
    const session = await auth();
    const actualUserId = session?.user?.id;
    const response = await fetch(
      `${baseUrl}/api/users/search?query=${encodeURIComponent(
        query,
      )}&page=${currentPage}&limit=${limit}&actualUserId=${actualUserId}`,
      {
        cache: "no-cache",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const users = await response.json();
    console.log("Searched users:", users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], totalPages: 1 };
  }
};

export { getAllUsers };
