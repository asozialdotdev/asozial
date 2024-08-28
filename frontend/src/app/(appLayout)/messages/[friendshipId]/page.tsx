"use client";

import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import MessageList from "@/components/message/MessageList";
import React from "react";
import { getMessages } from "@/actions/message.server/getMessages.server";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function page() {
  const { friendshipId } = useParams<{ friendshipId: string }>();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const messageHandler = async () => {
      const data = await getMessages(friendshipId);
      console.log(messages);
      setMessages(data);
    };
    messageHandler();
  }, [friendshipId]);

  return (
    <PageContainer>
      <PageTitle>Message</PageTitle>
      <MessageList messages={messages} />
    </PageContainer>
  );
}

export default page;
