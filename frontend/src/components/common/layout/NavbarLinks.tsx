import NavbarLinkItem from "./NavbarLinkItem";
import NavbarLinkItemWithSubLinks from "./NavbarLinkWithSubLinks";
import { LayoutDashboard, Link, Search, Users, FolderGit } from "lucide-react";
const navbarLinks = [
  {
    name: "Search",
    href: "/search",
    Icon: Search,
    sublinks: [
      { name: "Users", href: "/search/users", Icon: Users },
      { name: "Projects", href: "/search/projects", Icon: FolderGit },
    ],
  },
  { name: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
  {
    name: "Match",
    href: "/match",
    Icon: Link,
    sublinks: [
      { name: "Users", href: "/match/users", Icon: Users },
      { name: "Projects", href: "/match/projects", Icon: FolderGit },
    ],
  },
];

function NavbarLinks() {
  return (
    <ul className="flex items-center gap-6">
      {navbarLinks.map((link) => (
        <>
          {link.sublinks ? (
            <NavbarLinkItemWithSubLinks
              key={link.name}
              name={link.name}
              href={link.href}
              Icon={link.Icon}
              subLinks={link.sublinks}
            />
          ) : (
            <NavbarLinkItem
              key={link.name}
              name={link.name}
              href={link.href}
              Icon={link.Icon}
            />
          )}
        </>
      ))}
    </ul>
  );
}

export default NavbarLinks;
