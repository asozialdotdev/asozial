import { auth } from "@/auth";
import { baseUrl } from "@/constants";

const getUserByUsername = async () => {
  const session = await auth();
  ("use server");
  const data = await fetch(`${baseUrl}/users/${session?.user?.username}`, {
    method: "GET",
  });
  if (!data) {
    console.log("User not found");
  } else {
    const user = await data.json();
    return user;
  }
};

export default getUserByUsername;
