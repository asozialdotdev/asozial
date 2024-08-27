import FileUploader from "../common/ui/ImageUploader";
import DashboardProjects from "./DashboardProjects";
import DashboardPosts from "./DashboardPosts";
import DashboardHeader from "./DashboardHeader";
import FriendStatusCard from "./FriendStatusCard";
import { auth } from "@/auth";
import { checkMembersApplied } from "@/actions/projects.server";
import RequestsTable from "./RequestsTable";

async function DashboardComponent() {
  const session = await auth();
  const username = session?.user?.githubUsername;
  const projects = await checkMembersApplied();
  return (
    <section className="flex w-full flex-col">
      <DashboardHeader />
      <FriendStatusCard />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RequestsTable projects={projects} />
        <DashboardPosts />
      </div>
      <FileUploader />
    </section>
  );
}

export default DashboardComponent;
