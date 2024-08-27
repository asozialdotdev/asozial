"use server";
import { baseUrl } from "@/constants";
import { auth } from "@/auth";

const deleteFriendship = async (actualUser: string) => {
  console.log("actualUser", actualUser);
  const session = await auth();
  try {
    const response = await fetch(`${baseUrl}/api/friends`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actualUser: session?.user?.id,
      }),
    });

    if (response.status === 204) {
      console.log("Friendship successfully deleted");
      return { success: true };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error deleting friendship:", error.message);
    return { message: "Error deleting friendship" };
  }
};

export default deleteFriendship;
