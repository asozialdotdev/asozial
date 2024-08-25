import Link from "next/link";

type NavBarLinkItemProps = {
  name: string;
  href: string;
};

function NavbarLinkItem({ name, href }: NavBarLinkItemProps) {
  return <Link href={href}>{name}</Link>;
}

export default NavbarLinkItem;
