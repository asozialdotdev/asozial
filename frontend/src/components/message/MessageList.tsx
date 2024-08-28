"use client";

import React from "react";
import type Message from "@/types/Message";
import { useSession } from "next-auth/react";
import PageCard from "../common/containers/PageCard";

function MessageList({ messages }: { messages: Message[] }) {
  const { data: session } = useSession();
  const userId = session?.user.id;

  console.log("the session is:", session);

  console.log("the messages are:", messages);
  return (
    <div className="flex w-full flex-col gap-2">
      {messages &&
        messages?.map((message: Message) => {
          return (
            <PageCard
              key={message._id.toString()}
              className={`flex w-3/4 flex-row items-center gap-4 ${message.senderId.toString() === userId ? "justify-end" : "justify-start"}`}
            >
              <p>{message.content}</p>
              {/* <sup className="self-end">{message.senderId.toString()}</sup> */}

              {/* <p>{message.createdAt?.toLocaleDateString()}</p> */}
            </PageCard>
          );
        })}
    </div>
  );
}

export default MessageList;
