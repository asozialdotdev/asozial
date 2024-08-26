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
      {
        cache: "force-cache",
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch members applied");
    }
    const membersApplied = await res.json();
    console.log("appliedProjects", membersApplied);
    return membersApplied;
  } catch (error) {
    console.error("Failed to fetch members applied", error);
    return { error: true, message: "Failed to fetch members applied" };
  }
};

export { checkMembersApplied };
