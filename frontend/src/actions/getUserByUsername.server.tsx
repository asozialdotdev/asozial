import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import type { User } from "@/types/User";

const getUserByUsername = async () => {
  "use server";
  const session = await auth();
  console.log(session);
  if (!session || !session.user || !session.user.githubUsername) {
    console.log("Session or username is not defined");
    return null;
  }
  const username = session.user.githubUsername;
  const data = await fetch(`${baseUrl}/users/${username}`, {
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
