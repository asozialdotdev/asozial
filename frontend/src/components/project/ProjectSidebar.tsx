"use client";

//Context
import { useSidebarsContext } from "@/context/SidebarsContext";

//UI
import { useSession } from "next-auth/react";
import SidebarTitle from "../common/sidebar/SidebarTitle";
import SearchIcon from "../common/ui/icons/SearchIcon";
import MatchIcon from "../common/ui/icons/MatchIcon";
import ProjectCreateIcon from "../common/ui/icons/ProjectCreateIcon";
import SidebarButtons from "../common/sidebar/SidebarButtons";
import SidebarRequests from "../common/sidebar/SidebarRequests";

function ProjectSidebar() {
  const { projectSidebarRef, isProjectSidebarOpen } = useSidebarsContext();
  const { data: session } = useSession();
  const links = [
    {
      name: "search",
      href: `/search/projects`,
      Icon: SearchIcon,
      action: "",
    },
    {
      name: "create",
      href: `/${session?.user.githubUsername}/projects/new`,
      Icon: ProjectCreateIcon,
      action: "",
    },
    {
      name: "match",
      href: `/match/projects`,
      Icon: MatchIcon,
      action: "",
    },
  ];

  return (
    <aside
      className={`z-40 flex h-full w-[18rem] flex-col items-center gap-10 overflow-y-auto overflow-x-hidden bg-gray-100 px-[1rem] py-[1rem] text-3xl text-dark shadow-md transition-transform duration-150 ease-in-out dark:bg-zinc-900 dark:text-light ${isProjectSidebarOpen ? "translate-x-0 xl:translate-x-full" : "translate-x-full xl:translate-x-0"}`}
      ref={projectSidebarRef}
    >
      <SidebarTitle>Projects</SidebarTitle>
      <SidebarButtons links={links} />
      <SidebarTitle>Projects</SidebarTitle>
      <SidebarButtons links={links} />  <SidebarTitle>Projects</SidebarTitle>
      <SidebarButtons links={links} />  <SidebarTitle>Projects</SidebarTitle>
      <SidebarButtons links={links} />  <SidebarTitle>Projects</SidebarTitle>
      <SidebarButtons links={links} />  <SidebarTitle>Projects</SidebarTitle>
      <SidebarButtons links={links} />  <SidebarTitle>Projects</SidebarTitle>
      <SidebarButtons links={links} />  <SidebarTitle>Projects</SidebarTitle>
      <SidebarButtons links={links} />
      <SidebarRequests project />
    </aside>
  );
}

export default ProjectSidebar;
