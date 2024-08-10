"use client";

import { useSidebarsContext } from "@/context/SidebarsContext";

function UserSidebar() {
  const { userSidebarRef, isUserSidebarOpen, projectSidebarRef } =
    useSidebarsContext();

  return (
    <aside
      className={`z-50 flex h-full w-[14rem] flex-col gap-10 overflow-y-auto bg-neutral-300 px-[3.2rem] py-[2.4rem] text-3xl text-dark shadow-md transition-transform duration-150 ease-in-out dark:bg-neutral-700 dark:text-light lg:w-[18rem] ${isUserSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      ref={userSidebarRef}
    >
      This is the User Sidebar component
    </aside>
  );
}

export default UserSidebar;
