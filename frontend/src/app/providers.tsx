import UserSidebar from "@/components/user/UserSidebar";
import { ProjectSidebarProvider } from "@/contexts/ProjectSidebarContext";
import { UserSidebarProvider } from "@/contexts/UserSidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UserSidebarProvider>
        <ProjectSidebarProvider>{children}</ProjectSidebarProvider>
      </UserSidebarProvider>
    </ThemeProvider>
  );
}

export default Providers;
