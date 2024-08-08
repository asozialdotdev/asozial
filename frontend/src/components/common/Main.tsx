import DashboardContainer from "../dashboard/DashboardContainer";
import ProjectContainer from "../project/ProjectContainer";
import UserContainer from "../user/UserContainer";

function Main() {
  return (
    <main className="flex h-full w-full flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
      <UserContainer />
      <ProjectContainer />
      <DashboardContainer />
    </main>
  );
}

export default Main;
