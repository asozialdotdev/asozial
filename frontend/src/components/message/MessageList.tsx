"use client";

import { useSession } from "next-auth/react";
import PageCard from "../common/containers/PageCard";
import UserAvatar from "../common/ui/image/UserAvatar";
import { Types } from "mongoose";

function MessageList({
  messages,
}: {
  messages: {
    _id: Types.ObjectId;
    senderId: { info: { image: string }; username: string };
    image: string;
    username: string;
    content: string;
  }[];
}) {
  const { data: session } = useSession();
  const userId = session?.user.id;

  return (
    <div className="flex w-full flex-col gap-2">
      {messages &&
        messages?.map((message) => {
          return (
            <PageCard
              key={message._id.toString()}
              className={`flex w-3/4 flex-row items-center justify-between gap-4 ${message.senderId.toString() === userId ? "justify-end self-end bg-zinc-400 dark:bg-zinc-700" : "justify-start self-start bg-gray-400 dark:bg-gray-700"}`}
            >
              <UserAvatar
                src={message?.image}
                username={message?.username}
                className=""
              />
              <div className="flex w-full flex-col items-stretch">
                <p className="text-md">{message?.username}</p>
                <p className="text-lg">{message?.content}</p>
              </div>
            </PageCard>
          );
        })}
    </div>
  );
}

export default MessageList;
