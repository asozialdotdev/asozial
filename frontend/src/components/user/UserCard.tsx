//Next
import Link from "next/link";

//Ui
import UserAvatar from "../common/ui/image/UserAvatar";
import FriendshipPendingIcon from "../common/ui/icons/FriendshipPendingIcon";
import IsFriendIcon from "../common/ui/icons/IsFriendIcon";
import AddFriendForm from "../requests/AddFriendForm";
import TotalFriendsIcon from "../common/ui/icons/TotalFriendsIcon";
import TotalProjectsJoinedIcon from "../common/ui/icons/TotalProjectsJoinedIcon";
import TotalProjectsOwned from "../common/ui/icons/TotalProjectsOwned";
import LocationIcon from "../common/ui/icons/LocationIcon";
import GithubReposIcon from "../common/ui/icons/GithubReposIcon";

//Utils
import { techStackClass } from "@/utils";
//Types
import { User, UserId } from "@/types/User";

type UserCardProps = {
  user: User & {
    isFriend?: boolean;
    totalFriends?: number;
    totalProjectsOwned?: number;
    totalProjectsMembers?: number;
    hasPendingFriendship?: boolean;
  };
  actualUserId?: UserId;
};

function UserCard({ user, actualUserId }: UserCardProps) {
  const isActualUser = actualUserId === user._id;
  return (
    <li className="relative flex w-full flex-col gap-4 rounded-lg border-2 border-dashed border-zinc-300 bg-inherit bg-zinc-100 px-8 py-8 hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10">
      <div className="flex flex-col gap-4">
        {/* User Card on the Left */}
        <div className="flex flex-wrap items-center gap-4">
          <UserAvatar
            src={user.info.image}
            username={user.info.username || user.github.username}
            userId={user._id}
          />
          <Link href={`/${user.info.username}`}>
            <h2 className="break-all text-2xl">
              {user.info.username || user.github.username}
            </h2>
          </Link>
          <div className="flex items-center gap-2">
            <LocationIcon />
            <p className="text-sm">{user.info.location || "Planet Earth"}</p>
          </div>
        </div>

        {/* Icons */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <section className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <GithubReposIcon />
              <p className="text-sm">{user.github.publicReposNumber || "?"}</p>
            </div>

            <div className="flex items-center gap-2">
              <TotalProjectsOwned />
              <p className="text-sm">{user.totalProjectsOwned}</p>
            </div>
            <div className="flex items-center gap-2">
              <TotalProjectsJoinedIcon />
              <p className="text-sm">{user.totalProjectsMembers}</p>
            </div>
            <div className="flex items-center gap-2">
              <TotalFriendsIcon />
              <p className="text-sm">{user.totalFriends}</p>
            </div>
          </section>

          <div className="self-end">
            {/* Friend Form  */}
            {!isActualUser && !user.isFriend && !user.hasPendingFriendship && (
              <AddFriendForm receiverId={user._id.toString()} />
            )}
            {!isActualUser && user.hasPendingFriendship && (
              <FriendshipPendingIcon />
            )}
            {!isActualUser && user.isFriend && !user.hasPendingFriendship && (
              <IsFriendIcon />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {user.skills.codingLanguages.slice(0, 5).map((language, i) => (
          <ul key={language.language + i}>
            <li className={techStackClass(language.language)}>
              {language.language}
            </li>
          </ul>
        ))}
      </div>

      <div>
        <p
          className={
            user.github.bio &&
            `italic before:text-2xl before:font-bold before:content-['"'] after:text-2xl after:font-bold after:content-['"']`
          }
        >
          {user.github.bio || ""}
        </p>
      </div>
    </li>
  );
}

export default UserCard;
