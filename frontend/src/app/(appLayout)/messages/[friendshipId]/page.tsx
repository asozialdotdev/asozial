import PageContainer from "@/components/common/containers/PageContainer";
import PageTitle from "@/components/common/ui/PageTitle";
import MessageList from "@/components/message/MessageList";
import React from "react";
import { getMessages } from "@/actions/message.server/getMessages.server";
import MessageForm from "@/components/message/MessageForm";
import { auth } from "@/auth";

async function Page({ params }: { params: { friendshipId: string } }) {
  const { friendshipId } = params;
  const session = await auth();
  const conversations = await getMessages(friendshipId);

  const messages = conversations?.messages;
  const friend = conversations?.friends?.find(
    (friend: any) => friend._id !== session?.user.id,
  );

  const enrichedMessages = messages.map((message: any) => {
    if (message.senderId === session?.user.id) {
      return {
        ...message,
        image: session?.user.image,
        username: session?.user.githubUsername,
      };
    } else {
      return {
        ...message,
        image: friend?.info?.image,
        username: friend?.username,
      };
    }
  });

  return (
    <PageContainer>
      <PageTitle>Message</PageTitle>
      <MessageList messages={enrichedMessages} />
      <MessageForm friendshipId={friendshipId} />
    </PageContainer>
  );
}

export default Page;
