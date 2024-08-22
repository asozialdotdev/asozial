"use server";
import { auth } from "@/auth";
import axios from "axios";

// GET to get a project from Github
const fetchGithubRepos = async () => {
  const session = await auth();
  const owner = session?.user?.githubUsername;
  console.log("owner", owner);

  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${owner}/repos?per_page=100`,
    );
    if (data.status !== 200) {
      throw new Error("Error fetching Github repos");
    }

    console.log("data", data);
    console.log("Github repo:", data);
    return data;
  } catch (error) {
    console.error("Error fetching Github repos:", error);
    return { error: true, message: "Error fetching Github repos" };
  }
};

export { fetchGithubRepos };
