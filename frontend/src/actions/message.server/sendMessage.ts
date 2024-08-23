"use server";
import { auth } from "@/auth";

const sendMessage = async (message: string, friendshipId: string) => {
  try {
    const response = await fetch(`/api/messages/${friendshipId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friendshipId, message }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
    return "Error sending message";
  }
};

export default sendMessage;
