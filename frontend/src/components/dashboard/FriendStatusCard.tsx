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
import { auth } from "@/auth";

async function FriendStatusCard() {
  const session = await auth();
  const { accepted, pending, declined } = await getUserFriendStatuses();

  const sentPending = pending.filter((friendship: any) => {
    return friendship.senderId._id === session?.user.id;
  });
  const receivedPending = pending.filter((friendship: any) => {
    return friendship.receiverId._id === session?.user.id;
  });

  console.log("accepted", accepted);
  console.log("sentPending", sentPending);
  console.log("receivedPending", receivedPending);

  console.log("declined", declined);

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
              {/* //needs to map through friendships, filter friends for the userId */}
              {/* {accepted.friends &&
                accepted.map(
                  (friendship: any) =>
                    friendship !== null && (
                      <DashboardFriendItem
                        key={friendship.id}
                        id={friendship.id}
                        username={friend.username}
                        image={friend.image}
                      />
                    ),
                )} */}
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
                  (friendship: any) =>
                    friendship !== null && (
                      <DashboardFriendItem
                        key={friendship.receiverId._id}
                        id={friendship.receiverId._id}
                        username={friendship.receiverId.username}
                        image={friendship.receiverId.info.image}
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
                  (friendship: any) =>
                    friendship !== null && (
                      <DashboardFriendItem
                        key={friendship.senderId._id}
                        id={friendship.senderId._id}
                        username={friendship.senderId.username}
                        image={friendship.senderId.info.image}
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
              {declined &&
                declined.map(
                  (friendship: any) =>
                    friendship !== null && (
                      <DashboardFriendItem
                        key={friendship._id}
                        id={friendship._id}
                        username={friendship.username}
                        image={friendship.info.image}
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
