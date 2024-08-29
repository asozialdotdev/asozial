"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

export type DeclineFriendshipState = {
  errors: {
    decline?: string[];
  };
  success?: boolean;
  data?: any;
};

const declineFriendship = async (
  formState: DeclineFriendshipState,
  formData: FormData,
): Promise<DeclineFriendshipState> => {
  const session = await auth();
  const userId = session?.user?.id;
  const friendshipId = formData.get("friendshipId") as string;
  try {
    const response = await fetch(
      `${baseUrl}/api/friends/${friendshipId}/decline`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, friendshipId }),
      },
    );

    const data = await response.json();
    return {
      errors: {},
      success: true,
      data,
    };
  } catch (error: any) {
    console.error("Error declining friendship:", error.message);
    return {
      errors: {
        decline: ["Error declining friendship. Please try again."],
      },
    };
  }
};

export { declineFriendship };
