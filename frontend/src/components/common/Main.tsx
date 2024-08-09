import DashboardContainer from "../dashboard/DashboardContainer";
import ProjectContainer from "../project/ProjectContainer";
import UserContainer from "../user/UserContainer";

function Main({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex h-full w-full flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row">
      {children}
    </main>
  );
}

export default Main;
