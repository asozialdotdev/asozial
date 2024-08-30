"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import UserAvatar from "../ui/image/UserAvatar";
import { User, Settings, LogOut } from "lucide-react";
import { signOut } from "@/actions";
import { Button } from "@/components/ui/button";

type NavbarAccountMenuProps = {
  userId: string;
  username: string;
  src: string;
};

function NavbarAccountMenu({ userId, username, src }: NavbarAccountMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer text-2xl">
        <UserAvatar
          src={src}
          userId={userId}
          username={username}
          isInNavbar
          className="opacity-75 hover:scale-110 hover:border-2 hover:opacity-100"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-row items-center gap-2 text-xs italic">
          {username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer text-lg">
          <Link href="/profile" className="flex flex-row items-center gap-2">
            <User /> profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer text-lg">
          <form action={signOut}>
            <Button type="submit">
              <LogOut />
              sign out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavbarAccountMenu;
