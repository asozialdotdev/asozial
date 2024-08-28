import AcceptDeclineForm from "@/components/dashboard/AcceptDeclineForm";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserAvatar from "../ui/image/UserAvatar";
import { Member, Project, ProjectId } from "@/types/Project";
import Link from "next/link";
import { useRequests } from "@/context/RequestsContext";
import SidebarCardSkeleton from "./SidebarCardSkeleton";
import { Suspense } from "react";
type SidebarProjectRequestsCardProps = {
  member: Member;
  project: Project;
};
function SidebarProjectRequestsCard({
  member,
  project,
}: SidebarProjectRequestsCardProps) {
  return (
    <Card
      key={member._id.toString()}
      className="relative mb-4 w-full border-dashed border-zinc-300 bg-inherit bg-zinc-100 py-2 pl-4 pr-[.4rem] hover:bg-zinc-200/10 dark:border-zinc-600 dark:bg-inherit dark:bg-zinc-800 dark:shadow-neutral-700/30 dark:hover:bg-zinc-700/10"
    >
      <div className="flex flex-col items-center gap-2">
        <CardDescription className="text-center">
          <Link
            href={`/${project.owner.info.username}/${project.slug}/${project._id}`}
          >
            <span className="text-dark hover:opacity-75 dark:text-light">
              {project.title}
            </span>{" "}
            has a member request
          </Link>
        </CardDescription>
        <div className="flex items-start gap-4">
          <UserAvatar
            src={
              member.info?.image ||
              "https://avatars.dicebear.com/api/avataaars/username.svg"
            }
            username={member.info?.username || "username"}
            userId={member._id || "123"}
            className="h-12 w-12"
          />

          <AcceptDeclineForm
            projectId={project._id}
            memberId={member._id}
            sidebar
          />
        </div>
      </div>
    </Card>
  );
}

export default SidebarProjectRequestsCard;
