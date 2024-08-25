"use client";

//Context
import { useSidebarsContext } from "@/context/SidebarsContext";

//UI
import { useSession } from "next-auth/react";
import SidebarTitle from "../common/ui/SidebarTitle";
import SearchIcon from "../common/ui/SearchIcon";
import MatchIcon from "../common/ui/MatchIcon";
import ProjectCreateIcon from "../common/ui/ProjectCreateIcon";
import SidebarButtons from "../common/sidebar/SidebarButtons";
import SidebarFriendsList from "../user/SidebarFriendsList";

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
      className={`z-50 flex h-full w-[14rem] flex-col items-center gap-10 overflow-y-auto bg-gray-100 px-[3.2rem] py-[2.4rem] text-3xl text-dark shadow-md transition-transform duration-150 ease-in-out dark:bg-zinc-900 dark:text-light lg:w-[18rem] ${isProjectSidebarOpen ? "translate-x-0 xl:translate-x-full" : "translate-x-full xl:translate-x-0"}`}
      ref={projectSidebarRef}
    >
      <SidebarTitle>Projects</SidebarTitle>
      <SidebarButtons links={links} />
      <SidebarFriendsList />
    </aside>
  );
}

export default ProjectSidebar;
