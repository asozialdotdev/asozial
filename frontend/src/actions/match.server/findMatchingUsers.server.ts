"use server";
import { baseUrl } from "@/constants";
import axios from "axios";

const findMatchingUsers = async (actualUser: {
  avoidedUsers: string[];
  techStack: string[];
  languagesSpoken: string[];
}) => {
  console.log("Finding matching users for", actualUser);

  try {
    const res = await axios.get(`${baseUrl}/api/match/users`, {
      data: {
        actualUser,
      },
    });

    return res.data;
  } catch (error: any) {
    console.log("Error finding matching users:", error.message);
    return error;
  }
};

export { findMatchingUsers };
