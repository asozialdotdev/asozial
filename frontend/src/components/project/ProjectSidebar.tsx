"use client";
import { useProjectSidebar } from "@/hooks/useProjectSidebar";

function ProjectSidebar() {
  const { projectSidebarRef, isProjectSidebarOpen } = useProjectSidebar();
  console.log("isProjectSidebarOpen", isProjectSidebarOpen);
  return (
    <aside
      className={`fixed z-50 flex h-full w-[18rem] transform grid-cols-1 flex-col gap-10 px-[3.2rem] py-[2.4rem] text-3xl shadow-md transition-transform duration-300 ease-in-out ${isProjectSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      // ref={projectSidebarRef}
    >
      {" "}
      This is the Project Sidebar component
    </aside>
  );
}

export default ProjectSidebar;
