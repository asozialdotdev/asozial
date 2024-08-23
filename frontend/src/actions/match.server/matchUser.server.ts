"use server";
import { baseUrl } from "@/constants";
import axios from "axios";

const matchUsers = async (actualUserId: string, targetUserId: string) => {
  console.log("Matching users:", actualUserId, "with", targetUserId);

  try {
    const res = await axios.post(`${baseUrl}/api/users/match`, {
      actualUser: actualUserId,
      targetUser: targetUserId,
    });

    return res.data;
  } catch (error: any) {
    console.log("Error matching users:", error.message);
    return error;
  }
};

export { matchUsers };
