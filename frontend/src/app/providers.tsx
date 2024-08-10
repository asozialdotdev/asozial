import { ProjectSidebarProvider } from "@/context/ProjectSidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";
import { UserSidebarProvider } from "@/context/UserSidebarContext";

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
