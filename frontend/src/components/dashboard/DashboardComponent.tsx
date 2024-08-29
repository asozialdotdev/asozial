import DashboardHeader from "./DashboardHeader";
import FriendStatusCard from "../friendship/FriendStatusTab";
import { auth } from "@/auth";

async function DashboardComponent() {
  const session = await auth();
  const username = session?.user?.githubUsername;
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
