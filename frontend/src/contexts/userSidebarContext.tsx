"use client";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { createContext, useState, useRef } from "react";
import type { UserSidebarContextTypes } from "@/types/User";

const defaultContextValue: UserSidebarContextTypes = {
  isUserSidebarOpen: false,
  toggleUserSidebar: () => {},
  userSidebarRef: { current: null },
  userHeaderRef: { current: null },
};

const UserSidebarContext =
  createContext<UserSidebarContextTypes>(defaultContextValue);

function UserSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);

  const userSidebarRef = useRef<HTMLDivElement>(null);
  const userHeaderRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    () => setIsUserSidebarOpen(false),
    userSidebarRef,
    userHeaderRef,
  );

  function toggleUserSidebar() {
    setIsUserSidebarOpen((isUserSidebarOpen) => !isUserSidebarOpen);
  }

  return (
    <UserSidebarContext.Provider
      value={{
        isUserSidebarOpen,
        toggleUserSidebar,
        userSidebarRef,
        userHeaderRef,
      }}
    >
      {children}
    </UserSidebarContext.Provider>
  );
}

export { UserSidebarContext, UserSidebarProvider };
