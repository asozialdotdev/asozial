import Link from "next/link";
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
  Icon: React.ComponentType;
  subLinks: { name: string; href: string; Icon: React.ComponentType }[];
};

function NavBarLinkItemWithSubLinks({
  name,
  href,
  Icon,
  subLinks,
}: NavBarLinkItemWithSubLinksProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icon />
        {name}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Link href={href}>
            <Icon />
            {name}
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {subLinks.map((subLink) => (
          <DropdownMenuItem key={subLink.name}>
            <Link href={subLink.href}>
              <subLink.Icon />
              {subLink.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavBarLinkItemWithSubLinks;
