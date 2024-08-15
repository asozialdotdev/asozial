import { auth } from "@/auth";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import ProjectContainer from "@/components/project/ProjectContainer";
import UserContainer from "@/components/user/UserContainer";

async function Page() {
  const session = await auth();
  console.log("session:", session);
  if (!session) {
    return <div>must be logged in</div>;
  }
  return (
    <>
      {<UserContainer />}
      <DashboardContainer />
      {/* <ProjectContainer /> */}
    </>
  );
}

export default Page;
