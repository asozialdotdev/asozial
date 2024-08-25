import NavbarLinkItem from "./NavbarLinkItem";
import NavBarLinkItemWithSubLinks from "./NavbarLinkWithSubLinks";
const navbarLinks = [
  { name: "Dashboard", href: "/dashboard" },
  {
    name: "Account",
    href: "/account",
  },
  {
    name: "Search",
    href: "/search",
    sublinks: [
      { name: "Users", href: "/search/users" },
      { name: "Projects", href: "/search/projects" },
    ],
  },
];

function NavbarLinks() {
  return (
    <ul className="flex items-center gap-2">
      {navbarLinks.map((link) => (
        <>
          {link.sublinks ? (
            <NavBarLinkItemWithSubLinks
              key={link.name}
              {...link}
              subLinks={link.sublinks}
            />
          ) : (
            <NavbarLinkItem key={link.name} {...link} />
          )}
        </>
      ))}
    </ul>
  );
}

export default NavbarLinks;
