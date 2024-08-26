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

async function DashboardFriends() {
  const userFriendStatuses = await getUserFriendStatuses();
  const friends = userFriendStatuses.friendsAccepted;
  const pending = userFriendStatuses.friendsPending;
  const rejected = userFriendStatuses.friendsRejected;

  console.log("userFriendStatuses", userFriendStatuses);
  return (
    <div className="rounded bg-white p-4 shadow dark:bg-black">
      <h2 className="text-lg font-bold">Friends</h2>
      <Tabs defaultValue="accepted">
        <TabsList className="w-full">
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="accepted">
          <Card>
            <CardHeader>
              <CardTitle>Friends</CardTitle>
            </CardHeader>
            <CardContent>
              {friends &&
                friends.map((friend: any) => (
                  <DashboardFriendItem key={friend.id} friend={friend} />
                ))}
            </CardContent>
            <CardFooter>
              <Button variant={"ghost"}>
                <UserRoundX />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending</CardTitle>
            </CardHeader>
            <CardContent>
              {pending &&
                pending.map((friend: any) => (
                  <DashboardFriendItem key={friend.id} friend={friend} />
                ))}
            </CardContent>
            <CardFooter>
              <Button variant={"ghost"}>
                <UserRoundCheck />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              {rejected &&
                rejected.map((friend: any) => (
                  <DashboardFriendItem key={friend.id} friend={friend} />
                ))}
            </CardContent>
            <CardFooter>
              <Button variant={"ghost"}>
                <UserRoundX />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DashboardFriends;
