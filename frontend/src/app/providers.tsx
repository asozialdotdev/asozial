import UserSidebar from "@/components/user/UserSidebar";
import { ProjectSidebarProvider } from "@/contexts/ProjectSidebarContext";
import { UserSidebarProvider } from "@/contexts/UserSidebarContext";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserSidebarProvider>
      <ProjectSidebarProvider>{children}</ProjectSidebarProvider>
    </UserSidebarProvider>
  );
}

export default Providers;
