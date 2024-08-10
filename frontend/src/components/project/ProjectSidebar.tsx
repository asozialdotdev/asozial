"use client";

import { useSidebarsContext } from "@/context/SidebarsContext";

function ProjectSidebar() {
  const { projectSidebarRef, isProjectSidebarOpen, userSidebarRef } =
    useSidebarsContext();

  return (
    <aside
      className={`z-40 flex h-full w-[14rem] flex-col gap-10 px-[3.2rem] py-[2.4rem] text-3xl shadow-md lg:w-[18rem] ${isProjectSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      ref={projectSidebarRef}
    >
      This is the Project Sidebar component
    </aside>
  );
}

export default ProjectSidebar;
