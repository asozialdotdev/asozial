"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense, useState } from "react";
import ProjectCardLoadingSkeleton from "./ProjectCardsLoadingSkeleton";
import UserAvatar from "../common/ui/image/UserAvatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import AcceptDeclineForm from "../dashboard/AcceptDeclineForm";
import { Member, ProjectId } from "@/types/Project";
import RemoveMemberForm from "./requests/RemoveMemberForm";
import RestoreMember from "./requests/RestoreMemberForm";

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type MembersTabsProps = {
  result: {
    membersJoined: Member[];
    membersApplied: Member[];
    membersInvited: Member[];
    membersAvoided: Member[];
  };
  projectId: ProjectId;
};

function MembersTabs({ result, projectId }: MembersTabsProps) {
  const { membersJoined, membersApplied, membersInvited, membersAvoided } =
    result;

  const membersJo = membersJoined.map((member) => member);
  console.log(membersJo, "Members Joined");

  const [activeTab, setActiveTab] = useState("joined");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderMembers = (members: Member[], activeTab: string) => {
    return members.length > 0 ? (
      members.map((member: any, i: number) => (
        <Card
          key={member._id || i}
          className="relative mb-4 w-full max-w-md border-dashed border-zinc-300 bg-inherit bg-zinc-100 px-4 hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10 lg:min-w-[28rem]"
        >
          <div className="flex items-center gap-4">
            <UserAvatar
              src={
                member.info?.image ||
                "https://avatars.dicebear.com/api/avataaars/username.svg"
              }
              username={member.info?.username || "username"}
              userId={member._id || "123"}
            />
            <CardHeader className="pl-2">
              <CardTitle className="text-lg">
                {member.info?.username || "Username"}
              </CardTitle>
            </CardHeader>

            <CardFooter className="mt-5">
              {activeTab === "joined" && (
                <RemoveMemberForm projectId={projectId} memberId={member._id} />
              )}
              {activeTab === "applied" && (
                <AcceptDeclineForm
                  projectId={projectId}
                  memberId={member._id}
                />
              )}
              {activeTab === "invited" && (
                <Button variant="secondary">Resend Invite</Button>
              )}
              {activeTab === "declined" && (
                <RestoreMember projectId={projectId} memberId={member._id} />
              )}
            </CardFooter>
          </div>
        </Card>
      ))
    ) : (
      <p className="text-neutral-500 dark:text-neutral-400">No members yet</p>
    );
  };

  return (
    <Tabs
      defaultValue="joined"
      onValueChange={handleTabChange}
      className="flex w-full flex-col items-center gap-4"
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="joined">Joined</TabsTrigger>
        <TabsTrigger value="applied">Applied</TabsTrigger>
        <TabsTrigger value="invited">Invited</TabsTrigger>
        <TabsTrigger value="declined">Avoided</TabsTrigger>
      </TabsList>

      <Suspense fallback={<ProjectCardLoadingSkeleton />}>
        <TabsContent value="joined">
          {renderMembers(membersJoined, activeTab)}
        </TabsContent>
      </Suspense>

      <Suspense fallback={<ProjectCardLoadingSkeleton />}>
        <TabsContent value="applied">
          {renderMembers(membersApplied, activeTab)}
        </TabsContent>
      </Suspense>

      <Suspense fallback={<ProjectCardLoadingSkeleton />}>
        <TabsContent value="invited">
          {renderMembers(membersInvited, activeTab)}
        </TabsContent>
      </Suspense>

      <Suspense fallback={<ProjectCardLoadingSkeleton />}>
        <TabsContent value="declined">
          {renderMembers(membersAvoided, activeTab)}
        </TabsContent>
      </Suspense>
    </Tabs>
  );
}

export default MembersTabs;
