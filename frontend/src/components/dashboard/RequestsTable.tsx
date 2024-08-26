import RequestCard from "./RequestCard";
import { Project } from "@/types/Project";

type RequestsTableProps = {
  projects: Project[];
};

async function RequestsTable({ projects }: RequestsTableProps) {
  return (
    <div className="flex w-full flex-col gap-4 font-semibold">
      <h2 className="text-xl">Members Requests</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((project) =>
          project.members?.membersApplied.map((member) => (
            <RequestCard
              key={member._id.toString()}
              member={member}
              project={project}
            />
          )),
        )}
        {/* <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard />
        <RequestCard /> */}
      </div>
    </div>
  );
}

export default RequestsTable;
