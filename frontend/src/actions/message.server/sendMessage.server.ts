"use server";
import { baseUrl } from "@/constants";
import axios from "axios";

const sendMessage = async (
  friendshipId: string,
  actualUser: string,
  targetUser: string,
  content: string,
) => {
  console.log("Sending message from", actualUser, "to", targetUser);

  try {
    const res = await axios.post(`${baseUrl}/api/messages/${friendshipId}`, {
      actualUser,
      targetUser,
      content,
    });

    return res.data;
  } catch (error: any) {
    console.log("Error sending message:", error.message);
    return error;
  }
};

export {sendMessage};
