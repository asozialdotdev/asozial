import React from "react";
import UserAvatar from "../common/ui/image/UserAvatar";

function DashboardFriendItem({
  friend,
}: {
  friend: { id: string; info: any };
}) {
  const { id, info } = friend;
  return (
    <div key={info.username} className="flex flex-row items-center gap-4">
      <UserAvatar
        src={info.image}
        userId={id}
        username={info.username || "Kreuzbär"}
      />
      <p className="text-sm text-dark dark:text-light">{info.username}</p>
    </div>
  );
}

export default DashboardFriendItem;
