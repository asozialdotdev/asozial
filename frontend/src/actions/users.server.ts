import { languagesWithColors } from "@/constants";
import { GithubRepo } from "@/types/Github";

const getUserGithubEvents = async (url: string) => {
  if (!url) {
    console.error("No GitHub events URL provided");
    return [];
  }
  try {
    const baseUrl = url.split("events")[0] + "events";
    const data = await fetch(baseUrl);
    return data.json();
  } catch (error: any) {
    console.log("Error fetching GitHub events:", error);
    return error;
  }
};

// get user github followers
const getUserGithubFollowers = async (url: string) => {
  if (!url) {
    console.error("No GitHub followers URL provided");
    return [];
  }
  try {
    const data = await fetch(url);
    return data.json();
  } catch (error: any) {
    console.log("Error fetching GitHub followers:", error);
    return error;
  }
};

const getUserGithubFollowing = async (url: string) => {
  if (!url) {
    console.error("No GitHub following URL provided");
    return [];
  }
  try {
    const baseUrl = url.split("following")[0] + "following";
    const data = await fetch(baseUrl);
    return data.json();
  } catch (error: any) {
    console.log("Error fetching GitHub following:", error);
    return error;
  }
};

// get user github subscriptions
const getUserGithubSubscriptions = async (url: string) => {
  if (!url) {
    console.error("user.githubSubscriptionsUrl is undefined");
    return [];
  }
  try {
    const data = await fetch(url);
    return data.json();
  } catch (error: any) {
    console.log("Error fetching GitHub subscriptions:", error);
    return error;
  }
};

// get user github organizations
const getUserGithubOrganizations = async (url: string) => {
  if (!url) {
    console.error("user.githubOrganizationsUrl is undefined");
    return;
  }
  try {
    const data = await fetch(url);
    return data.json();
  } catch (error: any) {
    console.log("Error fetching GitHub organizations:", error);
    return error;
  }
};

const getUserGithubPublicGists = async (url: string) => {
  if (!url) {
    console.error("user.githubGistsUrl is undefined");
    return [];
  }
  try {
    const baseUrl = url.split("gists")[0] + "gists";
    const data = await fetch(baseUrl);
    return data.json();
  } catch (error: any) {
    console.log("Error fetching GitHub gists:", error);
    return error;
  }
};

const getUserGithubRepos = async (url: string) => {
  if (!url) {
    console.error("user.githubReposUrl is undefined");
    return [];
  }
  try {
    const data = await fetch(url);
    return data.json();
  } catch (error: any) {
    console.log("Error fetching GitHub repos:", error);
    return error;
  }
};

// get user github repo languages
const getUserGithubRepoLanguages = async (repos: GithubRepo[]) => {
  const languages: {
    [key: string]: { lines: number; projects: number };
  } = {};

  if (!repos) {
    console.log("repo is undefined");
    return languages; // or throw an error if appropriate
  }

  try {
    for (const repo of repos) {
      const data = await fetch(repo.languages_url);
      const repoLanguages: { [key: string]: number } = await data.json();

      for (const [language, count] of Object.entries(repoLanguages)) {
        if (languages[language]) {
          languages[language].lines += count;
          languages[language].projects += 1;
        } else {
          languages[language] = { lines: count, projects: 1 };
        }
      }
    }
  } catch (error: any) {
    console.log("Error fetching GitHub repo languages:", error);
  }

  const sortedUserTechStack = Object.entries(languages).sort(
    (a, b) => b[1].lines - a[1].lines,
  );
  const sortedUserTechStackWithColors = sortedUserTechStack.map(
    ([language, data]) => {
      const bgColor = languagesWithColors.find(
        (entry) => entry.language === language,
      )?.bgColor;
      const textColor = languagesWithColors.find(
        (entry) => entry.language === language,
      )?.textColor;
      const Icon = languagesWithColors.find(
        (entry) => entry.language === language,
      )?.Icon;
      return [language, { ...data, textColor, bgColor, Icon }];
    },
  );
  return sortedUserTechStackWithColors;
};

// const getUserTechStack = async (url: string) => {
//   const userTechStack = await getUserGithubRepoLanguages(url);
//   const sortedUserTechStack = Object.entries(userTechStack).sort(
//     (a, b) => b[1].lines - a[1].lines,
//   );
//   const sortedUserTechStackWithColors = sortedUserTechStack.map(
//     ([language, data]) => {
//       const bgColor = languagesWithColors.find(
//         (entry) => entry.language === language,
//       )?.bgColor;
//       const textColor = languagesWithColors.find(
//         (entry) => entry.language === language,
//       )?.textColor;
//       const Icon = languagesWithColors.find(
//         (entry) => entry.language === language,
//       )?.Icon;
//       return [language, { ...data, textColor, bgColor, Icon }];
//     },
//   );
//   return sortedUserTechStackWithColors;
// };

export {
  getUserGithubFollowers,
  getUserGithubFollowing,
  getUserGithubSubscriptions,
  getUserGithubOrganizations,
  getUserGithubPublicGists,
  getUserGithubRepos,
  getUserGithubRepoLanguages,
};
