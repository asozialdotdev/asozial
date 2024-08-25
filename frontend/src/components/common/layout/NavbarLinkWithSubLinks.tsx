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

type NavBarLinkItemWithSubLinksProps = {
  name: string;
  href: string;
  subLinks: { name: string; href: string }[];
};

function NavBarLinkItemWithSubLinks({
  name,
  href,
  subLinks,
}: NavBarLinkItemWithSubLinksProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{name}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Link href={href}>{name}</Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link key={subLinks[0].name} href={subLinks[0].href}>
            {subLinks[0].name}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link key={subLinks[1].name} href={subLinks[1].href}>
            {subLinks[1].name}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavBarLinkItemWithSubLinks;
