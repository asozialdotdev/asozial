"use client";

import React from "react";
import type Message from "@/types/Message";
import { useSession } from "next-auth/react";
import PageCard from "../common/containers/PageCard";

function MessageList({ messages }: { messages: Message[] }) {
  const { data: session } = useSession();
  const userId = session?.user.id;

  return (
    <div className="flex w-full flex-col gap-2">
      {messages &&
        messages?.map((message: Message) => {
          return (
            <PageCard
              key={message._id.toString()}
              className={`flex w-3/4 flex-row items-center gap-4 ${message.senderId.toString() === userId ? "justify-end bg-zinc-400 dark:bg-zinc-700" : "justify-start bg-gray-400 dark:bg-gray-700"}`}
            >
              <p>{message.content}</p>
            </PageCard>
          );
        })}
    </div>
  );
}

export default MessageList;
