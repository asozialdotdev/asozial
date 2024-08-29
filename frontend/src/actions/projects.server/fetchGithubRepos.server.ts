"use server";
import { auth } from "@/auth";

// GET to get a project from Github
const fetchGithubRepos = async () => {
  const session = await auth();
  const owner = session?.user?.githubUsername;

  try {
    const response = await fetch(
      `https://api.github.com/users/${owner}/repos?per_page=100`,
      {
        cache: "force-cache",
      },
    );

    if (!response.ok) {
      throw new Error("Error fetching Github repos");
    }
    const data = await response.json();

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
