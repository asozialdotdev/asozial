import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icon } from "@/types/Ui";

type NavbarLinkItemProps = {
  name: string;
  href: string;
  Icon: Icon;
};

function NavbarLinkItem({ name, href, Icon }: NavbarLinkItemProps) {
  return (
    <Button variant="ghost">
      <Link
        href={href}
        className="flex flex-row flex-nowrap items-center gap-2"
      >
        <Icon />
        {name}
      </Link>
    </Button>
  );
}

export default NavbarLinkItem;
