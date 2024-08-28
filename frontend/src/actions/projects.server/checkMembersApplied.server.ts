"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";
import { UserId } from "@/types/User";

const checkMembersApplied = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const res = await fetch(
      `${baseUrl}/api/projects/applied-members?userId=${userId}`,

      { cache: "no-cache" },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch members applied");
    }
    const projects = await res.json();
    console.log("appliedProjects", projects);
    return { error: false, message: "Sucess", projects };
  } catch (error) {
    console.error("Failed to fetch members applied", error);
    return { error: true, message: "Failed to get requests. Please try again." };
  }
};

export { checkMembersApplied };
