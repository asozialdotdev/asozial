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
  FolderInput,
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { auth } from "@/auth";
import AddFriendForm from "../requests/AddFriendForm";
import UserInfo from "./UserInfo";
import { Project } from "@/types/Project";
import UserAvatar from "../common/ui/image/UserAvatar";
import Link from "next/link";
import { Friendship } from "@/types/Friendship";

type ProjectsJoined = Project & {
  username: {
    info: {
      username: string;
    };
  };
};

type UserComponentProps = {
  result: {
    user: User & {
      friendsAccepted: User[];
      projectsOwned: Project[];
      projectsJoined: ProjectsJoined[];

      friendsCount: number;
      projectsOwnedCount: number;
      projectsJoinedCount: number;
    };
    counts: {
      friendsCount: number;
      projectsOwnedCount: number;
      projectsJoinedCount: number;
    };
    isFriends: boolean;
  };
  friends: Friendship[];
};

async function UserComponent({ result, friends }: UserComponentProps) {
  const {
    user,
    counts: { projectsOwnedCount, projectsJoinedCount },
    isFriends,
  } = result;
  const { projectsOwned, projectsJoined, friendsAccepted } = user;
  console.log("friends accepted >>>>>>>>>>", friends);
  console.log("result >>>>>>>>>>", result);

  const session = await auth();
  const actualUserId = session?.user?.id;

  const receivedAccepted = friends.filter((friendship: Friendship) => {
    return friendship.receiverId?._id === actualUserId;
  });

  const sentAccepted = friends.filter((friendship: Friendship) => {
    return friendship.senderId?._id === actualUserId;
  });

  let formattedDate = "Unknown";
  if (user?.github?.createdAt) {
    const githubCreatedAtDate = new Date(user.github.createdAt);
    formattedDate = githubCreatedAtDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  }
  return (
    <section className="flex w-full flex-col gap-8 pb-4 text-lg font-light">
      <div className="flex w-full items-center justify-center gap-4">
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
          <p className="text-sm">Github user since {formattedDate}</p>
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
              {actualUserId &&
                actualUserId !== user._id.toString() &&
                !isFriends && (
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
      {/* Friends */}
      <div className="flex flex-col gap-4">
        <h3 className="flex flex-wrap gap-4 font-semibold">
          <CircleUserRound size={24} />
          Friends ({receivedAccepted.length + sentAccepted.length})
        </h3>
        {actualUserId === user._id ? (
          <div className="flex flex-wrap gap-4">
            {receivedAccepted.map((friendship) => (
              <UserAvatar
                key={
                  friendship?.senderId?._id?.toString() === actualUserId
                    ? friendship?.receiverId?._id.toString()
                    : friendship?.senderId?._id.toString()
                }
                userId={
                  friendship?.senderId?._id.toString() === actualUserId
                    ? friendship?.receiverId?._id.toString()
                    : friendship?.senderId?._id.toString()
                }
                username={
                  friendship?.senderId?.username === actualUserId
                    ? friendship?.receiverId?.username
                    : friendship?.senderId?.username
                }
                src={
                  friendship?.senderId?.info?.image === actualUserId
                    ? friendship?.receiverId?.info?.image
                    : friendship?.senderId?.info?.image
                }
              />
            ))}

            {sentAccepted.map((friendship) => (
              <UserAvatar
                key={
                  friendship?.senderId?._id?.toString() !== actualUserId
                    ? friendship?.receiverId?._id.toString()
                    : friendship?.senderId?._id.toString()
                }
                userId={
                  friendship?.senderId?._id.toString() !== actualUserId
                    ? friendship?.receiverId?._id.toString()
                    : friendship?.senderId?._id.toString()
                }
                username={
                  friendship?.senderId?.username !== actualUserId
                    ? friendship?.receiverId?.username
                    : friendship?.senderId?.username
                }
                src={
                  friendship?.senderId?.info?.image !== actualUserId
                    ? friendship?.receiverId?.info?.image
                    : friendship?.senderId?.info?.image
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {receivedAccepted.map((friendship) => {
              const friendId =
                friendship?.senderId?._id.toString() === actualUserId
                  ? friendship?.receiverId?._id.toString()
                  : friendship?.senderId?._id.toString();

              // Display friends of the visited user, excluding the actual user
              return (
                <UserAvatar
                  key={friendId}
                  userId={friendId}
                  username={
                    friendship?.senderId?._id.toString() === user._id.toString()
                      ? friendship?.receiverId?.username
                      : friendship?.senderId?.username
                  }
                  src={
                    friendship?.senderId?._id.toString() === user._id.toString()
                      ? friendship?.receiverId?.info?.image
                      : friendship?.senderId?.info?.image
                  }
                />
              );
            })}

            {sentAccepted.map((friendship) => {
              const friendId =
                friendship?.receiverId?._id.toString() === actualUserId
                  ? friendship?.senderId?._id.toString()
                  : friendship?.receiverId?._id.toString();

          
              return (
                <UserAvatar
                  key={friendId}
                  userId={friendId}
                  username={
                    friendship?.receiverId?._id.toString() ===
                    user._id.toString()
                      ? friendship?.senderId?.username
                      : friendship?.receiverId?.username
                  }
                  src={
                    friendship?.receiverId?._id.toString() ===
                    user._id.toString()
                      ? friendship?.senderId?.info?.image
                      : friendship?.receiverId?.info?.image
                  }
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="flex flex-col gap-4">
        <h3 className="flex flex-wrap gap-4 font-semibold">
          <FolderGit size={24} />
          Projects Owned ({projectsOwnedCount})
        </h3>
        <div className="flex items-center gap-4">
          {projectsOwned.map((project) => (
            <Link
              href={`/${user.info.username}/${project.slug}/${project._id}`}
              className="flex gap-4 hover:opacity-75"
            >
              <h3 className="font-semibold text-neutral-500 dark:text-neutral-400">
                {project.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="flex flex-wrap gap-4 font-semibold">
          <FolderGit size={24} />
          Projects Joined ({projectsJoinedCount})
        </h3>
        <div className="flex items-center gap-4">
          {projectsJoined.map((project) => (
            <Link
              href={`/${project.username.info.username}/${project.slug}/${project._id}`}
              className="flex gap-4 hover:opacity-75"
            >
              <h3 className="font-semibold text-neutral-500 dark:text-neutral-400">
                {project.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UserComponent;
