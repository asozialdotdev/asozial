"use server";

import { baseUrl } from "@/constants";

const getAllUsers = async () => {
  const data = await fetch(`${baseUrl}/search/users`, {
    method: "GET",
  });
  if (!data) {
    console.log("Users not found");
  } else {
    const users = await data.json();
    return users;
  }
};

export { getAllUsers };
