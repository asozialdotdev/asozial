// all users in db, searchbar and filter options

import { getAllUsers } from "@/actions/users.server/getAllUsers.server";
import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import type { User } from "@/types/User";
import { baseUrl } from "@/constants";
import UserAvatar from "@/components/common/ui/image/UserAvatar";
import { MapPinHouse, FolderGit } from "lucide-react";
import { auth } from "@/auth";
import AddFriendForm from "@/components/requests/AddFriendForm";

//api/friends POST  => add friend

async function Page() {
  const session = await auth();
  const userId = session?.user?.id;
  const allUsers: User[] = await getAllUsers();
  return (
    <PageContainer>
      <PageTitle>User Search</PageTitle>
      <ul className="flex w-full flex-col gap-8 py-6">
        {allUsers &&
          allUsers.map((user) => (
            <li
              key={user._id.toString()}
              className="flex w-full flex-col gap-4 rounded-lg border-2 border-dashed border-zinc-300 bg-inherit bg-zinc-100 p-12 hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10"
            >
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
                    <p className="text-sm">
                      {user.github.publicReposNumber || "?"}
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-2">
                    <MapPinHouse size={12} />
                    <p className="text-sm">{user.info.location}</p>
                  </div>
                </div>

                {/* Friend Form on the Right */}
                {userId && userId !== user._id.toString() && (
                  <AddFriendForm receiverId={user._id.toString()} />
                )}
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
          ))}
      </ul>
    </PageContainer>
  );
}

export default Page;
