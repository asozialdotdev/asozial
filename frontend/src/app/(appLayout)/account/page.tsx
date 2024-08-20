import { notFound } from "next/navigation";
import { auth } from "@/auth";
import {
  Mail,
  Building,
  MapPinHouse,
  Globe,
  MessageSquareMore,
  Github,
  FolderGit,
  CircleUserRound,
  Users,
  Star,
  Code,
  Twitter,
  Layers,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import Image from "next/image";
import PageCard from "@/components/common/PageCard";

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

type TechStackEntry = [string, { lines: number; projects: number; color: any }];

const user = {
  email: "hello@benjamin.dev",
  username: "benjamindotdev",
  name: "benjamin.dev",
  company: "Freelance",
  blog: "benjamin.dev",
  twitterUsername: null,
  bio: "Developer working with React, Typescript, TailwindCSS and more.",
  location: "Berlin, DE",
  hireable: true,
  image: "https://avatars.githubusercontent.com/u/25672710?v=4",
  githubApiUrl: "https://api.github.com/users/benjamindotdev",
  githubUrl: "https://github.com/benjamindotdev",
  githubFollowersUrl: "https://api.github.com/users/benjamindotdev/followers",
  githubFollowingUrl:
    "https://api.github.com/users/benjamindotdev/following{/other_user}",
  githubPublicGistsUrl:
    "https://api.github.com/users/benjamindotdev/gists{/gist_id}",
  githubPrivateGistsNumber: "0",
  githubStarredUrl:
    "https://api.github.com/users/benjamindotdev/starred{/owner}{/repo}",
  githubSubscriptionsUrl:
    "https://api.github.com/users/benjamindotdev/subscriptions",
  githubOrganizationsUrl: "https://api.github.com/users/benjamindotdev/orgs",
  githubReposUrl: "https://api.github.com/users/benjamindotdev/repos",
  githubPublicReposNumber: 63,
  githubPublicGistsNumber: 0,
  githubCreatedAt: "2017-02-09T21:05:19Z",
  githubUpdatedAt: "2024-08-06T12:26:44Z",
  githubCollaboratorsNumber: 1,
  socials: [],
  languagesSpoken: [],
  techStack: [],
  projectsJoined: [],
  projectsSuggested: [],
  projectsApplied: [],
  dashboardPosts: [],
  avoidedUsers: [],
  avoidedProjects: [],
  matchedUsers: [],
  createdAt: {
    $date: "2024-08-20T09:40:45.734Z",
  },
  updatedAt: {
    $date: "2024-08-20T09:58:54.494Z",
  },
  __v: 0,
};

async function AccountPage() {
  const githubCreatedAtDate = new Date(user.githubCreatedAt);
  // Format the date to "Month Year"
  const formattedDate = githubCreatedAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  const getUserGithubFollowers = async () => {
    const data = await fetch(user.githubFollowersUrl);
    return data.json();
  };
  const getUserGithubSubscriptions = async () => {
    const data = await fetch(user.githubSubscriptionsUrl);
    return data.json();
  };
  const getUserGithubOrganizations = async () => {
    const data = await fetch(user.githubOrganizationsUrl);
    return data.json();
  };
  const getUserGithubRepoLanguages = async () => {
    const languages: { [key: string]: { lines: number; projects: number } } =
      {};
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
    return languages;
  };
  const userTechStack = await getUserGithubRepoLanguages();
  const sortedUserTechStack = Object.entries(userTechStack).sort(
    (a, b) => b[1].lines - a[1].lines,
  );
  const sortedUserTechStackWithColors: TechStackEntry[] =
    sortedUserTechStack.map(([language, data]) => {
      const color = languagesWithColors.find(
        (entry) => entry.language === language,
      )?.color;
      return [language, { ...data, color }];
    });
  console.log("sortedUserTechStackWithColors:", sortedUserTechStackWithColors);
  const githubFollowers = await getUserGithubFollowers();
  const githubSubscriptions = await getUserGithubSubscriptions();
  const githubOrganizations = await getUserGithubOrganizations();

  //const session = await auth();
  //const data = await fetch(`/api/user/${session?.user?.id}`);

  //const user = await data.json();

  // if (!session) {
  //   return notFound();
  // }
  // console.log(session);

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
          <Table className="relative max-h-80 overflow-y-auto">
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Lines of code</TableHead>
                <TableHead>Projects</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUserTechStackWithColors.map(
                ([language, { lines, projects, color }]) => (
                  <TableRow key={language}>
                    <TableCell>
                      <div
                        className={`h-6 w-6 rounded-xl ${color || "bg-dark dark:bg-light"}`}
                      ></div>
                    </TableCell>
                    <TableCell>{language}</TableCell>
                    <TableCell>{lines}</TableCell>
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
            <p>Projects joined: {user.projectsJoined.length}</p>
            <p>Projects suggested: {user.projectsSuggested.length}</p>
            <p>Projects applied: {user.projectsApplied.length}</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default AccountPage;
