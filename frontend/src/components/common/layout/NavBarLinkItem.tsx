import Link from "next/link";

type NavBarLinkItemProps = {
  name: string;
  href: string;
  Icon: React.ComponentType;
};

function NavbarLinkItem({ name, href, Icon }: NavBarLinkItemProps) {
  return (
    <Link href={href} className="flex flex-row flex-nowrap">
      <Icon />
      {name}
    </Link>
  );
}

export default NavbarLinkItem;
