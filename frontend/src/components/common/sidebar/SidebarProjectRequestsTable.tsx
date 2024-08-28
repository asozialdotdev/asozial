import RequestCard from "@/components/dashboard/RequestCard";
import SidebarTitle from "./SidebarTitle";
import { Member, Project } from "@/types/Project";
import { useRequests } from "@/context/RequestsContext";
import SidebarProjectRequestsCard from "./SidebarProjectRequestsCard";
import LoadingSpinner from "../ui/loading/LoadingSpinner";
import { Suspense } from "react";
import SidebarCardSkeleton from "./SidebarCardSkeleton";
import ErrorMessage from "../ui/ErrorMessage";

function SidebarProjectRequestsTable() {
  const { projectsRequests, projectsLoading, projectsError } = useRequests();
  console.log("ProjectsRequests", projectsRequests);

  if (projectsLoading) {
    return (
      <>
        <SidebarCardSkeleton />
        <SidebarCardSkeleton />
        <SidebarCardSkeleton />
      </>
    );
  }

  if (projectsError) {
    return <ErrorMessage>{projectsError}</ErrorMessage>;
  }
  if (projectsRequests.length === 0) {
    return (
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        No requests yet
      </p>
    );
  }

  const renderRequests = (project: Project, member: Member) => {
    return (
      <SidebarProjectRequestsCard
        key={`${project._id.toString()}-${member._id.toString()}`}
        member={member}
        project={project}
      />
    );
  };

  return (
    <div className="flex flex-col">
      {projectsRequests.map((project: Project) =>
        project.members?.membersApplied.map((member) =>
          renderRequests(project, member),
        ),
      )}
    </div>
  );
}

export default SidebarProjectRequestsTable;
