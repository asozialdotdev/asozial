"use server";
import { baseUrl } from "@/constants";
import { auth } from "@/auth";

const matchUsers = async (actualUserId: string, targetUserId: string) => {
  try {
    const session = await auth();
    console.log("Matching users:", { actualUserId, targetUserId });

    const response = await fetch(`${baseUrl}/api/match/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actualUserId: session?.user.id,
        targetUserId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error matching users:", errorText);
      return { error: errorText };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error matching users:", error.message);
    return { error: error.message };
  }
};

export { matchUsers };