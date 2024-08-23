"use server";
import { baseUrl } from "@/constants";
import axios from "axios";

const getUserByUsername = async (username: string) => {
  "use server";
  try {
    const res = await axios.get(`${baseUrl}/api/users/${username}`);
    return res.data;
  } catch (error: any) {
    console.log("Error fetching user by username:", error.message);
    return error;
  }
};

export { getUserByUsername };
