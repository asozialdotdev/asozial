"use server";

import { baseUrl } from "@/constants";

const getUserByUsername = async (username: string | undefined | null) => {
  try {
    const res = await fetch(`${baseUrl}/api/users/${username}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to get user by username: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log("Failed to get user by username:", error);
    return { error: true, message: "Failed to get user by username" };
  }
};

export { getUserByUsername };
