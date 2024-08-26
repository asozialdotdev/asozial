import { UserId } from "@/types/User";
import CustomCard from "../common/ui/CustomCard";
import RequestCard from "./RequestCard";
import { Member, Project } from "@/types/Project";
// export type Member = {
//   _id: UserId;
//   username: string;
//   image: string;
//   name: string;
// };

type RequestsTableProps = {
  projects: Project[];
};

async function RequestsTable({ projects }: RequestsTableProps) {
  return (
    <div className="flex w-full flex-col gap-4 font-semibold">
      <h2 className="text-xl">Members Requests</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((project) =>
          project.membersApplied.map((member) => (
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
