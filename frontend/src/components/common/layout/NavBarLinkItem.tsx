import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavBarLinkItemProps = {
  name: string;
  href: string;
  subLinks?: { name: string; href: string }[];
};

function NavBarLinkItem({ name, href, subLinks }: NavBarLinkItemProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Link href={href}>{name}</Link>
      </DropdownMenuTrigger>
      {subLinks && (
        <DropdownMenuContent>
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {subLinks.map((subLink: { name: string; href: string }) => (
            <DropdownMenuItem>
              <Link key={subLink.name} href={subLink.href}>
                {subLink.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

export default NavBarLinkItem;
