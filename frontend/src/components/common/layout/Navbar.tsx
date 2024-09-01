"use client";
//Next
import { useSession } from "next-auth/react";

//Hooks
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useSidebarsContext } from "@/context/SidebarsContext";

//Components
import ToggleTheme from "../ui/buttons/ToggleTheme";
//UI
import { Button } from "@/components/ui/button";
import NavbarLinks from "./NavbarLinks";
import { Menu, SquareUserRound } from "lucide-react";
import NavbarAsozialMenu from "./NavbarAsozialMenu";
import NavbarAccountMenu from "./NavbarAccountMenu";
import useCombinedRef from "@/hooks/useCombinedRef";

function Navbar() {
  const {
    toggleProjectSidebar,
    projectHeaderRef,
    isProjectSidebarOpen,
    toggleUserSidebar,
    userHeaderRef,
    isUserSidebarOpen,
  } = useSidebarsContext();

  const { width } = useWindowWidth();

  const { data: session, status } = useSession();

  const mergedRef = useCombinedRef(projectHeaderRef, userHeaderRef);

  return (
    <>
      <nav
        ref={mergedRef}
        className={`border-b-1 sticky top-0 z-50 flex w-full justify-between gap-2 bg-light px-6 py-2 text-dark dark:bg-dark dark:text-light`}
      >
        <section className="flex items-center gap-5">
          <Button
            size="icon"
            variant="ghost"
            className="hover:opacity-75 dark:text-light xl:hidden"
            onClick={toggleUserSidebar}
            disabled={
              width && width <= 640 ? !!isProjectSidebarOpen : undefined
            }
          >
            <SquareUserRound size={33} />
          </Button>

          <NavbarAsozialMenu />
        </section>

        <NavbarLinks />

        <section className="flex items-center gap-2">
          {status === "authenticated" && session?.user && (
            <NavbarAccountMenu
              userId={session?.user?.id}
              username={session?.user?.githubUsername || ""}
              src={session?.user?.image || ""}
            />
          )}

          <Button
            size="icon"
            variant="ghost"
            className="hover:opacity-75 dark:text-light xl:hidden"
            onClick={toggleProjectSidebar}
            disabled={width && width <= 640 ? !!isUserSidebarOpen : undefined}
          >
            <Menu size={26} />
          </Button>
        </section>
      </nav>
    </>
  );
}

export default Navbar;
