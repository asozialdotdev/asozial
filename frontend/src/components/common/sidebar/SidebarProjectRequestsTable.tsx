import RequestCard from "@/components/dashboard/RequestCard";
import SidebarTitle from "./SidebarTitle";
import { Project } from "@/types/Project";
import { useRequests } from "@/context/RequestsContext";
import SidebarProjectRequestsCard from "./SidebarRequests";
import LoadingSpinner from "../ui/loading/LoadingSpinner";

function SidebarProjectRequestsTable() {
  const { projectsRequests, projectsLoading, projectsError } = useRequests();
  console.log("ProjectsRequests", projectsRequests);

  if (projectsLoading) {
    return <LoadingSpinner />;
  }

  if (projectsError) {
    return <p className="text-sm">{projectsError}</p>;
  }
  if (projectsRequests.length === 0) {
    return <p className="text-sm">no project requests</p>;
  }
  return (
    <div className="flex flex-col">
      {projectsRequests.map((project: Project) =>
        project.members?.membersApplied.map((member) => (
          <SidebarProjectRequestsCard
            key={member._id.toString()}
            member={member}
            project={project}
          />
        )),
      )}
    </div>
  );
}

export default SidebarProjectRequestsTable;
