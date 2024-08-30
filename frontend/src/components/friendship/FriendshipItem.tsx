"use client";

import React from "react";
import UserAvatar from "../common/ui/image/UserAvatar";
import AcceptDeclineFriendshipForm from "../requests/AcceptDeclineFriendshipForm";
import { FriendshipId } from "@/types/Friendship";
import { UserId } from "@/types/User";

type FriendshipItemProps = {
  userId?: UserId;
  username?: string;
  image?: string;
  friendshipId: FriendshipId;
  status: string;
};

function FriendshipItem({
  userId,
  username,
  image = "",
  friendshipId,
  status,
}: FriendshipItemProps) {
  return (
    <div key={username} className="flex flex-row items-center justify-between">
      <div className="flex flex-row flex-wrap items-center gap-4">
        <UserAvatar
          src={image}
          userId={userId}
          username={username || "Kreuzbär"}
        />
        <p className="text-lg text-dark dark:text-light">{username}</p>
      </div>

      {status === "received" && (
        <AcceptDeclineFriendshipForm friendshipId={friendshipId} />
      )}
    </div>
  );
}

export default FriendshipItem;
