import { ProjectSidebarContext } from "@/contexts/ProjectSidebarContext";
import { useContext } from "react";

export function useProjectSidebar() {
  const context = useContext(ProjectSidebarContext);
  if (context === undefined) {
    throw new Error(
      "useProjectSidebar must be used within a ProjectSidebarProvider",
    );
  }
  return context;
}
