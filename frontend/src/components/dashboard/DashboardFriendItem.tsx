"use client";

import React from "react";
import UserAvatar from "../common/ui/image/UserAvatar";
import acceptFriendship from "@/actions/friendships.server/acceptFriendship.server";
import declineFriendship from "@/actions/friendships.server/declineFriendship.server";
import { Button } from "../ui/button";

function DashboardFriendItem({
  id,
  username,
  image,
  friendshipId,
  status,
}: {
  id: string;
  username: string;
  image: string;
  friendshipId: string;
  status: string;
}) {
  return (
    <div
      key={username}
      className="flex flex-row items-center justify-between opacity-50 hover:opacity-100"
    >
      <div className="flex flex-row items-center gap-4">
        <UserAvatar src={image} userId={id} username={username || "Kreuzbär"} />
        <p className="text-sm text-dark dark:text-light">{username}</p>
      </div>

      {status === "received" && (
        <div className="flex flex-row items-center gap-4">
          <form action={() => acceptFriendship(friendshipId)}>
            <Button type="submit" variant="ghost">
              Accept
            </Button>
          </form>
          <form action={() => declineFriendship(friendshipId)}>
            <Button type="submit" variant="ghost">
              Decline
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default DashboardFriendItem;
