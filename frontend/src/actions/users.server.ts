import { languagesWithColors } from "@/constants";
import { GithubRepo } from "@/types/Github";

const getUserGithubEvents = async (url: string, accessToken: string) => {
  if (!url) {
    console.error("No GitHub events URL provided");
    return [];
  }
  try {
    const baseUrl = url.split("events")[0] + "events";
    const data = await fetch(baseUrl, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    return data.json();
  } catch (error: any) {
    console.error("Error fetching GitHub events:", error);
    return error;
  }
};

// get user github followers
const getUserGithubFollowers = async (url: string, accessToken: string) => {
  if (!url) {
    console.error("No GitHub followers URL provided");
    return [];
  }
  try {
    const data = await fetch(url, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    return data.json();
  } catch (error: any) {
    console.error("Error fetching GitHub followers:", error);
    return error;
  }
};

const getUserGithubFollowing = async (url: string, accessToken: string) => {
  if (!url) {
    console.error("No GitHub following URL provided");
    return [];
  }
  try {
    const baseUrl = url.split("following")[0] + "following";
    const data = await fetch(baseUrl, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    return data.json();
  } catch (error: any) {
    console.error("Error fetching GitHub following:", error);
    return error;
  }
};

// get user github subscriptions
const getUserGithubSubscriptions = async (url: string, accessToken: string) => {
  if (!url) {
    console.error("user.githubSubscriptionsUrl is undefined");
    return [];
  }
  try {
    const data = await fetch(url, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    return data.json();
  } catch (error: any) {
    console.error("Error fetching GitHub subscriptions:", error);
    return error;
  }
};

// get user github organizations
const getUserGithubOrganizations = async (url: string, accessToken: string) => {
  if (!url) {
    console.error("user.githubOrganizationsUrl is undefined");
    return;
  }
  try {
    const data = await fetch(url, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    return data.json();
  } catch (error: any) {
    console.error("Error fetching GitHub organizations:", error);
    return error;
  }
};

//get user github public gists
const getUserGithubPublicGists = async (url: string, accessToken: string) => {
  if (!url) {
    console.error("user.githubGistsUrl is undefined");
    return [];
  }
  try {
    const baseUrl = url.split("gists")[0] + "gists";
    const data = await fetch(baseUrl, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    return data.json();
  } catch (error: any) {
    console.error("Error fetching GitHub gists:", error);
    return error;
  }
};

// get user github repos
const getUserGithubRepos = async (url: string, accessToken: string) => {
  if (!url) {
    console.error("user.githubReposUrl is undefined");
    return [];
  }
  try {
    const data = await fetch(url, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    return data.json();
  } catch (error: any) {
    console.error("Error fetching GitHub repos:", error);
    return error;
  }
};

// get user github repo languages

type LanguageData = {
  language: string;
  lines: number;
  projects: number;
  bgColor?: string;
  textColor?: string;
  Icon?: any;
};

const getUserGithubRepoLanguages = async (
  repos: GithubRepo[],
  accessToken: string,
) => {
  const languages: {
    [key: string]: { lines: number; projects: number };
  } = {};

  if (!repos) {
    console.error("repo is undefined");
    return languages;
  }

  try {
    for (const repo of repos) {
      const data = await fetch(repo.languages_url, {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });
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
    console.error("Error fetching GitHub repo languages:", error);
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
      return {
        language,
        lines: data.lines,
        projects: data.projects,
        bgColor,
        textColor,
        Icon,
      };
    },
  );

  return sortedUserTechStackWithColors;
};

export {
  getUserGithubFollowers,
  getUserGithubFollowing,
  getUserGithubSubscriptions,
  getUserGithubOrganizations,
  getUserGithubPublicGists,
  getUserGithubRepos,
  getUserGithubRepoLanguages,
};
