"use client";

import { useSidebarsContext } from "@/context/SidebarsContext";
import Link from "next/link";
import { Button } from "../ui/button";

function ProjectSidebar() {
  const { projectSidebarRef, isProjectSidebarOpen } = useSidebarsContext();

  return (
    <aside
      className={`z-50 flex h-full w-[14rem] flex-col gap-10 overflow-y-auto bg-neutral-300 px-[3.2rem] py-[2.4rem] text-3xl text-dark shadow-md transition-transform duration-150 ease-in-out dark:bg-neutral-700 dark:text-light lg:w-[18rem]
        ${isProjectSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      ref={projectSidebarRef}
    >
      <ul className="flex flex-col gap-[200px]">
        <li>
          <Link href="/projects">
            <Button variant="outline">Go To projects</Button>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default ProjectSidebar;
