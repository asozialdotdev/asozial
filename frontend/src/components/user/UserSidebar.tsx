"use client";

import { useSidebarsContext } from "@/context/SidebarsContext";
import { useSession } from "next-auth/react";
import ButtonBack from "../common/ui/buttons/ButtonBack";
import SidebarTitle from "../common/sidebar/SidebarTitle";
import SidebarButtons from "../common/sidebar/SidebarButtons";
import { SearchIcon } from "lucide-react";
import MatchIcon from "../common/ui/icons/MatchIcon";
import SidebarRequests from "../common/sidebar/SidebarRequests";

function UserSidebar() {
  const { userSidebarRef, isUserSidebarOpen, projectSidebarRef } =
    useSidebarsContext();
  const { data: session } = useSession();
  const links = [
    {
      name: "search",
      href: `/search/users`,
      Icon: SearchIcon,
      action: "",
    },
    {
      name: "match",
      href: `/match/users`,
      Icon: MatchIcon,
      action: "",
    },
  ];

  return (
    <aside
      className={`relative z-50 flex h-full w-[18rem] flex-col gap-10 overflow-y-auto bg-gray-100 px-[1rem] py-[1rem] text-3xl text-dark shadow-md transition-transform duration-150 ease-in-out dark:bg-zinc-900 dark:text-light ${isUserSidebarOpen ? "translate-x-0 xl:-translate-x-full" : "-translate-x-full xl:translate-x-0"}`}
      ref={userSidebarRef}
    >
      <ButtonBack className="absolute right-3 top-1 z-20" size={30} />
      <SidebarTitle className='text-center'>Friends</SidebarTitle>
      <SidebarButtons links={links} />
      <SidebarRequests user />
    </aside>
  );
}

export default UserSidebar;
