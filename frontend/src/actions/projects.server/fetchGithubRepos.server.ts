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

    console.log("data", data);
    console.log("Github repo:", data);
    return data;
  } catch {
    console.error("Error fetching Github repos");
    return { error: true, message: "Error fetching Github repos" };
  }
};

export { fetchGithubRepos };
