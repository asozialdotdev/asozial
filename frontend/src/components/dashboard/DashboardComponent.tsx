import FileUploader from "../common/ui/ImageUploader";
import DashboardProjects from "./DashboardProjects";
import DashboardPosts from "./DashboardPosts";
import DashboardHeader from "./DashboardHeader";
import DashboardFriends from "./DashboardFriends";

function DashboardComponent() {
  return (
    <section className="flex w-full flex-col gap-4">
      <DashboardHeader />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardProjects />
        <DashboardPosts />
        <DashboardFriends />
      </div>
      <FileUploader />
    </section>
  );
}

export default DashboardComponent;
