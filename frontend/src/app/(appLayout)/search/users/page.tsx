// all users in db, searchbar and filter options

import { getAllUsers } from "@/actions/users.server/getAllUsers.server";
import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import type { User } from "@/types/User";
import { baseUrl } from "@/constants";
import ButtonAddFriend from "@/components/common/ui/ButtonAddFriend";
import UserAvatar from "@/components/common/ui/UserAvatar";
import { MapPinHouse, FolderGit } from "lucide-react";
import { send } from "process";
import { auth } from "@/auth";
import sendFriendship from "@/actions/friendships.server/sendFriendship";

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
              className="flex w-full flex-col gap-4 rounded-lg border-2 p-12"
            >
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-4">
                  <UserAvatar
                    src={user.image}
                    username={user.username || user.github.username}
                    userId={user._id}
                  />
                  <a href={`${baseUrl}/${user.username}`}>
                    <h1 className="text-2xl">
                      {user.username || user.github.username}
                    </h1>
                  </a>
                </div>
                {userId && userId !== user._id.toString() && (
                  <ButtonAddFriend
                    sendFriendship={sendFriendship}
                    userId={userId}
                    friendId={user._id.toString()}
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center justify-start gap-2">
                  <FolderGit size={12} />
                  <p className="text-sm">
                    {user.github.publicReposNumber || "?"}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-start gap-2">
                  <MapPinHouse size={12} />
                  <p className="text-sm">{user.location}</p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </PageContainer>
  );
}

export default Page;
