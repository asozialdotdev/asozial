import { baseUrl } from "@/constants";

const getUserByUsername = async ({ username }: { username: string }) => {
  "use server";
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
