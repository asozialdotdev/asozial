import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type NavbarLinkItemProps = {
  name: string;
  href: string;
  Icon: React.ComponentType<{ toggleOpen?: () => void }>;
};

function NavbarLinkItem({ name, href, Icon }: NavbarLinkItemProps) {
  return (
    <Button variant="ghost">
      <Link
        href={href}
        className="flex flex-row flex-nowrap items-center gap-2"
      >
        <Icon />
        <span className="xs:hidden sm:hidden md:hidden">{name}</span>
      </Link>
    </Button>
  );
}

export default NavbarLinkItem;
