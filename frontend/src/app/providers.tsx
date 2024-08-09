import { ProjectSidebarProvider } from "@/contexts/ProjectSidebarContext";
import { UserSidebarProvider } from "@/contexts/UserSidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <UserSidebarProvider>
          <ProjectSidebarProvider>{children}</ProjectSidebarProvider>
        </UserSidebarProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default Providers;
