"use client";

import React from "react";
import UserAvatar from "../common/ui/image/UserAvatar";
import DeclineButton from "./DeclineButton";
import AcceptButtons from "./AcceptButton";

function DashboardFriendItem({
  id,
  username,
  image,
}: {
  id: string;
  username: string;
  image: string;
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
      <div className="flex flex-row items-center gap-4">
        <DeclineButton />
        <AcceptButtons />
      </div>
    </div>
  );
}

export default DashboardFriendItem;
