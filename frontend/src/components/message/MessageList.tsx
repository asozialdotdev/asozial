import React from "react";
import type Message from "@/types/Message";

function MessageList({ messages }: { messages: Message[] }) {
  return (
    <ul className="flex flex-col">
      {messages.length === 0 && (
        <li className="flex flex-row items-center gap-4">
          <p>No messages</p>
        </li>
      )}
      {messages.length > 0 &&
        messages.map((message: Message) => (
          <li
            key={message.id.toString()}
            className="flex flex-row items-center gap-4"
          >
            {JSON.stringify(message)}
          </li>
        ))}
    </ul>
  );
}

export default MessageList;
