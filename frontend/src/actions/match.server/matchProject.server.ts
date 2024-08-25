"use server";
import { baseUrl } from "@/constants";
import axios from "axios";

const matchUserWithProject = async (
  actualUserId: string,
  projectId: string,
) => {
  console.log("Matching user", actualUserId, "with project", projectId);

  try {
    const res = await axios.post(`${baseUrl}/api/projects/match`, {
      actualUser: actualUserId,
      projectId: projectId,
    });

    return res.data;
  } catch (error: any) {
    console.log("Error matching user with project:", error.message);
    return error;
  }
};

export { matchUserWithProject };
