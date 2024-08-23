"use server";
import { baseUrl } from "@/constants";
import axios from "axios";

const getAllMessages = async (
  friendshipId: string,
  actualUser: string,
  targetUser: string,
) => {
  console.log("Fetching messages between", actualUser, "and", targetUser);

  try {
    const res = await axios.get(`${baseUrl}/api/messages/${friendshipId}`, {
      data: {
        actualUser,
        targetUser,
      },
    });

    return res.data;
  } catch (error: any) {
    console.log("Error fetching messages:", error.message);
    return error;
  }
};

export { getAllMessages };
