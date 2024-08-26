import React from "react";
import UserAvatar from "../common/ui/image/UserAvatar";
import { Button } from "../ui/button";
import { UserRoundCheck, UserRoundX } from "lucide-react";
import { getUserFriendStatuses } from "@/actions/friendships.server/getUserFriendStatuses";

async function DashboardFriends() {
  const userFriendStatuses = await getUserFriendStatuses();

  console.log("userFriendStatuses", userFriendStatuses);
  return (
    <div className="rounded bg-white p-4 shadow dark:bg-black">
      <h2 className="text-lg font-bold">Friends</h2>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {Object.entries(userFriendStatuses).map(
          ([key, status]: [string, any]) => (
            <div key={key}>
              {status.length > 0 &&
                status.map((friend: any) => (
                  <div
                    className="flex flex-row items-center justify-between gap-4"
                    key={friend.username}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <UserAvatar
                        src={friend.info.image}
                        userId={friend.id}
                        username={friend.info.username || "Kreuzbär"}
                      />
                      <p className="text-sm text-dark dark:text-light">
                        {friend.username}
                      </p>
                    </div>
                    <div className="flex flex-row items-center">
                      <Button variant={"ghost"}>
                        <UserRoundX />
                      </Button>
                      <Button variant={"ghost"}>
                        <UserRoundCheck />
                      </Button>
                    </div>
                  </div>
                ))}
              {status.length === 0 && (
                <div>
                  <p>{status}</p>
                </div>
              )}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default DashboardFriends;
