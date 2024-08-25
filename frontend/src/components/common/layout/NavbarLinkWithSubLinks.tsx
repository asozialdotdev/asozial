import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type NavbarLinkItemWithSubLinksProps = {
  name: string;
  href: string;
  Icon: React.ComponentType;
  subLinks: { name: string; href: string; Icon: React.ComponentType }[];
};

function NavbarLinkItemWithSubLinks({
  name,
  href,
  Icon,
  subLinks,
}: NavbarLinkItemWithSubLinksProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-row items-center gap-2">
        <Button
          variant="ghost"
          className="flex flex-row flex-nowrap items-center gap-2"
        >
          <Icon />
          {name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Link href={href} className="flex flex-row items-center gap-2">
            <Icon />
            {name}
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {subLinks.map((subLink) => (
          <DropdownMenuItem key={subLink.name}>
            <Link
              href={subLink.href}
              className="flex flex-row items-center gap-2"
            >
              <subLink.Icon />
              {subLink.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavbarLinkItemWithSubLinks;