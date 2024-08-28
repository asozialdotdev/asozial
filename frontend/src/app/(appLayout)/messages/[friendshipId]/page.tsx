import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import MessageList from "@/components/message/MessageList";
import React from "react";
import { getMessages } from "@/actions/message.server/getMessages.server";
import MessageForm from "@/components/message/MessageForm";

async function Page({ params }: { params: { friendshipId: string } }) {
  const { friendshipId } = params;
  const messages = await getMessages(friendshipId);

  return (
    <PageContainer>
      <PageTitle>Message</PageTitle>
      <MessageList messages={messages.messages} />
      <MessageForm friendshipId={friendshipId} />
    </PageContainer>
  );
}

export default Page;
