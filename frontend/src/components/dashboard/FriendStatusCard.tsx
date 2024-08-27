import React from "react";
import UserAvatar from "../common/ui/image/UserAvatar";
import { UserRoundCheck, UserRoundX } from "lucide-react";
import { getUserFriendStatuses } from "@/actions/friendships.server/getUserFriendStatuses";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardFriendItem from "./DashboardFriendItem";

async function FriendStatusCard() {
  const userFriendStatuses = await getUserFriendStatuses();
  const friends = userFriendStatuses.friendsAccepted || [];
  const sentPending = userFriendStatuses.friendsSentPending || [];
  const receivedPending = userFriendStatuses.friendsReceivedPending || [];
  const rejected = userFriendStatuses.friendsRejected || [];

  console.log("userFriendStatuses", userFriendStatuses);
  return (
    <div className="rounded bg-white p-4 shadow dark:bg-black">
      <h2 className="text-lg font-bold">Friends</h2>
      <Tabs defaultValue="accepted">
        <TabsList className="w-full">
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="received">Received</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="accepted">
          <Card>
            <CardHeader>
              <CardTitle>Friends</CardTitle>
            </CardHeader>
            <CardContent>
              {friends &&
                friends.map(
                  (friend: any) =>
                    friend !== null && (
                      <DashboardFriendItem
                        key={friend.id}
                        id={friend.id}
                        username={friend.username}
                        image={friend.image}
                      />
                    ),
                )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sent">
          <Card>
            <CardHeader>
              <CardTitle>Sent</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {sentPending &&
                sentPending.map(
                  (friend: any) =>
                    friend !== null && (
                      <DashboardFriendItem
                        key={friend.id}
                        id={friend.id}
                        username={friend.username}
                        image={friend.image}
                      />
                    ),
                )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="received">
          <Card>
            <CardHeader>
              <CardTitle>Received</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {receivedPending &&
                receivedPending.map(
                  (friend: any) =>
                    friend !== null && (
                      <DashboardFriendItem
                        key={friend.id}
                        id={friend.id}
                        username={friend.username}
                        image={friend.image}
                      />
                    ),
                )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {rejected &&
                rejected.map(
                  (friend: any) =>
                    friend !== null && (
                      <DashboardFriendItem
                        key={friend.id}
                        id={friend.id}
                        username={friend.username}
                        image={friend.image}
                      />
                    ),
                )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default FriendStatusCard;
