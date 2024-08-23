"use server";
import { baseUrl } from "@/constants";
import axios from "axios";

const declineFriendship = async (receiverId: string, friendshipId: string) => {
  console.log("receiverId", receiverId);
  try {
    const res = await axios.patch(
      `${baseUrl}/api/friends/${friendshipId}/decline`,
      {
        receiverId,
      },
    );
    return res.data;
  } catch (error: any) {
    console.log("Error declining friendship:", error.message);
    return error;
  }
};

export default declineFriendship;
