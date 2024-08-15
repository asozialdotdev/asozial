"use client";

import { useSidebarsContext } from "@/context/SidebarsContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { signOut } from "@/actions";

function UserSidebar() {
  const { userSidebarRef, isUserSidebarOpen, projectSidebarRef } =
    useSidebarsContext();
  const session = useSession();

  return (
    <aside
      className={`z-50 flex h-full w-[14rem] flex-col gap-10 overflow-y-auto bg-gray-100 px-[3.2rem] py-[2.4rem] text-3xl text-dark shadow-md transition-transform duration-150 ease-in-out dark:bg-zinc-900 dark:text-light lg:w-[18rem] ${isUserSidebarOpen ? "translate-x-0 xl:-translate-x-full" : "-translate-x-full xl:translate-x-0"}`}
      ref={userSidebarRef}
    >
      <Avatar className="h-28 w-28 flex-shrink-0">
        <AvatarImage src={session?.data?.user?.image || ""} alt="User Avatar" />
        <AvatarFallback>
          {session?.data?.user?.name?.toString().charAt(0)}
        </AvatarFallback>
      </Avatar>

      <form action={signOut}>
        <Button type="submit">Sign Out</Button>
      </form>
    </aside>
  );
}

export default UserSidebar;
