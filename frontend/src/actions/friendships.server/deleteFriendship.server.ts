"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

export type DeleteFriendshipState = {
  errors: {
    delete?: string[];
  };
  success?: boolean;
  data?: any;
};

const deleteFriendship = async (
  formState: DeleteFriendshipState,
  formData: FormData,
): Promise<DeleteFriendshipState> => {
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const response = await fetch(`${baseUrl}/api/friends`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actualUser: userId,
      }),
    });

    if (response.status === 204) {
    }

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
        delete: ["Error declining friendship. Please try again."],
      },
    };
  }
};

export { deleteFriendship };
