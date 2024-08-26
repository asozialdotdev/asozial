import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type SidebarButtonsProps = {
  links: { name: string; href: string; Icon: React.ComponentType }[];
};

function SidebarButtons({ links }: SidebarButtonsProps) {
  return (
    <ul className="flex flex-row justify-evenly">
      {links.map((link) => (
        <li key={link.name}>
          <Button className="text-lg lg:text-xl" variant="ghost">
            <Link
              href={link.href}
              className="flex flex-row items-center gap-2 text-sm"
            >
              <link.Icon />
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default SidebarButtons;
