"use server";

import { baseUrl } from "@/constants";

const getAllUsers = async (
  query: string,
  currentPage: number,
  limit: number,
) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/users/search?query=${query}&page=${currentPage}&limit=${limit}`,
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
