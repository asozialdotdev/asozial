import { FolderGit, MapPinHouse } from "lucide-react";
import UserAvatar from "../common/ui/image/UserAvatar";
import AddFriendForm from "../requests/AddFriendForm";
import { User, UserId } from "@/types/User";
import { baseUrl } from "@/constants";

type UserCardProps = {
  user: User;
  actualUserId?: UserId;
};

function UserCard({ user, actualUserId }: UserCardProps) {
  return (
    <li className="flex w-full flex-col gap-4 rounded-lg border-2 border-dashed border-zinc-300 bg-inherit bg-zinc-100 p-12 hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10">
      <div className="flex flex-row items-center justify-between gap-8">
        {/* User Card on the Left */}
        <div className="flex flex-row items-center gap-4">
          <UserAvatar
            src={user.info.image}
            username={user.info.username || user.github.username}
            userId={user._id}
          />
          <a href={`${baseUrl}/${user.info.username}`}>
            <h1 className="text-2xl">
              {user.info.username || user.github.username}
            </h1>
          </a>
        </div>

        {/* Content on the Right */}
        <div className="flex flex-grow flex-col gap-2">
          <div className="flex flex-row items-center justify-start gap-2">
            <FolderGit size={12} />
            <p className="text-sm">{user.github.publicReposNumber || "?"}</p>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <MapPinHouse size={12} />
            <p className="text-sm">{user.info.location}</p>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            TotalProjects Owned
            <p className="text-sm">{user.totalProjectsOwned}</p>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            TotalProjects Member
            <p className="text-sm">{user.totalProjectsMember}</p>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            Total Friends
            <p className="text-sm">{user.totalFriends}</p>
          </div>
        </div>

        {/* Friend Form on the Right */}
        {actualUserId &&
          actualUserId !== user._id.toString() &&
          !user.isFriend && <AddFriendForm receiverId={user._id.toString()} />}
      </div>
      <div>
        <div>
          <p
            className={`italic before:text-2xl before:font-bold before:content-['"'] after:text-2xl after:font-bold after:content-['"']`}
          >
            {user.github.bio}
          </p>
        </div>
      </div>
    </li>
  );
}

export default UserCard;
