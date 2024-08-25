"use client";

import { useSidebarsContext } from "@/context/SidebarsContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { signOut } from "@/actions";
import ButtonBack from "../common/ui/buttons/ButtonBack";
import SidebarTitle from "../common/sidebar/SidebarTitle";
import SidebarFriendsList from "../common/sidebar/SidebarFriendsList";
import SidebarButtons from "../common/sidebar/SidebarButtons";
import { SearchIcon } from "lucide-react";
import MatchIcon from "../common/ui/icons/MatchIcon";

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
      className={`relative z-50 flex h-full w-[14rem] flex-col gap-10 overflow-y-auto bg-gray-100 px-[3.2rem] py-[2.4rem] text-3xl text-dark shadow-md transition-transform duration-150 ease-in-out dark:bg-zinc-900 dark:text-light lg:w-[18rem] ${isUserSidebarOpen ? "translate-x-0 xl:-translate-x-full" : "-translate-x-full xl:translate-x-0"}`}
      ref={userSidebarRef}
    >
      <ButtonBack className="absolute right-3 top-1 z-20" size={30} />
      <SidebarTitle>Friends</SidebarTitle>
      <SidebarButtons links={links} />
      <SidebarFriendsList />
    </aside>
  );
}

export default UserSidebar;
