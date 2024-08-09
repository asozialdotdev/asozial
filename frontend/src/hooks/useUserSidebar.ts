import { UserSidebarContext } from "@/contexts/UserSidebarContext";
import { useContext } from "react";

export function useUserSidebar() {
  const context = useContext(UserSidebarContext);
  if (context === undefined) {
    throw new Error("useUserSidebar must be used within a UserSidebarProvider");
  }
  return context;
}
