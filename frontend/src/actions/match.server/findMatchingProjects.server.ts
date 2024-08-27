"use server";
import { baseUrl } from "@/constants";
import axios from "axios";

const findMatchingProjects = async (actualUser: {
  avoidedProjects: string[];
  joinedProjects: string[];
  appliedProjects: string[];
  languagesSpoken: string[];
  techStack: string[];
}) => {
  console.log("Finding matching projects for", actualUser);

  try {
    const res = await axios.get(`${baseUrl}/api/match/projects`, {
      data: {
        actualUser,
      },
    });

    return res.data;
  } catch (error: any) {
    console.log("Error finding matching projects:", error.message);
    return error;
  }
};

export { findMatchingProjects };
