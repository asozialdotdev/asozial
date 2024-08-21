import { notFound } from "next/navigation";
import { auth } from "@/auth";
import {
  Mail,
  Building,
  MapPinHouse,
  Globe,
  Github,
  FolderGit,
  CircleUserRound,
  Users,
  Star,
  Code,
  Twitter,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { languagesWithColors } from "@/constants";
import type { User } from "@/types/User";
import getUserByUsername from "@/actions/getUserByUsername.server";

type TechStackEntry = [
  string,
  { lines: number; projects: number; textColor: any; bgColor: any; Icon: any },
];

async function AccountPage() {
  const user = await getUserByUsername();
  console.log(user);
  if (!user) {
    notFound();
  }

  const githubCreatedAtDate = new Date(user.githubCreatedAt);
  const formattedDate = githubCreatedAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const getUserGithubFollowers = async () => {
    if (!user.githubFollowersUrl) {
      console.error("user.githubFollowersUrl is undefined");
      return [];
    }
    try {
      const data = await fetch(user.githubFollowersUrl);
      return data.json();
    } catch (error: any) {
      console.log("Error fetching GitHub followers:", error);
      return [];
    }
  };

  const getUserGithubSubscriptions = async () => {
    if (!user.githubSubscriptionsUrl) {
      console.error("user.githubSubscriptionsUrl is undefined");
      return [];
    }
    const data = await fetch(user.githubSubscriptionsUrl);
    return data.json();
  };

  const getUserGithubOrganizations = async () => {
    if (!user.githubOrganizationsUrl) {
      console.error("user.githubOrganizationsUrl is undefined");
      return [];
    }
    const data = await fetch(user.githubOrganizationsUrl);
    return data.json();
  };

  const getUserGithubRepoLanguages = async () => {
    const languages: {
      [key: string]: { lines: number; projects: number };
    } = {};

    if (!user.githubReposUrl) {
      console.log("user.githubReposUrl is undefined");
      return languages; // or throw an error if appropriate
    }

    try {
      const data = await fetch(user.githubReposUrl);
      const repos = await data.json();

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
    } catch (error) {
      console.error("Error fetching GitHub repo languages:", error);
    }

    return languages;
  };
  const userTechStack = await getUserGithubRepoLanguages();
  const sortedUserTechStack = Object.entries(userTechStack).sort(
    (a, b) => b[1].lines - a[1].lines,
  );
  const sortedUserTechStackWithColors: TechStackEntry[] =
    sortedUserTechStack.map(([language, data]) => {
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
    });
  console.log("sortedUserTechStackWithColors:", sortedUserTechStackWithColors);
  const githubFollowers = await getUserGithubFollowers();
  const githubSubscriptions = await getUserGithubSubscriptions();
  const githubOrganizations = await getUserGithubOrganizations();

  return (
    <PageContainer className="gap-8">
      <PageTitle>Account</PageTitle>
      <div className="flex flex-col gap-8 text-lg font-light">
        <div className="flex items-center justify-evenly gap-4">
          <Image
            className="rounded-full border-4 border-dark p-1 dark:border-light"
            src={user.image}
            alt={user.name}
            loading="lazy"
            width={100}
            height={100}
          />
          <div className="flex flex-col justify-evenly gap-2">
            <h3 className="text-2xl font-semibold">{user.username}</h3>
            <p className="text-xs">Github user since {formattedDate}</p>
            <div className="flex flex-row justify-start gap-6 text-xs">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <p className="flex flex-row items-center gap-2">
                      <Users size={12} /> {githubFollowers.length}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{githubFollowers.length} followers</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <p className="flex flex-row items-center gap-2">
                      <Star size={12} /> {githubSubscriptions.length}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{githubSubscriptions.length} starred</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <p className="flex flex-row items-center gap-2">
                      <Star size={12} /> {githubOrganizations.length}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{githubOrganizations.length} organizations</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <p className="flex flex-row items-center gap-2">
                      <FolderGit size={12} /> {user.githubPublicReposNumber}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{user.githubPublicReposNumber} public repos</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <p className="flex flex-row items-center gap-2">
                      <Code size={12} /> {user.githubPublicGistsNumber}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{user.githubPublicGistsNumber} public gists</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button variant={"outline"}>
              <a
                href={user.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center gap-2"
              >
                View on <Github size={16} />
              </a>
            </Button>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div>
            <div className="flex flex-row items-center gap-8">
              <Globe size={16} />
              <a href={"https://" + user.blog} target="_blank" rel="noreferrer">
                {user.blog}
              </a>
            </div>
            <div className="flex flex-row items-center gap-8">
              <Mail size={16} />
              {user.email}
            </div>
            {user.twitterUsername && (
              <div className="flex flex-row items-center gap-8">
                <Twitter size={16} />
                <a
                  href={`https://twitter.com/${user.twitterUsername}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user.twitterUsername}
                </a>
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-row items-center gap-8">
              <Building size={16} />
              {user.company}
            </div>

            <div className="flex flex-row items-center gap-8">
              <MapPinHouse size={16} />
              {user.location}
            </div>
          </div>
        </div>
        <div className="text-md flex flex-row items-center gap-8">
          <p
            className={`italic before:text-2xl before:font-bold before:content-['"'] after:text-2xl after:font-bold after:content-['"']`}
          >
            {user.bio}
          </p>
        </div>
        <div>
          <h3 className="flex flex-wrap gap-4 font-semibold">
            <Layers size={24} />
            Tech Stack
          </h3>
          <Table className="text-center">
            <TableHeader>
              <TableRow className="text-center">
                <TableHead className="text-center">Icon</TableHead>
                <TableHead className="text-center">Language</TableHead>
                <TableHead className="text-center">Lines of code</TableHead>
                <TableHead className="text-center">Projects</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUserTechStackWithColors.map(
                ([language, { lines, projects, textColor, Icon }]) => (
                  <TableRow key={language}>
                    <TableCell>
                      {Icon ? (
                        <Icon
                          className={`mx-auto max-h-6 max-w-6 ${textColor}`}
                        />
                      ) : (
                        <p className={`mx-auto ${textColor}`}>?</p>
                      )}
                    </TableCell>
                    <TableCell>{language}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat().format(lines)}
                    </TableCell>
                    <TableCell>{projects}</TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>
        <div>
          <h3 className="flex flex-wrap gap-4 font-semibold">
            <CircleUserRound size={24} />
            Friends
          </h3>
          <div></div>
        </div>
        <div>
          <h3 className="flex flex-wrap gap-4 font-semibold">
            <FolderGit size={24} />
            Projects
          </h3>
          <div>
            <p>
              Projects joined:{" "}
              {user.projectsJoined ? user.projectsJoined.length : 0}
            </p>
            <p>
              Projects suggested:{" "}
              {user.projectsSuggested ? user.projectsSuggested.length : 0}
            </p>
            <p>
              Projects applied:{" "}
              {user.projectsApplied ? user.projectsApplied.length : 0}
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default AccountPage;
