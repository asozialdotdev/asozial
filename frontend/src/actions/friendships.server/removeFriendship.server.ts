"use server";
import { baseUrl } from "@/constants";
import axios from "axios";

const deleteFriendship = async (actualUser: string) => {
  console.log("actualUser", actualUser);
  try {
    const res = await axios.delete(`${baseUrl}/api/friends`, {
      data: { actualUser },
    });

    if (res.status === 204) {
      console.log("Friendship successfully deleted");
      return { success: true };
    }

    return res.data;
  } catch (error: any) {
    console.log("Error deleting friendship:", error.message);
    return error;
  }
};

export default deleteFriendship;
