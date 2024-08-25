"use server";
import { auth } from "@/auth";
import { baseUrl } from "@/constants";

const checkProjectTitle = async (title: string | undefined) => {
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const result = await fetch(
      `${baseUrl}/api/projects/check-title?title=${title}&userId=${userId}`,
    );
    const data = await result.json();
    console.log("CHECKING TITLE", data);
    return data;
  } catch (error) {
    console.error("Error checking project title:", error);
    return { error: true, message: "Error checking project title" };
  }
};

export { checkProjectTitle };
