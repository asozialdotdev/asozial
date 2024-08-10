"use client";
//React
import React, { useEffect } from "react";

//Hooks
import { useSidebarsContext } from "@/context/SidebarsContext";

//Components
import Main from "@/components/common/Main";
import Navbar from "@/components/common/Navbar";
import ProjectSidebar from "@/components/project/ProjectSidebar";
import UserSidebar from "@/components/user/UserSidebar";

function AppLayout({ children }: { children: React.ReactNode }) {
  const { isUserSidebarOpen, isProjectSidebarOpen } = useSidebarsContext();
  const isOverlayVisible = isUserSidebarOpen || isProjectSidebarOpen;

  useEffect(() => {
    console.log("User Sidebar Open:", isUserSidebarOpen);
    console.log("Project Sidebar Open:", isProjectSidebarOpen);
  }, [isUserSidebarOpen, isProjectSidebarOpen]);

  return (
    <>
      <Navbar />

      <div className="relative flex h-full w-full overflow-x-hidden">
        {isOverlayVisible && (
          <div className="absolute inset-0 z-40 bg-dark opacity-20"></div>
        )}
        <aside
          className={`absolute left-0 top-0 z-40 h-full w-[14rem] bg-white transition-transform duration-300 lg:w-[18rem] ${
            isUserSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <UserSidebar />
        </aside>
        <main className={`flex-1 overflow-y-auto`}>
          <Main>{children}</Main>
        </main>
        <aside
          className={`absolute right-0 top-0 z-40 h-full w-[14rem] bg-white transition-transform duration-300 ease-in-out lg:w-[18rem] ${
            isProjectSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ProjectSidebar />
        </aside>
      </div>
    </>
  );
}

export default AppLayout;
