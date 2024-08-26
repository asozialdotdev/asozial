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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function DashboardFriends() {
  const userFriendStatuses = await getUserFriendStatuses();
  const friends = userFriendStatuses.accepted;
  const pending = userFriendStatuses.pending;
  const rejected = userFriendStatuses.rejected;

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
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Friends</CardTitle>
              </CardHeader>
              <CardContent>
                {friends &&
                  friends.map((friend: any) => (
                    <div
                      key={friend.username}
                      className="flex flex-row items-center gap-4"
                    >
                      <UserAvatar
                        src={friend.info.image}
                        userId={friend.id}
                        username={friend.info.username || "Kreuzbär"}
                      />
                      <p className="text-sm text-dark dark:text-light">
                        {friend.username}
                      </p>
                    </div>
                  ))}
              </CardContent>
              <CardFooter>
                <Button variant={"ghost"}>
                  <UserRoundX />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="pending">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Pending</CardTitle>
              </CardHeader>
              <CardContent>
                {pending &&
                  pending.map((friend: any) => (
                    <div
                      key={friend.username}
                      className="flex flex-row items-center gap-4"
                    >
                      <UserAvatar
                        src={friend.info.image}
                        userId={friend.id}
                        username={friend.info.username || "Kreuzbär"}
                      />
                      <p className="text-sm text-dark dark:text-light">
                        {friend.username}
                      </p>
                    </div>
                  ))}
              </CardContent>
              <CardFooter>
                <Button variant={"ghost"}>
                  <UserRoundCheck />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="rejected">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Rejected</CardTitle>
              </CardHeader>
              <CardContent>
                {rejected &&
                  rejected.map((friend: any) => (
                    <div
                      key={friend.username}
                      className="flex flex-row items-center gap-4"
                    >
                      <UserAvatar
                        src={friend.info.image}
                        userId={friend.id}
                        username={friend.info.username || "Kreuzbär"}
                      />
                      <p className="text-sm text-dark dark:text-light">
                        {friend.username}
                      </p>
                    </div>
                  ))}
              </CardContent>
              <CardFooter>
                <Button variant={"ghost"}>
                  <UserRoundX />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      {/* <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {Object.entries(userFriendStatuses).map(
          ([key, status]: [string, any]) => (
            <div key={key}>
              {status.length > 0 &&
                status.map((friend: any) => (
                  <div
                    className="flex flex-row items-center justify-between gap-4"
                    key={friend.username}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <UserAvatar
                        src={friend.info.image}
                        userId={friend.id}
                        username={friend.info.username || "Kreuzbär"}
                      />
                      <p className="text-sm text-dark dark:text-light">
                        {friend.username}
                      </p>
                    </div>
                    <div className="flex flex-row items-center">
                      <Button variant={"ghost"}>
                        <UserRoundX />
                      </Button>
                      <Button variant={"ghost"}>
                        <UserRoundCheck />
                      </Button>
                    </div>
                  </div>
                ))}
              {status.length === 0 && (
                <div>
                  <p>{status}</p>
                </div>
              )}
            </div>
          ),
        )}
      </div> */}
    </div>
  );
}

export default DashboardFriends;
