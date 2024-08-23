"use server";
import { auth } from "@/auth";
import axios from "axios";

// GET to get a project from Github
const fetchGithubRepos = async () => {
  const session = await auth();
  const owner = session?.user?.githubUsername;
  console.log("owner", owner);

  try {
    const response = await fetch(
      `https://api.github.com/users/${owner}/repos?per_page=100`,
    );

    if (!response.ok) {
      throw new Error("Error fetching Github repos");
    }
    const data = await response.json();

    console.log("data", data);
    console.log("Github repo:", data);
    return data;
  } catch (error) {
    console.error("Error fetching Github repos:", error);
    return {
      error: true,
      message: "Error fetching Github repos. Please try again later.",
    };
  }
};

export { fetchGithubRepos };
