"use client";

import React from "react";
import type Message from "@/types/Message";
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
    receiverId: { info: { image: string }; username: string };
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
              className={`flex w-3/4 flex-row items-center gap-4 ${message.senderId.toString() === userId ? "justify-end self-end bg-zinc-400 dark:bg-zinc-700" : "justify-start self-start bg-gray-400 dark:bg-gray-700"}`}
            >
              <UserAvatar
                src={message?.senderId?.info?.image}
                username={message?.senderId?.username}
              />
              <p>{message?.content}</p>
            </PageCard>
          );
        })}
    </div>
  );
}

export default MessageList;
