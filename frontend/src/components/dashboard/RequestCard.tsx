import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import UserAvatar from "../common/ui/UserAvatar";
import { Button } from "../ui/button";
import { Member, Project } from "@/types/Project";
import { auth } from "@/auth";
import AcceptForm from "./AcceptForm";
import DeclineForm from "./DeclineForm";

type RequestCardProps = {
  project: Project;
  member: Member;
};

async function RequestCard({ project, member }: RequestCardProps) {
  console.log("project>>>>>>>>>>", project);
  console.log("member>>>>>>>>>>", member);
  const session = await auth();
  const username = session?.user?.githubUsername as string;
  const { username: memberUsername, image, _id: memberId } = member;
  const { title, slug, _id } = project;
  return (
    <>
      <Card className="max-h-[20rem] min-h-fit min-w-[20rem] max-w-[20rem] overflow-y-auto overflow-x-hidden border-dashed border-zinc-300 bg-inherit bg-zinc-100 pl-1 hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10">
        <CardHeader>
          <CardTitle className="">
            {memberUsername} wants to join{" "}
            <Link href={`/${username}/${slug}/${_id}`}>
              <span>{title}</span>
            </Link>
          </CardTitle>

          <CardDescription>
            A member has applied to contribute to your project.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex w-full items-end gap-2">
          <UserAvatar
            className="h-20 w-20"
            src={image}
            username={memberUsername}
            userId={memberId}
          />
          <CardContent className="flex items-center gap-3 w-full">
            <AcceptForm project={project} member={member} />
            <DeclineForm project={project} member={member} />
          </CardContent>
        </CardContent>
      </Card>
    </>
  );
}

export default RequestCard;
