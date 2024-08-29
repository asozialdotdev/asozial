import NavbarLinkItem from "./NavbarLinkItem";
import NavbarLinkItemWithSubLinks from "./NavbarLinkWithSubLinks";
import DashboardIcon from "../ui/icons/DashboardIcon";
import SearchIcon from "../ui/icons/SearchIcon";
import MatchIcon from "../ui/icons/MatchIcon";
import ProjectIcon from "../ui/icons/ProjectIcon";
import UsersIcon from "../ui/icons/UsersIcon";
import ReplyIcon from "../ui/icons/ReplyIcon";
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
  {
    name: "Dashboard",
    href: "/dashboard",
    Icon: DashboardIcon,
    sublinks: [
      {
        name: "Messages",
        href: "/messages",
        Icon: ReplyIcon,
      },
      {
        name: "Friends",
        href: "/friends",
        Icon: UsersIcon,
      },
    ],
  },
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
    <ul className="flex items-center gap-6 xs:gap-2 sm:gap-2 md:gap-2">
      {navbarLinks.map((link) => (
        <li key={link.name}>
          <NavbarLinkItemWithSubLinks
            name={link.name}
            href={link.href}
            Icon={link.Icon}
            subLinks={link.sublinks}
          />
        </li>
      ))}
    </ul>
  );
}

export default NavbarLinks;
