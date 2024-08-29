import type { CodingLanguage, User } from "../../types/User";
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
// import ButtonAddFriend from "../common/ui/buttons/ButtonAddFriend";
// import sendFriendship from "@/actions/friendships.server/sendFriendship.server";
import { auth } from "@/auth";
import AddFriendForm from "../requests/AddFriendForm";
import UserInfo from "./UserInfo";

async function UserComponent({ user }: { user: User }) {
  const session = await auth();
  const actualUserId = session?.user?.id;

  let formattedDate = "Unknown";
  if (user?.github?.createdAt) {
    const githubCreatedAtDate = new Date(user.github.createdAt);
    formattedDate = githubCreatedAtDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  }
  return (
    <section className="flex flex-col gap-8 text-lg font-light w-full">
      <div className="flex items-center justify-center gap-4 w-full">
        {/* Avatar */}
        {user && user.info.image && user.info.image ? (
          <Image
            className="rounded-full border-4 border-dark p-1 dark:border-light"
            src={user.info.image}
            alt={user.username}
            loading="lazy"
            width={100}
            height={100}
          />
        ) : (
          <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-800"></div>
        )}

        <div className="flex flex-col justify-evenly gap-4">
          {/* Username */}
          <h3 className="text-2xl font-semibold">{user.username}</h3>
          <p className="text-xs">Github user since {formattedDate}</p>
          <div className="flex flex-row justify-start gap-6 text-xs">
            {/* Followers, Subscriptions, Organizations, Public Repos, Public Gists */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p className="flex flex-row items-center gap-2">
                    <Users size={15} /> {user.github.followersNumber || 0}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user.github.followersNumber || 0} followers</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <p className="flex flex-row items-center gap-2">
                    <Star size={15} /> {user.github.subscriptionsNumber || 0}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user.github.subscriptionsNumber || 0} starred</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <p className="flex flex-row items-center gap-2">
                    <Building size={15} />{" "}
                    {user.github.organizationsNumber || 0}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user.github.organizationsNumber || 0} organizations</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <p className="flex flex-row items-center gap-2">
                    <FolderGit size={15} /> {user.github.publicReposNumber || 0}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user.github.publicReposNumber} public repos</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <p className="flex flex-row items-center gap-2">
                    <Code size={15} /> {user.github.publicGistsNumber}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user.github.publicGistsNumber} public gists</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {/* Github Button */}
          <div className="flex gap-4">
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
            <div className="self-end">
              {/* Friend Form  */}
              {actualUserId && actualUserId !== user._id.toString() && (
                // user.isFriend && (
                <AddFriendForm receiverId={user._id.toString()} />
              )}
            </div>
          </div>
        </div>
      </div>

        {/* User Info */}
      <UserInfo user={user} actualUserId={actualUserId} />

      {/* Tech Stack */}
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
            {user.skills.codingLanguages.map(
              ({
                language,
                lines,
                projects,
                textColor,
                Icon,
              }: CodingLanguage) => (
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
      {/* Friends */}
      <div>
        <h3 className="flex flex-wrap gap-4 font-semibold">
          <CircleUserRound size={24} />
          Friends
        </h3>
        <div></div>
      </div>
      {/* Projects */}
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
            Projects Invited:{" "}
            {user.projects.projectsInvited
              ? user.projects.projectsInvited.length
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
