import Link from "next/link";

type NavbarLinkItemProps = {
  name: string;
  href: string;
  Icon: React.ComponentType;
};

function NavbarLinkItem({ name, href, Icon }: NavbarLinkItemProps) {
  return (
    <Link href={href} className="flex flex-row flex-nowrap">
      <Icon />
      {name}
    </Link>
  );
}

export default NavbarLinkItem;
