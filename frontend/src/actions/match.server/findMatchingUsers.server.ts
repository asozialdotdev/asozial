"use server";
import { baseUrl } from "@/constants";
import { auth } from "@/auth";

const findMatchingUsers = async (actualUser: {
  _id: string;
  skills: {
    codingLanguages: string[];
    languagesSpoken: string[];
  };
  matches: {
    users: {
      declined: string[];
    };
  };
}) => {
  try {
    const session = await auth();
    console.log("Finding matching users for", actualUser);

    const response = await fetch(`${baseUrl}/api/match/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actualUser: session?.user.id,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error finding matching users:", errorText);
      return { error: errorText };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("Error finding matching users:", error.message);
    return { error: error.message };
  }
};

export { findMatchingUsers };
