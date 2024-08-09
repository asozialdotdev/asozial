import { useOutsideClick } from "@/hooks/useOutsideClick";
import { createContext, useState, useRef } from "react";
import type { ProjectSidebarContextTypes } from "@/types/Project";

const defaultContextValue: ProjectSidebarContextTypes = {
  isProjectSidebarOpen: false,
  toggleProjectSidebar: () => {},
  projectSidebarRef: { current: null },
  projectHeaderRef: { current: null },
};

const projectSidebarContext = createContext(defaultContextValue);

function OpenSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isProjectSidebarOpen, setisProjectSidebarOpen] = useState(false);

  const projectSidebarRef = useRef<HTMLDivElement>(null);
  const projectHeaderRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    () => setisProjectSidebarOpen(false),
    projectSidebarRef,
    projectHeaderRef,
  );

  function toggleProjectSidebar() {
    setisProjectSidebarOpen((isProjectSidebarOpen) => !isProjectSidebarOpen);
  }

  return (
    <projectSidebarContext.Provider
      value={{
        isProjectSidebarOpen,
        toggleProjectSidebar,
        projectSidebarRef,
        projectHeaderRef,
      }}
    >
      {children}
    </projectSidebarContext.Provider>
  );
}

export { projectSidebarContext, OpenSidebarProvider };
