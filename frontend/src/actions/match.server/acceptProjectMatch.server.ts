"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

const acceptProjectMatch = async (ownerId: string, matchId: string) => {
  const session = await auth();
  try {
    console.log("Accepting project match:", { ownerId, matchId });

    const response = await fetch(`${baseUrl}/api/match/projects/accept`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerId: session?.user.id,
        matchId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error accepting project match:", errorText);
      return { error: errorText };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error accepting project match:", error.message);
    return { error: error.message };
  }
};

export { acceptProjectMatch };
