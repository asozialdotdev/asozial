import NavbarLinkItem from "./NavbarLinkItem";
import NavbarLinkItemWithSubLinks from "./NavbarLinkWithSubLinks";
import DashboardIcon from "../ui/DashboardIcon";
import SearchIcon from "../ui/SearchIcon";
import MatchIcon from "../ui/MatchIcon";
import ProjectIcon from "../ui/ProjectIcon";
import UsersIcon from "../ui/UsersIcon";
const navbarLinks = [
  {
    name: "Search",
    href: "/search",
    Icon: SearchIcon,
    sublinks: [
      { name: "Users", href: "/search/users", Icon: UsersIcon },
      { name: "Projects", href: "/search/projects", Icon: ProjectIcon },
    ],
  },
  { name: "Dashboard", href: "/dashboard", Icon: DashboardIcon },
  {
    name: "Match",
    href: "/match",
    Icon: MatchIcon,
    sublinks: [
      { name: "Users", href: "/match/users", Icon: UsersIcon },
      { name: "Projects", href: "/match/projects", Icon: ProjectIcon },
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
