import { projectSidebarContext } from "@/contexts/projectSidebarContext";
import { useContext } from "react";

export function useProjectSidebar() {
  const context = useContext(projectSidebarContext);
  if (context === undefined) {
    throw new Error(
      "useUserSidebar must be used within a projectSidebarProvider",
    );
  }
  return context;
}
