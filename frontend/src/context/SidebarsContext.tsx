"use client";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import React, { createContext, useState, useRef, useContext } from "react";

type SidebarsContextType = {
  isUserSidebarOpen: boolean;
  toggleUserSidebar: () => void;
  userSidebarRef: React.RefObject<HTMLDivElement>;
  userHeaderRef: React.RefObject<HTMLDivElement>;
  isProjectSidebarOpen: boolean;
  toggleProjectSidebar: () => void;
  projectSidebarRef: React.RefObject<HTMLDivElement>;
  projectHeaderRef: React.RefObject<HTMLDivElement>;
};

const defaultContextValue: SidebarsContextType = {
  isUserSidebarOpen: false,
  toggleUserSidebar: () => {},
  userSidebarRef: { current: null },
  userHeaderRef: { current: null },
  isProjectSidebarOpen: false,
  toggleProjectSidebar: () => {},
  projectSidebarRef: { current: null },
  projectHeaderRef: { current: null },
};

const SidebarsContext = createContext<SidebarsContextType>(defaultContextValue);

function SidebarsProviders({ children }: { children: React.ReactNode }) {
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);
  const [isProjectSidebarOpen, setIsProjectSidebarOpen] = useState(false);

  const userSidebarRef = useRef<HTMLDivElement>(null);
  const userHeaderRef = useRef<HTMLDivElement>(null);

  const projectSidebarRef = useRef<HTMLDivElement>(null);
  const projectHeaderRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    () => {
      if (isUserSidebarOpen) {
        setIsUserSidebarOpen(false);
      }
      if (isProjectSidebarOpen) {
        setIsProjectSidebarOpen(false);
      }
    },
    userSidebarRef,
    projectSidebarRef,
    // userHeaderRef,
    // projectHeaderRef,
  );

  function toggleUserSidebar() {
    setIsUserSidebarOpen((prev) => !prev);
  }

  function toggleProjectSidebar() {
    setIsProjectSidebarOpen((prev) => !prev);
  }

  return (
    <SidebarsContext.Provider
      value={{
        isUserSidebarOpen,
        toggleUserSidebar,
        isProjectSidebarOpen,
        toggleProjectSidebar,
        userSidebarRef,
        userHeaderRef,
        projectSidebarRef,
        projectHeaderRef,
      }}
    >
      {children}
    </SidebarsContext.Provider>
  );
}

function useSidebarsContext() {
  const context = useContext(SidebarsContext);
  if (context === undefined) {
    throw new Error(
      "useSidebarsContext must be used within a SidebarsProvider",
    );
  }
  return context;
}

export { useSidebarsContext, SidebarsProviders };
