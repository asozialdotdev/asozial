import type { User } from "../../types/User";
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
import { notFound } from "next/navigation";

function UserComponent({ user }: { user: User }) {
  console.log("user on page", user);

  let formattedDate = "Unknown";
  if (user?.github?.createdAt) {
    const githubCreatedAtDate = new Date(user.github.createdAt);
    formattedDate = githubCreatedAtDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  }
  return (
    <section className="flex flex-col gap-8 text-lg font-light">
      <div className="flex items-center justify-evenly gap-4">
        {user && user.image && user.image ? (
          <Image
            className="rounded-full border-4 border-dark p-1 dark:border-light"
            src={user.image}
            alt={user.username}
            loading="lazy"
            width={100}
            height={100}
          />
        ) : (
          <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-800"></div>
        )}

        <div className="flex flex-col justify-evenly gap-2">
          <h3 className="text-2xl font-semibold">{user.username}</h3>
          <p className="text-xs">Github user since {formattedDate}</p>
          <div className="flex flex-row justify-start gap-6 text-xs">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p className="flex flex-row items-center gap-2">
                    <Users size={12} /> {user.github.followerNumber}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user.github.followerNumber} followers</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <p className="flex flex-row items-center gap-2">
                    <Star size={12} /> {user.github.subscriptionsNumber}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user.github.subscriptionsNumber} starred</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <p className="flex flex-row items-center gap-2">
                    <Building size={12} /> {user.github.organizationsNumber}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user.github.organizationsNumber} organizations</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <p className="flex flex-row items-center gap-2">
                    <FolderGit size={12} /> {user.github.publicReposNumber}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user.github.publicReposNumber} public repos</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <p className="flex flex-row items-center gap-2">
                    <Code size={12} /> {user.github.publicGistsNumber}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user.github.publicGistsNumber} public gists</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button variant={"outline"}>
            <a
              href={user.github.url}
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
            <a
              href={"https://" + user.website}
              target="_blank"
              rel="noreferrer"
            >
              {user.website}
            </a>
          </div>
          <div className="flex flex-row items-center gap-8">
            <Mail size={16} />
            {user.email}
          </div>
          {/* {user.socials && (
              <div className="flex flex-row items-center gap-8">
                <Twitter size={16} />
                <a
                  href={`https://twitter.com/${user.socials}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user.twitterUsername}
                </a>
              </div>
            )} */}
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
          {user.github.bio}
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
            {user.codingLanguages.map(
              ([language, { lines, projects, textColor, bgColor, Icon }]) => (
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
                  <TableCell>{new Intl.NumberFormat().format(lines)}</TableCell>
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
            {user.projects.projectsJoined
              ? user.projects.projectsJoined.length
              : 0}
          </p>
          <p>
            Projects suggested:{" "}
            {user.projects.projectsSuggested
              ? user.projects.projectsSuggested.length
              : 0}
          </p>
          <p>
            Projects applied:{" "}
            {user.projects.projectsApplied
              ? user.projects.projectsApplied.length
              : 0}
          </p>
        </div>
      </div>
    </section>
  );
}

export default UserComponent;
