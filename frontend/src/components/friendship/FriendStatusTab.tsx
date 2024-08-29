import React from "react";
import { auth } from "@/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserFriendStatuses } from "@/actions";
import FriendshipSentCard from "./FriendshipSentCard";
import FriendshipAcceptedCard from "./FriendshipAcceptedCard";
import FriendshipReceivedCard from "./FriendshipReceivedCard";
import FriendshipRejectedCard from "./FriendshipRejectedCard";
import { Friendship } from "@/types/Friendship";

async function FriendStatusTab() {
  const session = await auth();
  const actualUserId = session?.user.id;
  const { accepted, pending, declined } = await getUserFriendStatuses();

  const sentPending =
    pending &&
    pending.filter((friendship: Friendship) => {
      return friendship.senderId?._id === actualUserId;
    });
  const receivedPending =
    pending &&
    pending.filter((friendship: Friendship) => {
      return friendship.receiverId?._id === actualUserId;
    });

  const receivedAccepted = accepted.filter((friendship: Friendship) => {
    return friendship.receiverId?._id === actualUserId;
  });

  const sentAccepted = accepted.filter((friendship: Friendship) => {
    return friendship.senderId?._id === actualUserId;
  });

  return (
    <div className="h-auto w-full rounded bg-white p-4 shadow dark:bg-black">
      <Tabs defaultValue="accepted">
        <TabsList className="mb-6 grid w-full grid-cols-4">
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="received">Received</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        {/*Accept tab*/}
        <TabsContent value="accepted">
          <FriendshipAcceptedCard
            receivedAccepted={receivedAccepted}
            sentAccepted={sentAccepted}
            actualUserId={actualUserId}
          />
        </TabsContent>
        {/* Received Tab*/}
        <TabsContent value="received">
          <FriendshipReceivedCard receivedPending={receivedPending} />
        </TabsContent>

        {/*Sent tab*/}
        <TabsContent value="sent">
          <FriendshipSentCard sentPending={sentPending} />
        </TabsContent>
        {/*Rejected */}
        <TabsContent value="rejected">
          <FriendshipRejectedCard declined={declined} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default FriendStatusTab;
