"use server";
import { baseUrl } from "@/constants";
import axios from "axios";

const sendFriendship = async (senderId: string, receiverId: string) => {
  console.log("senderId", senderId);
  console.log("receiverId", receiverId);
  try {
    const res = await axios.post(`${baseUrl}/api/friends`, {
      senderId,
      receiverId,
    });
    return res.data;
  } catch (error: any) {
    console.log("Error sending friendship:", error.message);
    return error;
  }
};

export default sendFriendship;
