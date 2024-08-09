import { userSidebarContext } from "@/contexts/userSidebarContext";
import { useContext } from "react";

export function useUserSidebar() {
  const context = useContext(userSidebarContext);
  if (context === undefined) {
    throw new Error("useUserSidebar must be used within a userSidebarProvider");
  }
  return context;
}
