"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { sendMessage } from "@/actions/message.server/sendMessage.server";

function MessageInput({ friendshipId }: { friendshipId: string }) {
  const [message, setMessage] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Sending message to friendship:", { friendshipId });
    console.log("Message:", message);
    sendMessage(friendshipId, message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="message">Message</label>
      <input
        type="text"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" variant="ghost">
        Send
      </Button>
    </form>
  );
}

export default MessageInput;
