//Next
import Link from "next/link";

//Lib
import { auth } from "@/auth";

//Ui
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserAvatar from "../common/ui/image/UserAvatar";

//Components
import AcceptDeclineForm from "./AcceptDeclineForm";

//Types
import { Member, Project } from "@/types/Project";

type RequestCardProps = {
  project: Project;
  member: Member;
};

async function RequestCard({ project, member }: RequestCardProps) {
  console.log("project>>>>>>>>>>", project);
  console.log("member>>>>>>>>>>", member);
  const session = await auth();
  const username = session?.user?.githubUsername as string;
  const { _id: memberId, info } = member;
  const { image, username: memberUsername } = info;
  const { title, slug, _id } = project;
  return (
    <>
      <Card className="relative max-h-[20rem] min-h-fit min-w-[20rem] max-w-[20rem] overflow-y-auto overflow-x-hidden border-dashed border-zinc-300 bg-inherit bg-zinc-100 pl-1 hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10">
        <CardHeader>
          <CardTitle className="">
            {memberUsername} wants to join{" "}
            <Link href={`/${username}/${slug}/${_id}`}>
              <span className="hover:underline">
                <p>{title}</p>
              </span>
            </Link>
          </CardTitle>
          <CardDescription>
            A member has applied to contribute to your project.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex w-full items-center gap-8">
          <UserAvatar
            className="h-20 w-20"
            src={image}
            username={memberUsername}
            userId={memberId}
          />
          <AcceptDeclineForm projectId={project._id} memberId={memberId} />
        </CardContent>
      </Card>
    </>
  );
}

export default RequestCard;
