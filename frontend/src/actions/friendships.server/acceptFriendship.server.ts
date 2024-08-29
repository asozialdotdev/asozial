"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

export type AcceptFriendshipState = {
  errors: {
    accept?: string[];
  };
  success?: boolean;
  data?: any;
};

const acceptFriendship = async (
  formState: AcceptFriendshipState,
  formData: FormData,
): Promise<AcceptFriendshipState> => {
  const session = await auth();
  const userId = session?.user?.id;
  const friendshipId = formData.get("friendshipId") as string;
  try {
    const response = await fetch(
      `${baseUrl}/api/friends/${friendshipId}/accept`,
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
    console.log("Error accepting friendship:", error.message);
    return {
      errors: {
        accept: ["Error accepting friendship. Please try again."],
      },
    };
  }
};

export { acceptFriendship };
