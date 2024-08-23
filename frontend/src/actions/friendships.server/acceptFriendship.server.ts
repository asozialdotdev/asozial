"use server";
import { baseUrl } from "@/constants";
import axios from "axios";

const acceptFriendship = async (userId: string, friendshipId: string) => {
  console.log("userId", userId);
  try {
    const res = await axios.patch(
      `${baseUrl}/api/friends/${friendshipId}/accept`,
      {
        userId,
      },
    );
    return res.data;
  } catch (error: any) {
    console.log("Error accepting friendship:", error.message);
    return error;
  }
};

export default acceptFriendship;
