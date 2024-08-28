import FileUploader from "../common/ui/ImageUploader";
import DashboardProjects from "./DashboardProjects";
import DashboardPosts from "./DashboardPosts";
import DashboardHeader from "./DashboardHeader";
import FriendStatusCard from "./FriendStatusCard";
import { auth } from "@/auth";
import { checkMembersApplied } from "@/actions/projects.server";
// import RequestsTable from "./RequestsTable";

async function DashboardComponent() {
  const session = await auth();
  const username = session?.user?.githubUsername;
  // const { projects } = await checkMembersApplied();
  return (
    <section className="flex w-full flex-col">
      <DashboardHeader />

      <div className="flex items-center gap-8 pb-8">
        <FriendStatusCard />
        {/* <RequestsTable projects={projects} /> */}
      </div>
    </section>
  );
}

export default DashboardComponent;
